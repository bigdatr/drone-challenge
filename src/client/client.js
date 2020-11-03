import React from 'react';
import ReactDOM from 'react-dom';
import useFetch from 'react-fetch-hook';
import DroneInput from './components/drone_input/drone_input.jsx';
import DroneResults from './components/results/results.jsx';
import styles from './styles.scss';

console.log('React', React);
const {useState} = React;


function App() {
	const [results, setResults] = useState(null);

	return (<div className={styles.main}>
		<h1>Drone Challenge</h1>
		<DroneInput setResults={setResults} />
		{results?.photos ? <DroneResults results={results} /> : null}
		{results?.error ? <span className={styles.error}>{results.error}</span> : null }
	</div>);
}


ReactDOM.render(<App />, document.getElementById('app'));
