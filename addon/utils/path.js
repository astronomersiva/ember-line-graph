// refer https://danielpataki.com/svg-chart/
const normalize = ({ value, min, max, scaleMin, scaleMax }) => {
  // If the `min` and `max` are the same value, it means our dataset is flat.
  // For now, let's assume that flat data should be aligned to the bottom.
  if (min === max) {
    return scaleMin;
  }

  return scaleMin + (value - min) * (scaleMax - scaleMin) / (max - min);
};

const getCoordinates = (data, minValue = undefined, maxValue = undefined) => {
  let minX = 10;
  let maxX = 290; // 300 - 10
  let minY = 65;  // 75 - 10
  let maxY = 10;
  // For the X axis, we want to normalize it based on its index in the array.
  // For the Y axis, we want to normalize it based on the element's value.
  //
  // X axis is easy: just evenly-space each item in the array.
  // For the Y axis, we first need to find the min and max of our array,
  // and then normalize those values between 0 and 1.

  if (minValue === undefined) {
    minValue = Math.min(...data);
  }
  if (maxValue === undefined) {
    maxValue = Math.max(...data);
  }
  let boundariesX = { min: 0, max: data.length - 1 };
  let boundariesY = { min: minValue, max: maxValue };

  let normalizedData = data.map((point, index) => ({
    x: normalize({
      value: index,
      min: boundariesX.min,
      max: boundariesX.max,
      scaleMin: minX,
      scaleMax: maxX,
    }),
    y: normalize({
      value: point,
      min: boundariesY.min,
      max: boundariesY.max,
      scaleMin: minY,
      scaleMax: maxY,
    }),
  }));

  // According to the SVG spec, paths with a height/width of `0` can't have
  // linear gradients applied. This means that our lines are invisible when
  // the dataset is flat (eg. [0, 0, 0, 0]).
  //
  // The hacky solution is to apply a very slight offset to the first point of
  // the dataset. As ugly as it is, it's the best solution we can find (there
  // are ways within the SVG spec of changing it, but not without causing
  // breaking changes).
  if (boundariesY.min === boundariesY.max) {
    // eslint-disable-next-line no-param-reassign
    normalizedData[0].x += 0.0001;
    normalizedData[0].y += 0.0001;
  }

  return normalizedData;
};

// from https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
const line = (pointA, pointB) => {
  let lengthX = pointB.x - pointA.x;
  let lengthY = pointB.y - pointA.y;

  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  };
};

const controlPoint = (current, previous, next, reverse, smoothness) => {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  let p = previous || current;
  let n = next || current;
  // Properties of the opposed-line
  let o = line(p, n);
  // If is end-control-point, add PI to the angle to go backward
  let angle = o.angle + (reverse ? Math.PI : 0);
  let length = o.length * smoothness;
  // The control point position is relative to the current point
  let x = current.x + Math.cos(angle) * length;
  let y = current.y + Math.sin(angle) * length;
  return [x, y];
};

const bezierCommand = (point, i, a, smoothness) => {
  // start control point
  let [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point, false, smoothness);
  // end control point
  let [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true, smoothness);
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point.x},${point.y}`;
};

const lineCommand = point => `L ${point.x} ${point.y}`;

export default function path({points, type, smoothness, minY, maxY}) {
  let coords = getCoordinates(points, minY, maxY);

  let command = type === 'line' ? lineCommand : bezierCommand;

  return coords.reduce((acc, point, i, a) => i === 0
    // if first point
    ? `M ${point.x},${point.y}`
    // else
    : `${acc} ${command(point, i, a, smoothness)}`
  , '');
}
