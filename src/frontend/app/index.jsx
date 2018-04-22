import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import ControlList from './control-list.jsx'
import ConfigList from './config-list.jsx'
import { HashRouter as Router, Route} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { config: [], loading: false };
    this.configChanged = this.configChanged.bind(this);
    this.saveConfig = this.saveConfig.bind(this);
  }

  render () {
    return <Router>
      <div>
        <h1>Chauffage Control</h1>
        <Panel>
          <Panel.Body>
            <ButtonGroup>
              <LinkContainer to="/">
                  <Button>Control</Button>
              </LinkContainer>
              <LinkContainer to="/config">
                  <Button>Config</Button>
              </LinkContainer>
            </ButtonGroup>
          </Panel.Body>
        </Panel>
        <Route exact path="/" render={(routeProps) =>
            (<ControlList {...routeProps} {...this.state} />)} />
        <Route path="/config" render={(routeProps) =>
            (<ConfigList config={this.state.config} onChange={this.configChanged} />)} />
      </div>
    </Router>;
  }

  configChanged(newConfig) {
    this.setState({config: newConfig});
    this.saveConfig(newConfig);
  }

  saveConfig(newConfig) {
    axios.post(`${CONFIG.api_url}/api/config.json`)
        .then((result) => {
            this.setState({
                config: result.data
            });
        }).catch(() => {
          this.setState({ loading: false });
        });
  }

  componentDidMount() {
    var _this = this;
    this.setState({ loading: true });
    this.serverRequest = axios.get(`${CONFIG.api_url}/api/config.json`)
    .then((result) => {
      _this.setState({
        config: result.data,
        loading: false
      });
    }).catch(() => {
      _this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }
}

render(<App/>, document.getElementById('app'));
