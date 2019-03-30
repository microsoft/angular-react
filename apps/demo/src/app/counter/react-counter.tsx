import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface CounterProps {
  count?: number;
  onIncrement?: (count: number) => void;
}

export const Counter: React.FC<CounterProps> = ({ count = 0, onIncrement, children, ...rest } = {}) => {
  return (
    <button {...rest} onClick={() => onIncrement(count + 1)}>
      <div>
        <h5>children:</h5>
        {children}
      </div>
      <div>
        <h5>count:</h5>
        {count}
      </div>
    </button>
  );
};

Counter.propTypes = {
  count: PropTypes.number,
  onIncrement: PropTypes.func,
};
