import React from 'react';
import style from './style.scss';

const {useState} = React;


function DroneInput(props) {
	const [instructions, setInstructions] = useState('x^>xv');
	const [droneCount, setDroneCount] = useState(1);
	const {setResults} = props;

	const sendInstructions = (evt) => {
		evt.preventDefault();
		let countPath = 'single';
		if(droneCount === 2) {
			countPath = 'double';
		}

		return fetch(`/drone/${countPath}?path=${encodeURI(instructions)}`)
			.then((response) => response.json())
			.then((response) => setResults(response));
	};

	console.log('ok');

	return (<form className={style.form} onSubmit={sendInstructions}>
		<h2>Enter drone instructions</h2>
		<h3 id="droneRadioLbl">Number of drones</h3>
		<div id="drone_input_count" className={style.radioButtons}>
			{[1,2].map((number) => (
				<label>
					<input
						type="radio"
						name="no-drones"
						value={number}
						checked={droneCount == number}
						onChange={() => setDroneCount(number)}
						aria-labelledby="droneRadioLbl"
					/>
					{number}
				</label>
			))}
		</div>

		<label for="drone_input_instructions">Instructions</label>
		<input className={style.input} type="text" id="drone_input_instructions" value={instructions} onChange={(evt) => setInstructions(evt.target.value)} />
		<input className={style.button} type="submit" value="Send" />
		<p>Valid drone instructions are:</p>
		<ul>
			<li>x: take a photo</li>
			<li>^: Move 1km north</li>
			<li>&gt;: Move 1km east</li>
			<li>&lt;: Move 1km west</li>
			<li>v: Move 1km south</li>
		</ul>
	</form>);
}

export default DroneInput;
