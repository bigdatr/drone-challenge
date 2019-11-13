import React from 'react';
import ReactDOM from 'react-dom';
import useFetch from 'react-fetch-hook';
import './client.css';
import DroneForm from './components/DroneForm';


function App() {
    const {isLoading, data} = useFetch('http://localhost:4001');
    if(isLoading) {
        return 'Loading...';
    }

    return (
    <div id="container">
        <h1 id="title">Drone Challenge</h1>  
        <DroneForm />
    </div>
    )

    return <pre>{JSON.stringify(data, null, 4)}</pre>;
}


ReactDOM.render(<App />, document.getElementById('app'));
