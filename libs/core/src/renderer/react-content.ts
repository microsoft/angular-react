import * as React from 'react';
import * as ReactDOM from 'react-dom';

const DEBUG = false;
export const CHILDREN_TO_APPEND_PROP = 'children-to-append'; // TODO: Change to Symbol('children-to-append') after upgrade to TS 2.7.

export interface ReactContentProps {
  readonly 'children-to-append': HTMLElement[]; // TODO: use CHILDREN_TO_APPEND_PROP after upgrade to TS 2.7.
  experimentalMode?: boolean;
}

export class ReactContent extends React.PureComponent<ReactContentProps> {

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    if (this.props[CHILDREN_TO_APPEND_PROP]) {
      if (DEBUG) { console.warn('ReactContent Component > componentDidMount > childrenToAppend:', this.props[CHILDREN_TO_APPEND_PROP]); }

      const hostElement = this.props.experimentalMode ? element.parentElement : element;
      this.props[CHILDREN_TO_APPEND_PROP].forEach(child => hostElement.appendChild(child));
    }
  }

  render() {
    return React.createElement('react-content', this.props.experimentalMode && { style: { display: 'none' } });
  }
}
