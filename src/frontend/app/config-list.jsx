import React from 'react';
import Config from './config.jsx'
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel'

export default class ConfigList extends React.Component {
  constructor (props) {
    super(props);
    this.configChanged = this.configChanged.bind(this);
    this.saveButtonClicked = this.saveButtonClicked.bind(this);
  }
  render () {
      const elementStack = this.props.config.map((configElement) =>
          <Config key={configElement.id} config={configElement} onChange={this.configChanged} />
      );
      elementStack.push(<Panel key="savePanel">
        <Panel.Body>
          <Button bsSize="large" onClick={this.saveButtonClicked} bsStyle="success">Save</Button>
        </Panel.Body>
      </Panel>);
      return elementStack;
  }

  saveButtonClicked() {
    this.props.onSaveClicked();
  }

  configChanged(updatedConfigElement) {
    const indexToBeUpdated = this.props.config.findIndex((conf => conf.id === updatedConfigElement.id));
    let updatedProps = this.props.config;
    updatedProps[indexToBeUpdated] = updatedConfigElement;
    this.props.onChange(updatedProps);
  }
};
