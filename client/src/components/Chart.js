import { Line } from 'react-chartjs-2';

import React from 'react';

class Chart extends React.Component {
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
    this.label = dataFromServer.map(item => parseFloat(item.date.slice(8, 10)));
    console.log(this.label);
    return this.label;
  };
  render() {
    const data = {
      labels: this.getLabel(), // should be ['aaa','aaa']
      datasets: [
        {
          label: 'Temperature',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          data: this.getData(),
          spanGaps: true
        }
      ]
    };
    return (
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
    );
  }
}

export default Chart;
