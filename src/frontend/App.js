import React, { useState } from "react";
import ReactDOM from "react-dom";
import Helmet from "react-helmet";

import Uploader from "./components/Uploader";
import Results from "./components/Results";

import "./App.css";

function App() {
  const [numberOfDrones, setNumberOfDrones] = useState(2);
  const [instructionsFile, setInstructionsFile] = useState(null);
  const [isFormSubmitted, handleSubmit] = useState(false);

  if (isFormSubmitted) {
    return (
      <Results
        instructionsFile={instructionsFile}
        numberOfDrones={numberOfDrones}
      />
    );
  }

  return (
    <div className="app-wrapper">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blue Flag Billboard Drone Survey</title>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet" />
      </Helmet>
      <h1>Blue Flag Billboard Drone Survey</h1>

      <label>Number of drones</label>
      <input
        value={numberOfDrones}
        onChange={event =>
          setNumberOfDrones(event.target.value.replace(/\D/, ""))
        }
      />
      <Uploader setInstructionsFile={setInstructionsFile} />
      <button
        disabled={!numberOfDrones || !instructionsFile}
        onClick={() => handleSubmit(true)}
      >
        Deploy drones
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
