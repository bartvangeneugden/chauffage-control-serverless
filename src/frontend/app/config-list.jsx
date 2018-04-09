import React from 'react';
import Config from './config.jsx'

export default class ConfigList extends React.Component {
  constructor (props) {
    super(props);
    this.configChanged = this.configChanged.bind(this);

  }
  render () {
      return this.props.config.map((configElement) =>
         <Config key={configElement.id} config={configElement} onChange={this.configChanged} />
       );
  }

  configChanged(updatedConfigElement) {
    const indexToBeUpdated = this.props.config.findIndex((conf => conf.id === updatedConfigElement.id));
    let updatedProps = this.props.config;
    updatedProps[indexToBeUpdated] = updatedConfigElement;
    this.props.onChange(updatedProps);
  }
};
