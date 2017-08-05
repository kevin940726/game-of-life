import React from 'react';

const Controls = ({ nextIteration, initialize }) => (
  <div>
    <button onClick={initialize}>new</button>
    <button onClick={nextIteration}>next</button>
  </div>
);

export default Controls;
