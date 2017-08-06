import React, { Component } from 'react';
import { Main, Div } from 'glamorous';
import { Range, List } from 'immutable';
import Cell from './Cell';
import Controls from './Controls';
import Display from './Display';
import { neighborsSelector, sumLivingNeighbors } from '../utils';

class Game extends Component {
  static defaultProps = {
    height: 15,
    width: 20,
  };

  static getInitializeState = (height, width) => ({
    board: Range(0, height * width)
      .map(cell => Number(Math.random() >= 0.8))
      .toList(),
    iterations: 0,
    history: List(),
    isEnd: false,
  });

  constructor(props) {
    super(props);

    this.state = {
      ...Game.getInitializeState(props.height, props.width),
      iterationInterval: 500,
    };
  }

  componentWillUnmount() {
    this.stop();
  }

  initialize = () => {
    this.setState(Game.getInitializeState(this.props.height, this.props.width));
  };

  nextIteration = () => {
    this.setState(({ iterations, board, history }) => {
      let isChanged = false;

      const nextBoard = board.map((isLiving, index) => {
        const livingNeighbors = sumLivingNeighbors(neighborsSelector(this.state, this.props, index));

        const isLivingNext = isLiving
          ? Number(livingNeighbors === 2 || livingNeighbors === 3)
          : Number(livingNeighbors === 3);

        if (isLivingNext !== isLiving) {
          isChanged = true;
        }

        return isLivingNext;
      });

      if (!isChanged) {
        return {
          isEnd: true,
        };
      }

      return {
        iterations: iterations + 1,
        board: nextBoard,
        history: history.set(iterations, board)
          .take(iterations + 1),
      };
    });
  };

  prevIteration = () => {
    this.setState(({ iterations: curIterations, board, history }) => {
      const iterations = curIterations < 1 ? 0 : curIterations - 1;

      return {
        iterations,
        board: history.get(iterations),
      };
    });
  };

  play = () => {
    this.stop();

    if (this.state.isEnd) {
      return;
    }

    this.timer = setTimeout(() => {
      this.nextIteration();
      this.play();
    }, this.state.iterationInterval);
  };

  stop = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  setIterationInterval = (interval) => {
    this.setState({
      iterationInterval: interval,
    });
  };

  render() {
    const { height, width } = this.props;
    const { board, iterations, iterationInterval } = this.state;

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
          {board.map((isLiving, index) => (
            <Cell
              key={index}
              isLiving={isLiving}
            />
          ))}
        </Div>

        <Div display="flex" justifyContent="space-between">
          <Controls
            nextIteration={this.nextIteration}
            prevIteration={this.prevIteration}
            initialize={this.initialize}
            play={this.play}
            stop={this.stop}
            iterationInterval={iterationInterval}
            setIterationInterval={this.setIterationInterval}
          />
          <Display iterations={iterations} />
        </Div>
      </Main>
    );
  }
}

export default Game;
