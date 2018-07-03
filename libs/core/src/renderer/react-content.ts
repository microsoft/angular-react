import * as React from 'react';
import * as ReactDOM from 'react-dom';

const DEBUG = false;
export const CHILDREN_TO_APPEND_PROP = 'children-to-append';

export interface ReactContentProps {
  readonly [CHILDREN_TO_APPEND_PROP]: HTMLElement[];
}

export class ReactContent extends React.PureComponent<ReactContentProps> {

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    if (this.props[CHILDREN_TO_APPEND_PROP]) {
      if (DEBUG) { console.warn('ReactContent Component > componentDidMount > childrenToAppend:', this.props[CHILDREN_TO_APPEND_PROP]); }
      this.props[CHILDREN_TO_APPEND_PROP].map(child => element.appendChild(child));
    }
  }

  render() {
    return React.createElement('react-content');
  }
}
