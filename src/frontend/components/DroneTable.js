import React from 'react'
import { Table } from 'reactstrap';

import './DroneTable.css';

export const DroneTable = ({drones}) => (<Table className="droneTable">
    <thead>
        <tr>
            <th scope="col" style={{ width: '10%' }}>Drone #</th>
            <th scope="col" style={{ width: '40%' }}>Instructions</th>
            <th scope="col" style={{ width: '20%' }}>Base Coordinates</th>
            <th scope="col" style={{ width: '20%' }}>Final Coordinates</th>
            <th scope="col" style={{ width: '10%' }}>Billboards</th>
        </tr>
    </thead>
    <tbody>
        {drones.map(({ xPos, yPos, xPosStart, yPosStart, instructionArr, billboards }, i) => (
            <tr>
                <th scope="row">{i + 1}</th>
                <td className={"scrollWrapper"}>{instructionArr.join("")}</td>
                <td>{`(${xPosStart}, ${yPosStart})`}</td>
                <td>{`(${xPos}, ${yPos})`}</td>
                <td>{Object.keys(billboards).length}</td>
            </tr>
        ))}
    </tbody>
</Table>)