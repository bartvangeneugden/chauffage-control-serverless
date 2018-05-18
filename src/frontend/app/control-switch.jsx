import React from 'react';
import Button from 'react-bootstrap/lib/Button'

export default class ControlSwitch extends React.Component {

  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  render() {
    if (this.props.turnedOn) {
      return <Button bsStyle="danger" onClick={this.toggle}>Switch off</Button>;
    } else {
      return <Button bsStyle="success" onClick={this.toggle}>Switch on</Button>;
    }
  }

  toggle() {
      this.props.onChange( ! this.props.turnedOn );
  }

}
