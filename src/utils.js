import { createSelector } from 'reselect';

const indexSelector = (height, width, index) => index;
const widthSelector = (height, width) => width;
const heightSelector = height => height;

const rowColSelector = createSelector(
  indexSelector,
  widthSelector,
  (index, width) => ({
    row: Math.floor(index / width),
    col: index % width,
  })
);

export const neighborsSelector = createSelector(
  rowColSelector,
  indexSelector,
  widthSelector,
  heightSelector,
  ({ row, col }, index, width, height) => ([
    // topLeft
    (col !== 0 && row !== 0) ? (index - width - 1) : null,
    // top
    row !== 0 ? (index - width) : null,
    // topRight
    (col !== width - 1 && row !== 0) ? (index - width + 1) : null,
    // left
    col !== 0 ? (index - 1) : null,
    // right
    col !== width -1 ? (index + 1) : null,
    // bottomLeft
    (col !== 0 && row !== height - 1) ? (index + width - 1) : null,
    // bottom
    row !== height - 1 ? (index + width) : null,
    // bottomRight
    (col !== width - 1 && row !== height - 1) ? (index + width + 1) : null,
  ].filter(cell => cell !== null))
);

export const sumLivingNeighbors = (neighbors, board) => neighbors
  .reduce((sum, index) => sum + board.get(index), 0);
