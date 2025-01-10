import React, { useState, useEffect, useRef } from 'react';
import Car from './Car';
import ListItem from './ListItem';
import { api } from './api';
import { wait } from '../../shared/utils';
import config from '../../shared/config';
import { getObstaclesMap, getDefaultObstaclesMap } from '../../shared/methods';
import { MapCustomerIcon, MapDestIcon } from './Icons';
import { calculateTravelTime } from './movement';

const { gridSize, squareSize, fetchInterval, increment, refreshInterval } = config;

// Utility function to calculate median
const calculateMedian = (numbers) => {
  if (!numbers.length) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
};

const loadDrivers = async (previousUpdateAtRef, setCars, setRefreshing) => {
  while (true) {
    const drivers = await api.get('/drivers');
    const timeout = 2000;
    const now = Date.now();

    if (now - previousUpdateAtRef.current > timeout) {
      previousUpdateAtRef.current = now;
      setCars([]);
      setRefreshing(true);
      await wait(fetchInterval);
      continue;
    }
    previousUpdateAtRef.current = now;

    const cars = [];
    for (const driver of drivers) {
      const { location } = driver;
      let path = [];
      try {
        if (driver.path) path = JSON.parse(driver.path);
      } catch (error) {
        console.error('Invalid driver path:', driver.path);
      }
      if (typeof location === 'string' && location.includes(':')) {
        const [x, y] = location.split(':');
        cars.push({
          ...driver,
          actual: [parseInt(x), parseInt(y)],
          path,
        });
      } else {
        console.error('Invalid driver location:', location);
      }
    }

    setCars(cars);
    setRefreshing(false);
    await wait(fetchInterval);
  }
};

const loadCustomers = async (setCustomers) => {
  while (true) {
    let customers = await api.get('/customers');
    customers = customers
      .filter((c) => typeof c.location === 'string' && c.location.includes(':'))
      .map((c) => {
        const { location } = c;
        const [x, y] = location.split(':');
        return { ...c, location: [parseInt(x), parseInt(y)] };
      });
    setCustomers(customers);
    await wait(fetchInterval);
  }
};

