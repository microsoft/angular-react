import * as React from 'react';
import ReactDOM = require('react-dom');

export class ReactContent extends React.Component {

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    console.log('component mounted, node:', element, 'props:', this.props);
    if (this.props['childtoappend']) {
      element.appendChild(this.props['childtoappend']);
    }
  }

  render() {
    return React.createElement('react-content');
  }
}
