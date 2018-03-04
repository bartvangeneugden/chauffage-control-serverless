import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
    render () {
        return <h1>Chauffage Control: {CONFIG.api_url}</h1>;
    }
}

render(<App/>, document.getElementById('app'));
