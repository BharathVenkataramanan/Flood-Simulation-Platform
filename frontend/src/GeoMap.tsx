import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import Car from './Car';
import ListItem from './ListItem';
import { api } from './api';
import { wait } from '../../shared/utils';
import config from '../../shared/config';
import { getObstaclesMap } from '../../shared/methods';
import { MapCustomerIcon, MapDestIcon } from './Icons';

const { gridSize, squareSize, fetchInterval } = config;
const obstaclesMap = getObstaclesMap();

const loadDrivers = async (previousUpdateAtRef, setCars, setRefreshing) => {
  while (true) {
    const drivers = await api.get('/drivers');
    // console.log('drivers', drivers);
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
      if (driver.path) path = JSON.parse(driver.path) as [number, number][];
      const [x, y] = location.split(':');
      cars.push({
        ...driver,
        actual: [parseInt(x), parseInt(y)],
        path,
      });
    }
    // console.log('cars', cars);
    setCars(cars);
    setRefreshing(false);
    await wait(fetchInterval);
  }
};

const loadCustomers = async (setCustomers) => {
  while (true) {
    let customers = await api.get('/customers');
    customers = customers.filter((c) => {
      if (!c.location) console.log('no location', c);
      return c.location;
    });
    customers = customers.map((c) => {
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

  useEffect(() => {
    previousUpdateAtRef.current = Date.now();

    loadDrivers(previousUpdateAtRef, setCars, setRefreshing);
    loadCustomers(setCustomers);
  }, []);

  const obstacleElems = [];
  for (let [key, color] of obstaclesMap) {
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
    let points = '';

    path.forEach(([x, y]) => {
      points += `${x * squareSize + squareSize / 4},${
        y * squareSize + squareSize / 4
      } `;
    });

    const first = path[0];

    return (
      <>
        {first && (
          <rect
            key={`start-${driverId}`}
            width={8}
            height={8}
            x={first[0] * squareSize - squareSize / 7}
            y={first[1] * squareSize - squareSize / 7}
            style={{
              fill: `${status === 'enroute' ? '#454545' : '#adaaaa'}`,
            }}
          />
        )}
        <polyline
          key={`path-${driverId}`}
          points={points}
          style={{
            fill: 'none',
            stroke: `${status === 'enroute' ? '#454545' : '#adaaaa'}`,
            strokeWidth: 4,
          }}
        />
      </>
    );
  });

  const carElems = cars.map(({ driverId, actual, path }) => {
    return (
      <Car
        key={`car-${driverId}`}
        driverId={driverId}
        actual={actual}
        path={path}
      />
    );
  });

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
      const [x, y] = path[path.length - 1];
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
      }) => {
        return (
          <ListItem
            key={`${driverId}:${customerId}`}
            driverId={driverId}
            customerId={customerId}
            driverName={name}
            customerName={customerName}
            progress={(pathIndex / (path.length - 1)) * 100}
            status={status}
          />
        );
      }
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
        </div>
      </div>
      <div data-tour="list" className="list">
        {listElems}
      </div>
    </div>
  );
};
export default GeoMap;