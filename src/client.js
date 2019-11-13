import React, { useEffect, useState, Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import useFetch from 'react-fetch-hook';


class App extends Component {
  constructor(props){
    super(props);
    this.state = { token: '', billBoards: 0 }
  }
  async componentDidMount(){
    // const result = await axios.get(
    //   'http://localhost:4001/getBillBoards2',
    //   {params: { token: 'x^xv' }}
    // );
    // this.setState({ billBoards: result.data.data });
  }
  async getBillBoards1(){
    const result = await axios.get(
      'http://localhost:4001/getBillBoards1',
      {params: { token: this.state.token }}
    );
    this.setState({ billBoards: result.data.data });
  }
  async getBillBoards2(){
    const result = await axios.get(
      'http://localhost:4001/getBillBoards2',
      {params: { token: this.state.token }}
    );
    this.setState({ billBoards: result.data.data });
  }
  handleChange(event){
    this.setState({ token: event.target.value });
  }
  render(){
    return(
      <div>
        <textarea name="body"
          onChange={(event)=>{
            this.handleChange(event);
          }}
          value={this.state.token}
        />
        <button onClick={async() => {
          await this.getBillBoards1();
        }}>
          Get BillBoards(Part1)
        </button>
        <button onClick={async() => {
          await this.getBillBoards2();
        }}>
          Get BillBoards(Part2)
        </button>
        <p>BillBoards Count: {this.state.billBoards}</p>
      </div>
    )
  }
}

// function App() {
//   const [data, setData] = useState({ hits: 0 });
    // useEffect(() => {
    //   // async function fetchData() {
    //   //   const result = await axios(
    //   //     'http://localhost:4001',
    //   //   );
    //   //   console.log('Data: ', result.data.data);
    //   //   setData(2);
    //   // }
    //   // fetchData();
    //   setData(2);
    // }, []);
    // setData(2);

//   const [count, setCount] = useState(0);
//
// // Similar to componentDidMount and componentDidUpdate:
// useEffect(() => {
//   // Update the document title using the browser API
//   document.title = `You clicked ${count} times`;
// });
//
// return (
//   <div>
//     <p>You clicked {count} times</p>
//     <button onClick={() => setCount(count + 1)}>
//       Click me
//     </button>
//   </div>
// );
// }


ReactDOM.render(<App />, document.getElementById('app'));
