import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Dashboard from "./components/Dashboard";


function App() {
    return <Dashboard />;
}


ReactDOM.render(<App />, document.getElementById('app'));
