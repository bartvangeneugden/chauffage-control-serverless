import React from 'react';
import Control from './control.jsx'

export default class ControlList extends React.Component {
    render () {
        return this.props.config.map((configElement) =>
           <Control key={configElement.id} config={configElement} />
         );
    }
};
