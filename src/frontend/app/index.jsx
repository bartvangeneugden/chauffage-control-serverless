import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import ControlList from './control-list.jsx'
import ConfigList from './config-list.jsx'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {config: []};
    this.configChanged = this.configChanged.bind(this);
  }

  render () {
    return <Router>
      <div>
        <h1>Chauffage Control</h1>
        <ul>
          <li><Link to="/">Control</Link></li>
          <li><Link to="/config">Config</Link></li>
        </ul>
        <Route exact path="/" render={(routeProps) =>
            (<ControlList {...routeProps} {...this.state} />)} />
        <Route path="/config" render={(routeProps) =>
            (<ConfigList config={this.state.config} onChange={this.configChanged} />)} />
      </div>
    </Router>;
  }

  configChanged(newConfig) {
    this.setState({config: newConfig})
  }

  componentDidMount() {
    var _this = this;
    this.serverRequest = axios.get(`${CONFIG.api_url}/api/config.json`)
    .then(function(result) {
      _this.setState({
        config: result.data
      });
    })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }
}

render(<App/>, document.getElementById('app'));
