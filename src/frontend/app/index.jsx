import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import ControlList from './control-list.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {config: []};
  }

  render () {
    return <div>
      <h1>Chauffage Control</h1>
      <ControlList config={this.state.config} />
    </div>;
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
