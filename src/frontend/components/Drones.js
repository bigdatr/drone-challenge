import React, { useState, useEffect } from 'react'
import { Col, Row, Container, Label, Input, FormGroup, Button, Card, FormFeedback } from 'reactstrap';

import './Drones.css';

import { launchDrones } from '../api/drones';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import { DroneResults } from './DroneResults';

const validateInstructions = (instructions) => {
    // ensure instruction set only contains valid action characters
    const validRegex = /^[\^v<>x]+$/;
    const regex = new RegExp(validRegex);
    return (instructions.length > 0 && regex.test(instructions));
}

export const Drones = () => {
    const [instructions, setInstructions] = useState('');
    const [count, setCount] = useState(1);

    const [valid, setValid] = useState(false);

    const [launching, setLaunching] = useState(false);
    const [result, setResults] = useState(null);

    const onInputChange = (event) => {
        setInstructions(event.target.value);
    }

    const onCountChange = (event) => {
        setCount(Number.parseInt(event.target.value));
    }

    const launch = async () => {
        setLaunching(true);
        const launchResult = await launchDrones(instructions, count);
        setLaunching(false);

        setInstructions('');
        setResults(launchResult);
    }

    useEffect(() => {
        const isValid = validateInstructions(instructions);
        setValid(isValid);

        // handle adjusting count if user removes instructions from input
        if (instructions.length > 0 && count > instructions.length) {
            setCount(instructions.length);
        } 
    }, [instructions]);

    return (
        <Container>
            <Card className="launchCard">
                <Row>
                    <Col xs={12}>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <span>
                                <h1>Drone Billboard Launcher{'  '}</h1>
                                <p className="muted">By Blake Howe</p>
                            </span><FontAwesomeIcon icon={faRocket} size="4x" />
                        </div>

                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label for="instructionsInput">Instructions</Label>
                            <Input type="textarea" className={"instructionsInput"} name="instructionsInput" value={instructions} onChange={onInputChange} valid={valid} invalid={!valid && instructions.length > 0}/>
                            <FormFeedback>{'Please enter valid instructions - allowed characters (^,v,<,>,x)'}</FormFeedback>
                            <FormFeedback valid>Ready for Launch!</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}>
                        <FormGroup>
                            <Label for="countSelect">Drone Count</Label>
                            <Input type="select" name="countSelect" onChange={onCountChange} value={count}>
                                {Array.from(Array(10).keys(), n => n + 1).map(countOption => <option key={countOption} disabled={(countOption > 1) && (countOption > instructions.length)}>{countOption}</option>)}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs={8} className="align-self-center">
                        <Button color="info" size="lg" block onClick={launch} disabled={!valid || launching}>
                            <FontAwesomeIcon icon={faRocket} />{' '}Launch
                        </Button>
                    </Col>
                </Row>
            </Card>

            {result && <DroneResults result={result} />}
        </Container>
    )
}
