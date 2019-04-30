import { Line } from 'react-chartjs-2';

import React from 'react';

class Chart extends React.Component {
  state = {
    range: 1
  };
  test;
  label;
  componentDidUpdate(prevProps, prevState) {
    this.getData();
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) {
      return [];
    }
    //let arr = [];
    this.test = dataFromServer.map(item => {
      if (item.temperature === '') {
        return null;
      } else {
        return parseFloat(item.temperature);
      }
    });

    console.log(this.test);
    return this.test;
  };
  getLabel = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) {
      return [];
    }

    this.label = dataFromServer.map(
      item => item.date.slice(4, 7) + parseFloat(item.date.slice(8, 10))
    );

    return this.label;
  };
  render() {
    const data = {
      labels: this.getLabel(),
      datasets: [
        {
          label: 'Temperature',
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          data: this.getData(),
          spanGaps: true
        }
      ]
    };
    return (
      <div>
        <select>
          <option value={1}>1</option>
          <option value={3}>3</option>
        </select>
        <button>next</button>
        <button>prev</button>
        <div
          style={{
            width: '80%',
            margin: '0 auto',
            paddingTop: '100px'
          }}
        >
          <Line
            data={data}
            width={400}
            height={400}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
      </div>
    );
  }
}

export default Chart;
