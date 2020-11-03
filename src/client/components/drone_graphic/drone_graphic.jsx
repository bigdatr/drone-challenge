import PropTypes from 'prop-types';
import React from 'react';
import style from './styles.scss';


function DroneGraphic(props) {
	const {photos, drones} = props;
	const squareSize = 50;
	// These need to be updated if the drone path changes
	const imgWidth = 32;
	const imgHeight = 32;

	const allPhotos = photos.flat();

	// Iterate through the photos and get the biggest of each coordinate
	const gridSize = allPhotos.reduce(
		(acc, photo) => [
			acc[0] > photo[0]
				? acc[0]
				: photo[0],
			acc[1] > photo[1]
				? acc[1]
				: photo[1]
		],
		[0, 0]
	);

	console.log('Grid size', gridSize);

	const width = ((gridSize[0] + 1) * squareSize) + 1;
	const height = ((gridSize[1] + 1) * squareSize) + 1;

	return (
	<svg
		className={style.graphic}
		width={`${width}px`}
		height={`${height}px`}
		xmlns="http://www.w3.org/2000/svg"
	>
		<pattern
			id="grid"
			width={squareSize}
			height={squareSize}
			patternUnits="userSpaceOnUse"
		>
			<path d={`M ${squareSize} 0 L 0 0 0 ${squareSize}`} fill="none" stroke="gray" strokeWidth="1"/>
		</pattern>
		<rect width={width} height={height} fill="url(#grid)" />
		{allPhotos.map((photo, index) => (
			<g
				key={index}
				transform={`translate(${(photo[0] * squareSize) + ((squareSize - imgWidth) / 2)} ${height - ((photo[1] + 1) * squareSize) + ((squareSize - imgHeight) / 2)})`}
			>
				<path d="M16,14c2.2,0,4,1.8,4,4s-1.8,4-4,4s-4-1.8-4-4S13.8,14,16,14z M16,14c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4  S18.2,14,16,14z M27,8h-4c-0.3,0-0.6-0.1-0.8-0.4l-1.9-2.4C19.8,4.5,18.9,4,18,4h-4c-1,0-1.9,0.5-2.4,1.2L9.8,7.6C9.6,7.8,9.3,8,9,8  H5c-1.7,0-3,1.3-3,3v14c0,1.7,1.3,3,3,3h22c1.7,0,3-1.3,3-3V11C30,9.3,28.7,8,27,8z M16,24c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6  S19.3,24,16,24z M25.5,14c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S26.3,14,25.5,14z M16,14c-2.2,0-4,1.8-4,4  s1.8,4,4,4s4-1.8,4-4S18.2,14,16,14z M16,14c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S18.2,14,16,14z M16,14c-2.2,0-4,1.8-4,4  s1.8,4,4,4s4-1.8,4-4S18.2,14,16,14z M16,14c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S18.2,14,16,14z M16,14c-2.2,0-4,1.8-4,4  s1.8,4,4,4s4-1.8,4-4S18.2,14,16,14z M16,14c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S18.2,14,16,14z"></path>
			</g>
		))}
	</svg>);
}

DroneGraphic.propTypes = {
	drones: PropTypes.number,
	photos: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
};

export default DroneGraphic;
