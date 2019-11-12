import React from 'react'

import './InstructionBox.css'

export const InstructionBox = ({ placeholder, handleChange }) => (
    <input
        className="instruction"
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
    />
)