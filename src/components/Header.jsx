import React from 'react'
import './Header.css'

export default props =>
    <header className="header">
        <h1> Drone Challenge </h1>
        <p><b>Keys:</b> {'north (^), south (v), east (>) or west (<) or take a photograph (x)'}</p>
    </header>