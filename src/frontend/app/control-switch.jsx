import React from 'react';
import Button from 'react-bootstrap/lib/Button'

export default class ControlSwitch extends React.Component {

  render() {
    if (this.props.turnedOn) {
      return <Button bsStyle="danger">Switch off</Button>;
    } else {
      return <Button bsStyle="success">Switch on</Button>;
    }
  }

}
