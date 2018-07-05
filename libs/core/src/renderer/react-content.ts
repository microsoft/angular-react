import * as React from 'react';
import * as ReactDOM from 'react-dom';


const DEBUG = false;
export const CHILDREN_TO_APPEND_PROP = 'children-to-append';

export class ReactContent extends React.Component {

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    if (this.props[CHILDREN_TO_APPEND_PROP]) {
      if (DEBUG) { console.warn('ReactContent Component > componentDidMount > childrenToAppend:', this.props[CHILDREN_TO_APPEND_PROP]); }

      const parentElement = element.parentElement;
      this.props[CHILDREN_TO_APPEND_PROP].map(child => parentElement.appendChild(child));
    }
  }

  render() {
    return React.createElement('react-content', { style: { display: 'none' } });
  }
}
