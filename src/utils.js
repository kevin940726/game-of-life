import { createSelector } from 'reselect';

const indexSelector = (state, props, index) => index;
const widthSelector = (state, props) => props.width;
const heightSelector = (state, props) => props.height;
const boardSelector = state => state.board;

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
  boardSelector,
  ({ row, col }, index, width, height, board) => ([
    // topLeft
    (col !== 0 && row !== 0) ? board.get(index - width - 1) : null,
    // top
    row !== 0 ? board.get(index - width) : null,
    // topRight
    (col !== width - 1 && row !== 0) ? board.get(index - width + 1) : null,
    // left
    col !== 0 ? board.get(index - 1) : null,
    // right
    col !== width -1 ? board.get(index + 1) : null,
    // bottomLeft
    (col !== 0 && row !== height - 1) ? board.get(index + width - 1) : null,
    // bottom
    row !== height - 1 ? board.get(index + width) : null,
    // bottomRight
    (col !== width - 1 && row !== height - 1) ? board.get(index + width + 1) : null,
  ].filter(cell => cell !== null))
);

export const sumLivingNeighbors = neighbors => neighbors
  .reduce((sum, cur) => sum + cur, 0);
