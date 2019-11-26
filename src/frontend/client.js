import React from 'react';
import ReactDOM from 'react-dom';
import useFetch from 'react-fetch-hook';
import { Drones } from './components/Drones';

import 'bootstrap/dist/css/bootstrap.min.css';
import './client.css';

function App() {
    const {isLoading, data} = useFetch('http://localhost:4001');
    if(isLoading) {
        return 'Loading...';
    }
    return <Drones />;
    return <pre>{JSON.stringify(data, null, 4)}</pre>;
}


ReactDOM.render(<App />, document.getElementById('app'));
