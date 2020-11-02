import React from 'react';

const {useState} = React;


function DroneInput(props) {
	const [instructions, setInstructions] = useState('x^>xv');
	const {setResults} = props;

	const sendInstructions = (evt) => {
		evt.preventDefault();
		return fetch(`/drone/single?path=${encodeURI(instructions)}`)
			.then((response) => response.json())
			.then((response) => setResults(response));
	};

	console.log('ok');

	return (<form onSubmit={sendInstructions}>
		<h2>Enter drone instructions</h2>
		<p>Valid drone instructions are:</p>
		<ul>
			<li>x: take a photo</li>
			<li>^: Move 1km north</li>
			<li>&gt;: Move 1km east</li>
			<li>&lt;: Move 1km west</li>
			<li>v: Move 1km south</li>
		</ul>
		<input type="text" value={instructions} onChange={(evt) => setInstructions(evt.target.value)} />
		<input type="submit" value="Send" />
	</form>);
}

export default DroneInput;
