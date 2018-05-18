import React from 'react';
import Button from 'react-bootstrap/lib/Button'

export default class ControlSwitch extends React.Component {

  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  render() {
    if (this.props.turnedOn) {
      return <Button bsStyle="danger">Switch off</Button>;
    } else {
      return <Button bsStyle="success">Switch on</Button>;
    }
  }

  toggle() {
      this.props.onChange( ! this.props.turnedOn );
  }

}
