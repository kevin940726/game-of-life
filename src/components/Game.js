import React, { Component } from 'react';
import { Main, Div } from 'glamorous';
import { Range, List } from 'immutable';
import Cell from './Cell';
import Controls from './Controls';
import Display from './Display';

class Game extends Component {
  static defaultProps = {
    height: 15,
    width: 20,
  };

  static getInitializeState = (height, width) => ({
    board: Range(0, height * width).map(i => ({
      isLiving: Number(Math.random() >= 0.8),
      row: Math.floor(i / width),
      col: i % width,
      index: i,
    })).toList(),
    iterations: 0,
    history: List(),
  });

  constructor(props) {
    super(props);

    this.state = Game.getInitializeState(props.height, props.width);
  }

  componentWillUnmount() {
    this.stop();
  }

  initialize = () => {
    this.setState(Game.getInitializeState(this.props.height, this.props.width));
  };

  setLiving = (index, isLiving) => {
    this.setState(({ board }) => ({
      board: board.update(index, cell => ({ ...cell, isLiving })),
    }));
  };

  nextIteration = () => {
    this.setState(({ iterations }) => ({
      iterations: iterations + 1,
    }));
  };

  play = () => {
    this.stop();

    this.timer = setInterval(() => {
      this.nextIteration();
    }, 500);
  };

  stop = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { height, width } = this.props;
    const { board, iterations } = this.state;

    return (
      <Main
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Div
          display="grid"
          gridTemplateRows={`repeat(${height}, 1fr)`}
          gridTemplateColumns={`repeat(${width}, 1fr)`}
        >
          {board.map(({ row, col, index, isLiving }) => (
            <Cell
              key={index}
              index={index}
              isLiving={isLiving}
              iterations={iterations}
              neighbors={{
                topLeft: (col !== 0 && row !== 0) ? board.get(index - width - 1) : null,
                top: row !== 0 ? board.get(index - width) : null,
                topRight: (col !== width - 1 && row !== 0) ? board.get(index - width + 1) : null,
                left: col !== 0 ? board.get(index - 1) : null,
                right: col !== width -1 ? board.get(index + 1) : null,
                bottomLeft: (col !== 0 && row !== height - 1) ? board.get(index + width - 1) : null,
                bottom: row !== height - 1 ? board.get(index + width) : null,
                bottomRight: (col !== width - 1 && row !== height - 1) ? board.get(index + width + 1) : null,
              }}
              setLiving={this.setLiving}
            />
          ))}
        </Div>

        <Div display="flex" justifyContent="space-between">
          <Controls
            nextIteration={this.nextIteration}
            initialize={this.initialize}
            play={this.play}
            stop={this.stop}
          />
          <Display iterations={iterations} />
        </Div>
      </Main>
    );
  }
}

export default Game;
