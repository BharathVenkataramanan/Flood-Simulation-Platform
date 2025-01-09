import obstacles from './obstacles.js';
import objects2 from './objects2.js';
import obstacles3 from './obstacles3.js';
import obstacles4 from './obstacles4.js';

// Function to randomly choose an obstacle set
const getRandomObstacleData = (type = null) => {
  // List of all obstacle sets
  const obstacleSets = [obstacles, objects2, obstacles3, obstacles4];
  
  // If a type is provided, use that specific set, otherwise pick a random one
  if (type !== null) {
    switch (type) {
      case 'objects2':
        return objects2;
      case 'obstacles3':
        return obstacles3;
      case 'obstacles4':
        return obstacles4;
      default:
        return obstacles; // Default to the 'obstacles' set
    }
  }

  // If no type is provided, return a random obstacle set
  const randomIndex = Math.floor(Math.random() * obstacleSets.length);
  return obstacleSets[randomIndex];
};

// Function to get the obstacles map based on a specific obstacle set
export const getObstaclesMap = (type = null) => {
  // Get the correct obstacle set based on the type or choose randomly
  const obstaclesData = getRandomObstacleData(type);

  const obstaclesMap = new Map();

  // Loop through each obstacle and mark the coordinates on the map
  obstaclesData.forEach(([xStart, xEnd, yStart, yEnd, color]) => {
    let x = xStart;
    while (x <= xEnd) {
      let y = yStart;
      while (y <= yEnd) {
        obstaclesMap.set(`${x}:${y}`, color || '#e1e3eb');
        y += 1;
      }
      x += 1;
    }
  });
  
  return obstaclesMap;
};

// Function to get the default obstacles map (using the 'obstacles' set by default)
export const getDefaultObstaclesMap = () => {
  const obstaclesMap = new Map();
  
  // Default to 'obstacles' set
  obstacles.forEach(([xStart, xEnd, yStart, yEnd, color]) => {
    let x = xStart;
    while (x <= xEnd) {
      let y = yStart;
      while (y <= yEnd) {
        obstaclesMap.set(`${x}:${y}`, color || '#e1e3eb');
        y += 1;
      }
      x += 1;
    }
  });

  return obstaclesMap;
};
