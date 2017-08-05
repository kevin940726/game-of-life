import React from 'react';

const Controls = ({ nextIteration, initialize, play, stop }) => (
  <div>
    <button onClick={initialize}>new</button>
    <button onClick={nextIteration}>next</button>
    <button onClick={play}>play</button>
    <button onClick={stop}>stop</button>
  </div>
);

export default Controls;
