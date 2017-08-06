import React, { Component } from 'react';
import { Main, Div } from 'glamorous';
import { Range, List } from 'immutable';
import Cell from './Cell';
import Controls from './Controls';
import Display from './Display';
import { neighborsSelector, sumLivingNeighbors } from '../utils';

const DEFAULT_HEIGHT = 15;
const DEFAULT_WIDTH = 20;

class Game extends Component {
  static getInitializeState = (height, width) => {
    const board = Range(0, height * width)
      .map(cell => Number(Math.random() >= 0.8))
      .toList();

    return {
      board,
      iterations: 0,
      history: List([board]),
      isEnd: false,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      ...Game.getInitializeState(DEFAULT_HEIGHT, DEFAULT_WIDTH),
      height: DEFAULT_HEIGHT,
      width: DEFAULT_WIDTH,
      iterationInterval: 500,
    };
  }

  componentWillUnmount() {
    this.stop();
  }

  initialize = () => {
    this.setState(({ height, width }) => Game.getInitializeState(height, width));
  };

  nextIteration = () => {
    this.setState(({ iterations, board, history, height, width }) => {
      let isChanged = false;
      
      const nextBoard = board.map((isLiving, index) => {
        const livingNeighbors = sumLivingNeighbors(neighborsSelector(height, width, index), board);

        const isLivingNext = isLiving
          ? Number(livingNeighbors === 2 || livingNeighbors === 3)
          : Number(livingNeighbors === 3);

        if (isLivingNext !== isLiving) {
          isChanged = true;
        }

        return isLivingNext;
      });

      const nextIterations = iterations + 1;

      if (!isChanged) {
        return {
          isEnd: true,
        };
      }

      return {
        iterations: nextIterations,
        board: nextBoard,
        history: history.set(nextIterations, nextBoard)
          .take(nextIterations + 1),
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

  setSize = (size) => {
    this.setState(size, () => {
      this.initialize();
    });
  };

  setIsLiving = (index) => {
    this.setState(({ board, history }) => {
      const nextBoard = board.update(index, cell => Number(!cell));

      return {
        board: nextBoard,
        history: List(nextBoard),
        iterations: 0,
        isEnd: false,
      };
    });
  };

  render() {
    const { board, height, width, iterations, iterationInterval } = this.state;

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
              key={`${height}-${width}-${index}`}
              index={index}
              isLiving={isLiving}
              setIsLiving={this.setIsLiving}
            />
          ))}
        </Div>

        <Div display="flex" justifyContent="space-between">
          <Controls
            height={height}
            width={width}
            setSize={this.setSize}
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
