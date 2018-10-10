import React from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import ControlStatus from './control-status.jsx'
import ControlSwitch from './control-switch.jsx'

export default class Control extends React.Component {

  constructor (props) {
    super(props);
    this.state = {timeLeft: 0};
    this.isControlTurnedOn = this.isControlTurnedOn.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
  }

  isControlTurnedOn() {
    return (this.props.config.function === "timer" && this.props.config.timerEnds >= Date.now())
      || (this.props.config.function !== "timer" && this.props.config.status == "on");
  }

  render () {
    return <Panel>
        <Panel.Body>
          <Grid>
            <Row>
              <Col xs={12} md={10}>
                {this.props.config.title}
                <span> - </span>
                <ControlStatus onChange={this.props.onChange} turnedOn={this.isControlTurnedOn()} timeLeft={this.state.timeLeft} />
              </Col>
              <Col xs={12} md={2}>
                <ControlSwitch onChange={this.props.onChange} turnedOn={this.isControlTurnedOn()} />
              </Col>
            </Row>
          </Grid>
        </Panel.Body>
      </Panel>;
  }

  componentDidMount () {
    this.updateTimer();
  }

  updateTimer () {
    if (this.isControlTurnedOn() && this.props.config.function == "timer") {
      this.setState({timeLeft: Math.floor((this.props.config.timerEnds - Date.now()) / 1000)});
    } else {
      this.setState({timeLeft: 0});
    }
    this.timeout = setTimeout(this.updateTimer, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.timeout);
  }
};