const GeoMap = () => {
  const previousUpdateAtRef = useRef(Date.now());

  const [cars, setCars] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [obstaclesMap, setObstaclesMap] = useState(getObstaclesMap());
  const [medianTravelTime, setMedianTravelTime] = useState(0);
  const [regularTravelTime, setRegularTravelTime] = useState('');
  const [timeLostPerPerson, setTimeLostPerPerson] = useState(0);
  const [economicLossMultiplier, setEconomicLossMultiplier] = useState(0.52);
  const [economicLossPerPerson, setEconomicLossPerPerson] = useState(0);
  const [totalEconomicLoss, setTotalEconomicLoss] = useState(0);

  useEffect(() => {
    previousUpdateAtRef.current = Date.now();

    const driverInterval = setInterval(() => {
      loadDrivers(previousUpdateAtRef, setCars, setRefreshing);
    }, fetchInterval);

    const customerInterval = setInterval(() => {
      loadCustomers(setCustomers);
    }, fetchInterval);

    return () => {
      clearInterval(driverInterval);
      clearInterval(customerInterval);
    };
  }, []);

  useEffect(() => {
    const travelTimes = cars.map(({ path }) =>
      Array.isArray(path) ? calculateTravelTime(path, increment) : 0
    );
    setMedianTravelTime(calculateMedian(travelTimes));
  }, [cars]);

  useEffect(() => {
    if (regularTravelTime && medianTravelTime) {
      const timeDifference = medianTravelTime - Number(regularTravelTime) * 60000; // Convert input to ms
      const timeLost = timeDifference / 60000; // Convert to minutes
      const economicLoss = timeLost * economicLossMultiplier; // Dynamic multiplier

      setTimeLostPerPerson(timeLost);
      setEconomicLossPerPerson(economicLoss);
      setTotalEconomicLoss(economicLoss * customers.length); // Multiply by customer count
    }
  }, [regularTravelTime, medianTravelTime, customers, economicLossMultiplier]);

  const obstacleElems = [];
  for (let [key, color] of obstaclesMap.entries()) {
    const [x, y] = key.split(':');
    obstacleElems.push(
      <rect
        key={`o-${x}:${y}`}
        width={squareSize + squareSize / 2}
        height={squareSize + squareSize / 2}
        x={x * squareSize - squareSize / 2}
        y={y * squareSize - squareSize / 2}
        fill={color}
        stroke={color}
      />
    );
  }

  const pathElems = cars.map(({ driverId, path, status }) => {
    if (!Array.isArray(path)) return null;
    let points = '';
    path.forEach(([x, y]) => {
      points += `${x * squareSize + squareSize / 4},${y * squareSize + squareSize / 4} `;
    });
    const first = path[0];
    return (
      <React.Fragment key={`path-wrapper-${driverId}`}>
        {first && (
          <rect
            key={`start-${driverId}`}
            width={8}
            height={8}
            x={first[0] * squareSize - squareSize / 7}
            y={first[1] * squareSize - squareSize / 7}
            style={{
              fill: status === 'enroute' ? '#454545' : '#adaaaa',
            }}
          />
        )}
        <polyline
          key={`path-${driverId}`}
          points={points}
          style={{
            fill: 'none',
            stroke: status === 'enroute' ? '#454545' : '#adaaaa',
            strokeWidth: 4,
          }}
        />
      </React.Fragment>
    );
  });

  const carElems = cars.map(({ driverId, actual, path }) => (
    <Car
      key={`car-${driverId}`}
      driverId={driverId}
      actual={actual}
      path={path}
      increment={increment}
      refreshInterval={refreshInterval}
    />
  ));

  const seenCustomers = new Set();
  const customerElems = cars
    .filter(({ status }) => status === 'pickup')
    .map(({ path }) => {
      if (!path || path.length === 0) return null;
      const [x, y] = path[path.length - 1];
      seenCustomers.add(`${x}:${y}`);
      return (
        <MapCustomerIcon
          key={`c1-${x}:${y}`}
          x={x * squareSize - squareSize * 0.75}
          y={y * squareSize - squareSize * 0.75}
        />
      );
    });

  customers.forEach(({ location }) => {
    const [x, y] = location;
    if (seenCustomers.has(`${x}:${y}`)) return;
    customerElems.push(
      <MapCustomerIcon
        key={`c2-${x}:${y}`}
        x={x * squareSize - squareSize / 2}
        y={y * squareSize - squareSize / 2}
      />
    );
  });

  const destElems = cars
    .filter(({ status }) => status === 'enroute')
    .map(({ driverId, path }) => {
      const lastPoint = path[path.length - 1];
      const [x, y] = Array.isArray(lastPoint) ? lastPoint : [0, 0];
      return (
        <MapDestIcon
          key={`d-${driverId}-${x}:${y}`}
          x={x * squareSize - 4.5}
          y={y * squareSize - 15}
        />
      );
    });

  const listElems = cars
    .filter(({ status }) => status === 'enroute' || status === 'pickup')
    .sort((a, b) => (a.name < b.name ? -1 : 0))
    .map(
      ({
        driverId,
        customerId,
        name,
        customerName,
        status,
        path,
        pathIndex,
      }) => (
        <ListItem
          key={`${driverId}:${customerId}`}
          driverId={driverId}
          customerId={customerId}
          driverName={name}
          customerName={customerName}
          progress={(pathIndex / (path.length - 1)) * 100}
          status={status}
        />
      )
    );

  return (
    <div className="view-map">
      <div data-tour="map" className="map">
        <div className="map-inner">
          <div className={`map-refresh ${refreshing ? 'active' : ''}`} />
          <svg
            width={gridSize}
            height={gridSize}
            viewBox={`0 0 ${gridSize} ${gridSize}`}
          >
            {obstacleElems}
            {pathElems}
            {carElems}
            {customerElems}
            {destElems}
          </svg>
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              padding: '8px 12px',
              backgroundColor: '#ffffff',
              borderRadius: '5px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333333',
            }}
          >
            Median Travel Time: {(medianTravelTime / 60000).toFixed(2)} minutes
          </div>
        </div>
        <div
          style={{
            margin: '20px 10px',
            padding: '10px',
            backgroundColor: '#f9f9f9',
            border: '1px solid #ddd',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <label>
            Regular Travel Time (minutes):{' '}
            <input
              type="number"
              value={regularTravelTime}
              onChange={(e) => setRegularTravelTime(e.target.value)}
              style={{
                padding: '5px',
                margin: '5px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </label>
          <label>
            Economic Loss per Person:{' '}
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={economicLossMultiplier}
              onChange={(e) => setEconomicLossMultiplier(Number(e.target.value))}
              style={{ margin: '0 10px' }}
            />
            {economicLossMultiplier.toFixed(2)}
          </label>
          <div>
            <strong>Time Lost per Person:</strong> {timeLostPerPerson.toFixed(2)} minutes
          </div>
          <div>
            <strong>Economic Loss per Person:</strong> ${economicLossPerPerson.toFixed(2)}
          </div>
          <div>
            <strong>Total Economic Loss:</strong> ${totalEconomicLoss.toFixed(2)}
          </div>
        </div>
      </div>
      <div data-tour="list" className="list">
        {listElems}
      </div>
    </div>
  );
};

export default GeoMap;
