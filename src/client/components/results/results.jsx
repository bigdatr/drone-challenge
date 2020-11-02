import React from 'react';
import PropTypes from 'prop-types';
import style from './styles.scss';

function DroneResults(props) {
	const {path, photos, unique} = props.results;

	return (<div className={style.results}>
		<h2>Drone Results</h2>
		<ul>
			<li>{`Path: ${path}`}</li>
			<li>{`Total Photographs: ${photos.length}`}</li>
			<li>{`Unique Photographs: ${unique}`}</li>
		</ul>
	</div>);
}

DroneResults.propTypes = {
	results: PropTypes.shape({
		path: PropTypes.string,
		photos: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
		unique: PropTypes.number
	})
};

export default DroneResults;