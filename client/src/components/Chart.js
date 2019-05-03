import { Line, Bar } from 'react-chartjs-2';
import dateFns from 'date-fns';
import React from 'react';

class Chart extends React.Component {
  state = {
    range: 1
  };
  test;
  label;
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

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

    return this.test;
  };
  getPeriodData = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) {
      return [];
    }
    //let arr = [];

    const period = dataFromServer.map(item => {
      if (item.periodNew) {
        return 38;
      } else {
        return null;
      }
    });

    // return this.test;
  };
  getLabel = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));

    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);

    const day = dateFns.format(monthStart, 'd');

    var result = dateFns.eachDay(monthStart, monthEnd);

    let chartData = [];

    let period = dataFromServer.filter(item => item.periodNew);
    let temperature = dataFromServer.filter(item => item.temperature !== '');

    result.forEach(item =>
      chartData.push({ label: item.toString().slice(4, 10) })
    );
    console.log(chartData);

    chartData.forEach((data, index) => {
      for (let i = 0; i < period.length; i++) {
        if (data.label === period[i].date.slice(4, 10)) {
          chartData[index]['period'] = 37;
        }
      }
    });

    chartData.forEach((data, index) => {
      for (let i = 0; i < temperature.length; i++) {
        if (data.label === temperature[i].date.slice(4, 10)) {
          chartData[index]['temp'] = temperature[i].temperature;
        }
      }
    });

    console.log(chartData);

    return chartData;
    // const label = result.map(item => item.toString().slice(4, 10));
    // return label;
  };
  render() {
    var options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1.25
          }
        ]
      }
    };
    const data = {
      labels: this.getLabel().map(item => item.label),
      datasets: [
        {
          label: 'Temperature',
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          data: this.getLabel().map(item => item.temp),
          spanGaps: true,
          type: 'line'
        },
        {
          label: 'period',
          data: this.getLabel().map(item => item.period),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',

          type: 'bar'
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
          <Bar data={data} width={400} height={400} options={options} />
        </div>
      </div>
    );
  }
}

export default Chart;
