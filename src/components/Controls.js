import React, { PureComponent } from 'react';
import { Input } from 'glamorous';

class Controls extends PureComponent {
  handleIntervalChange = (e) => {
    this.props.setIterationInterval(e.target.value);
  };

  render() {
    const {
      nextIteration,
      prevIteration,
      initialize,
      play,
      stop,
      iterationInterval,
    } = this.props;

    return (
      <div>
        <button onClick={initialize}>new</button>
        <button onClick={prevIteration}>prev</button>
        <button onClick={nextIteration}>next</button>
        <button onClick={play}>play</button>
        <button onClick={stop}>stop</button>
        {' speed: '}
        <Input
          width="80px"
          type="range"
          min={0}
          max={1000}
          value={iterationInterval}
          onChange={this.handleIntervalChange}
          step={100}
        />
      </div>
    );
  }
}

export default Controls;
