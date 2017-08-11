import React, { PureComponent } from 'react';
import { Input } from 'glamorous';

const numberInputStyle = {
  width: '3em',
};

class Controls extends PureComponent {
  handleIntervalChange = (e) => {
    this.props.setIterationInterval(e.target.value);
  };

  handleSetSize = (e) => {
    this.props.setSize({
      [e.target.name]: Number(e.target.value),
    });
  };

  render() {
    const {
      height,
      width,
      nextIteration,
      prevIteration,
      initialize,
      play,
      autoplay,
      stop,
      iterationInterval,
    } = this.props;

    return (
      <div>
        <label>
          {'height '}
          <Input
            css={numberInputStyle}
            name="height"
            type="number"
            value={height}
            min={1}
            onChange={this.handleSetSize}
          />
        </label>
        <label>
          {'width '}
          <Input
            css={numberInputStyle}
            name="width"
            type="number"
            value={width}
            min={1}
            onChange={this.handleSetSize}
          />
        </label>
        <button onClick={initialize}>new</button>
        <button onClick={prevIteration}>prev</button>
        <button onClick={nextIteration}>next</button>
        <button onClick={play}>play</button>
        <button onClick={autoplay}>autoplay</button>
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
