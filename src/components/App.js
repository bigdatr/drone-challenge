import React, { Fragment, useState } from 'react';
import { Dropdown, Input, Button, Message, Progress } from 'semantic-ui-react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [file, setFile] = useState('');
  const [droneNumber, setDroneNumber] = useState(1);
  const [photographySummary, setPhotographySummary] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onMessageDismiss = () => {
    setMessage('');
  }
  const onSelectChange = (e, {value}) => {
    setDroneNumber(value);
  }
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  }; 

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('drone_number', droneNumber);

    try {
      const res = await axios.post('http://localhost:4001/api/instructions/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 8000);
        }
      });

      const { droneStateArrayWithPhoto, totalPhotoTaken } = res.data;

      setPhotographySummary({ droneStateArrayWithPhoto, totalPhotoTaken });

      setMessage('Instructions sent and result returned');
    } catch (err) {
      console.error(err);
      if (err.response.status === 500 ) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };


  const options = [
    { key: '1', value: 1, text: 'Single Drone' },
    { key: '2', value: 2, text: 'Two Drones'}
  ]

  return (
    <Fragment>
      <form onSubmit={onSubmit} >
        <div>
          <Dropdown placeholder="Drone number" onChange={onSelectChange} selection options = {options} value={droneNumber} />
          <Input type="file" id="instruction" name="instruction" onChange={onFileChange} />
          <Button type="submit">Submit</Button>
        </div>
        <Progress percent={uploadPercentage} progress/>
        {message ? <Message onDismiss={onMessageDismiss} header="Message from Server" content={message} /> : null}
      </form>
      {photographySummary.totalPhotoTaken ? <div>Total Photos Taken: {JSON.stringify(photographySummary.totalPhotoTaken, null, 4)}</div> : null}
      {photographySummary.droneStateArrayWithPhoto ? <pre>{JSON.stringify(photographySummary.droneStateArrayWithPhoto, null, 4)}</pre> : null}
    </Fragment>
  )
}

export default App;