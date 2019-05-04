import { Bar } from 'react-chartjs-2';
import dateFns from 'date-fns';
import React from 'react';

class Chart extends React.Component {
  state = {
    currentMonth: new Date()
  };

  handlePrevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  handleNextMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, -1)
    });
  };

  getData = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    const { currentMonth } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    let eachDaysInMonth = dateFns.eachDay(monthStart, monthEnd);
    let chartData = [];
    let periodArr = '';
    let temperatureArr = '';

    if (dataFromServer) {
      periodArr = dataFromServer.filter(data => data.period);
      temperatureArr = dataFromServer.filter(data => data.temperature !== '');
    }

    eachDaysInMonth.forEach(data =>
      chartData.push({ label: data.toString().slice(4, 10) })
    );

    chartData.forEach((data, index) => {
      for (let i = 0; i < periodArr.length; i++) {
        if (data.label === periodArr[i].date.slice(4, 10)) {
          chartData[index]['period'] = 38;
        }
      }
    });

    chartData.forEach((data, index) => {
      for (let i = 0; i < temperatureArr.length; i++) {
        if (data.label === temperatureArr[i].date.slice(4, 10)) {
          chartData[index]['temperature'] = temperatureArr[i].temperature;
        }
      }
    });
    return chartData;
  };

  render() {
    const options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1.25
          }
        ],
        yAxes: [
          {
            ticks: {
              min: 35,
              max: 38
            }
          }
        ]
      },
      tooltips: {
        enabled: false
      }
    };
    const data = {
      labels: this.getData().map(data => data.label),
      datasets: [
        {
          label: 'Temperature',
          type: 'line',
          data: this.getData().map(data => data.temperature),
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          spanGaps: true
        },
        {
          label: 'Period',
          type: 'bar',
          data: this.getData().map(data => data.period),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.2)'
        }
      ]
    };

    return (
      <div>
        <button onClick={this.handlePrevMonth}>prev</button>
        <button onClick={this.handleNextMonth}>next</button>
        <h3>{dateFns.format(this.state.currentMonth, 'MMM YYYY')}</h3>
        <div
          style={{
            width: '65%',
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
