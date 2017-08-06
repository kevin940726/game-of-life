import React from 'react';
import { Div } from 'glamorous';

const Cell = ({ isLiving }) => (
  <Div
    backgroundColor={isLiving ? '#CCC' : '#FFF'}
    border="1px solid #999"
    height="30px"
    width="30px"
  />
)

export default Cell;
