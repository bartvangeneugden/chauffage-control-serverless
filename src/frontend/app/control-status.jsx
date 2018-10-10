import React from 'react';
import Label from 'react-bootstrap/lib/Label'

export default class ControlStatus extends React.Component {
  render() {
    if (this.props.turnedOn) {
      return <Label bsStyle="success">{this.getLabelToShow()}</Label>
    } else {
      return <Label bsStyle="danger">{this.getLabelToShow()}</Label>
    }
  }

  getLabelToShow() {
    if (this.props.turnedOn && this.props.timeLeft > 0) {
      return `On for ${this.props.timeLeft} sec`
    } else if (this.props.turnedOn) {
      return "On"
    } else {
      return "Off"
    }
  }
}
