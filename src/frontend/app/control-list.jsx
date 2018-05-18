import React from 'react';
import Control from './control.jsx'

export default class ControlList extends React.Component {
    render () {
        return this.props.config.map((configElement) =>
           <Control onChange={(newStatus) => { this.props.onChange(configElement.id, newStatus) }}
               key={configElement.id} config={configElement} />
         );
    }
};
