import React from 'react'
import { Card, Table, Badge } from 'reactstrap';

import { DroneTable } from './DroneTable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faImage, faCode, faPlane } from '@fortawesome/free-solid-svg-icons'

export const DroneResults = (props) => {
    const { totalSnapshots, uniqueSnapshots, instructions, drones } = props.result;
    return (
        <Card className="resultsCard mt-2">
            <h2>Launch Results</h2>
            <div>
                <Badge color="primary"><FontAwesomeIcon icon={faPlane} />{' '}{drones.length} Drones</Badge>
                <Badge color="info"><FontAwesomeIcon icon={faImage} />{' '}{uniqueSnapshots} Billboards</Badge>
                <Badge color="warning"><FontAwesomeIcon icon={faCamera} />{' '}{totalSnapshots} Snapshots</Badge>
                <Badge color="dark"><FontAwesomeIcon icon={faCode} />{' '}{instructions.length} Instructions</Badge>
            </div>

            <p className="lead">Instructions</p>
            <p className="scrollWrapper">{instructions}</p>

            <DroneTable drones={drones}/>
        </Card>
    );
}
