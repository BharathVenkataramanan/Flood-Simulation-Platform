export const isBetween = (val: number, curr: number, prev: number): boolean =>
  (val <= curr && val >= prev) || (val >= curr && val <= prev);

export const getNextCoordIndex = (
  currX: number,
  currY: number,
  path: number[][]
): number => {
  
  if (!path || path.length === 0) {
    console.error('Invalid path in getNextCoordIndex:', path);
    return -1;
  }

  return path.findIndex(([x, y], i, path) => {
    if (currX === path[i][0] && currY === path[i][1]) return true;
    if (i === 0) return false;

    const xMatches = x === currX;
    const yMatches = y === currY;

    return (
      (xMatches && isBetween(currY, path[i][1], path[i - 1][1])) ||
      (yMatches && isBetween(currX, path[i][0], path[i - 1][0]))
    );
  });
};

export const advanceCoord = (
  curr: number,
  next: number,
  increment: number
): number => {
  let newCoord = curr;
  if (next > curr) {
    newCoord = curr + increment;
    if (newCoord + increment > next) newCoord = next;
  } else {
    newCoord = curr - increment;
    if (newCoord - increment < next) newCoord = next;
  }

  return newCoord;
};

export const getDirection = (section: number[][], i: number): 'x' | 'y' => {
  const x0 = section[i - 1][0];
  const x1 = section[i][0];
  return x1 !== x0 ? 'x' : 'y';
};

export const countTurns = (section: number[][]): number => {
  if (!section || section.length < 2) {
    console.error('Invalid section in countTurns:', section);
    return 0;
  }

  let count = 0;
  let currDirection = getDirection(section, 1);

  for (let i = 2; i < section.length; i++) {
    let newDirection = getDirection(section, i);
    if (newDirection !== currDirection) {
      currDirection = newDirection;
      count++;
    }
  }

  return count;
};

export const getRotation = (path: number[][], i: number): number => {
  if (!path || path.length < 2 || i <= 0 || i >= path.length) {
    console.error('Invalid path or index in getRotation:', { path, i });
    return 0; 
  }

  const [x0, y0] = path[i - 1];
  const [x1, y1] = path[i];
  const direction = x1 !== x0 ? 'x' : 'y';

  if (direction === 'x' && x1 > x0) return 90;
  else if (direction === 'x' && x0 > x1) return 270;
  else if (direction === 'y' && y1 > y0) return 180;
  else return 0;
};

export const calculateTravelTime = (section: number[][], increment: number): number => {
  if (!section || section.length < 2) {
    console.error('Invalid section in calculateTravelTime:', section);
    return 0;
  }

  let totalPixelsTraveled = 0;
  let currX = section[0][0];
  let currY = section[0][1];

  for (let i = 1; i < section.length; i++) {
    const [nextX, nextY] = section[i];
    if (nextX !== currX) {
      totalPixelsTraveled += Math.abs(nextX - currX);
      currX = nextX;
    }
    if (nextY !== currY) {
      totalPixelsTraveled += Math.abs(nextY - currY);
      currY = nextY;
    }
  }

  return totalPixelsTraveled * 3401.94; 
};

export const getTurnDistance = (
  curr: number,
  target: number
): { distClockwise: number; distCounterclockwise: number } => ({
  distClockwise:
    target > curr && target <= 360 ? target - curr : 360 - curr + target,
  distCounterclockwise:
    target >= 0 && target < curr ? curr - target : curr + 360 - target,
});

export const move = async (
  actual: number[],
  path: number[][],
  receivedAt: number,
  increment: number
): Promise<void> => {
  if (!path || path.length === 0) {
    console.error("Invalid path in move function:", { actual, path });
    return;
  }

  let currX = actual[0];
  let currY = actual[1];

  const startIndex = getNextCoordIndex(currX, currY, path);
  if (startIndex === -1) {
    console.error("Start index not found in path:", { currX, currY, path });
    return;
  }

  const endIndex = path.findIndex(([x, y]) => x === actual[0] && y === actual[1]);
  const section = path.slice(startIndex, endIndex + 1);
  if (section.length < 2) return;

  const travelTime = calculateTravelTime(section, increment);
  console.log(`Total travel time: ${(travelTime / 60000).toFixed(2)} minutes`);

  for (let i = 0; i < section.length; i++) {
    const [nextX, nextY] = section[i];

    while (currX !== nextX || currY !== nextY) {
      if (currX !== nextX) {
        currX = advanceCoord(currX, nextX, increment);
        console.log(`Moving to X: ${currX}`);
      }
      if (currY !== nextY) {
        currY = advanceCoord(currY, nextY, increment);
        console.log(`Moving to Y: ${currY}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 50)); 
    }
  }
};
