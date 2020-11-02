import React from 'react';
import ReactDOM from 'react-dom';
import useFetch from 'react-fetch-hook';
import DroneInput from './components/drone_input/drone_input.js';
import styles from './styles.scss';

console.log('React', React);
const {useState} = React;


function App() {
	const [results, setResults] = useState(null);

	return (<div className={styles.main}>
		<h1>Drone Challenge</h1>
		<DroneInput setResults={setResults} />
	</div>);
}


ReactDOM.render(<App />, document.getElementById('app'));
