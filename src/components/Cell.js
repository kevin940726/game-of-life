import React, { PureComponent } from 'react';
import { Div } from 'glamorous';

class Cell extends PureComponent {
  handleClick = () => {
    this.props.setIsLiving(this.props.index);
  };

  render() {
    const { isLiving } = this.props;

    return (
      <Div
        css={{
          backgroundColor: isLiving ? '#CCC' : '#FFF',
          border: '1px solid #999',
          height: '30px',
          width: '30px',
          transition: 'background-color 0.15s ease-out',
          '&:hover': {
            backgroundColor: isLiving ? '#BBB' : '#EEE',
          },
        }}
        onClick={this.handleClick}
      />
    );
  }
}

export default Cell;
