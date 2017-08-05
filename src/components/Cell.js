import React, { PureComponent } from 'react';
import { Div } from 'glamorous';

const sumLivingNeighbors = neighbors => Object.values(neighbors)
  .reduce((sum, cell) => sum + Number(cell && cell.isLiving), 0);

class Cell extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      livingNeighbors: sumLivingNeighbors(props.neighbors),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.iterations !== this.props.iterations) {
      const livingNeighbors = sumLivingNeighbors(nextProps.neighbors);

      nextProps.setLiving(
        nextProps.index,
        nextProps.isLiving
          ? livingNeighbors === 2 || livingNeighbors === 3
          : livingNeighbors === 3
      );
    }
  }

  render() {
    const { isLiving } = this.props;

    return (
      <Div
        backgroundColor={isLiving ? '#CCC' : '#FFF'}
        border="1px solid #999"
        height="30px"
        width="30px"
      >
      </Div>
    );
  }
};

export default Cell;
