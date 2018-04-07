import * as React from 'react';
import ReactDOM = require('react-dom');
import { CHILD_TO_APPEND_PROP } from '@angular-react/core/src/renderer/react-node';

export class ReactContent extends React.Component {

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    console.log('component mounted, node:', element, 'props:', this.props);
    if (this.props['childtoappend']) {
      element.appendChild(this.props[CHILD_TO_APPEND_PROP]);
    }
  }

  render() {
    return React.createElement('react-content');
  }
}
