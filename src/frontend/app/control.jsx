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
  }

  isControlTurnedOn() {
    return this.props.config.status == "on";
  }

  render () {
    return <Panel>
        <Panel.Body>
          <Grid>
            <Row>
              <Col xs={12} md={10}>
                {this.props.config.title}
                <span> - </span>
                <ControlStatus turnedOn={this.isControlTurnedOn()} timeLeft={this.state.timeLeft} />
              </Col>
              <Col xs={12} md={2}>
                <ControlSwitch turnedOn={this.isControlTurnedOn()} />
              </Col>
            </Row>
          </Grid>
        </Panel.Body>
      </Panel>;
  }

  componentDidMount () {
    this.timeout = setTimeout(() => {
      this.setState({timeLeft:
        (this.isControlTurnedOn() && this.props.config.function == "timer") ?
          Math.floor((this.props.config.timerEnds - Date.now()) / 60000) : 0
      })
    }, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.timeout);
  }
};
