import React from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import Radio from 'react-bootstrap/lib/Radio'

export default class Config extends React.Component {

  constructor (props) {
    super(props);
    this.setName = this.setName.bind(this);
    this.setFunction = this.setFunction.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  render () {
    return <Panel>
        <Panel.Body>
          <Grid>
            <Row>
              <Col xs={12} md={4}>
                <FormGroup controlId={"title-" + this.props.config.id}>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl onChange={this.setName} type="text" value={this.props.config.title} placeholder="Enter a name"></FormControl>
                </FormGroup>
              </Col>
              <Col xs={12} md={4}>
                <FormGroup controlId={"function-" + this.props.config.id}>
                  <ControlLabel>Function</ControlLabel>
                  <FormControl componentClass="select" placeholder="select" onChange={this.setFunction} defaultValue={this.props.config.function}>
                    <option value="timer">Timer</option>
                    <option value="switch">On/Off</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={12} md={3}>
                <FormGroup controlId={"timer-" + this.props.config.id}>
                  <ControlLabel>Timer time</ControlLabel>
                  <FormControl onChange={this.setTimer} type="text" value={this.props.config.timer} placeholder="Enter a time in minutes"></FormControl>
                </FormGroup>
              </Col>
            </Row>
          </Grid>
        </Panel.Body>
      </Panel>;
  }

  setName(event) {
    this.props.onChange(Object.assign(this.props.config, {title: event.target.value}));
  }

  setFunction(event) {
    this.props.onChange(Object.assign(this.props.config, {function: event.target.value}));
  }

  setTimer(event) {
    this.props.onChange(Object.assign(this.props.config, {timer: event.target.value}));
  }

};
