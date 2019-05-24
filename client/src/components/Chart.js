import { Bar } from 'react-chartjs-2';
import dateFns from 'date-fns';
import React from 'react';
import '../css/Chart.css';
import firebase from '../firebase';
import loading from '../loading.gif';
class Chart extends React.Component {
  state = {
    currentMonth: new Date(),
    dataFromServer: '',
    chartData: []
  };
  getDataFromServer = async () => {
    const data = await firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        firebase
          .database()
          .ref('data/' + authUser.uid)
          .on('value', snapshot => {
            if (snapshot.val() === null) {
              this.setState(
                {
                  dataFromServer: []
                },
                () => {
                  this.getChartData();
                }
              );
            } else {
              this.setState(
                {
                  dataFromServer: snapshot.val().map(item => item)
                },
                () => {
                  this.getChartData();
                }
              );
            }
          });
      }
    });
  };
  componentWillMount() {
    this.getDataFromServer();
  }
  handlePrevMonth = () => {
    this.setState(
      {
        currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
      },
      () => {
        this.getChartData();
      }
    );
  };

  handleNextMonth = () => {
    this.setState(
      {
        currentMonth: dateFns.subMonths(this.state.currentMonth, -1)
      },
      () => {
        this.getChartData();
      }
    );
  };

  getChartData = () => {
    const dataFromServer = this.state.dataFromServer;
    const currentMonth = this.state.currentMonth;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    let eachDaysInMonth = dateFns.eachDay(monthStart, monthEnd);
    let chartData = [];
    let periodArr = '';
    let ovulationArr = '';
    let temperatureArr = '';

    if (dataFromServer) {
      periodArr = dataFromServer.filter(data => data.period);
      ovulationArr = dataFromServer.filter(data => data.ovulation);
      temperatureArr = dataFromServer.filter(data => data.temperature !== '');
    }

    eachDaysInMonth.forEach(data =>
      chartData.push({ label: data.toString().slice(4, 10) })
    );

    chartData.forEach((data, index) => {
      for (let i = 0; i < periodArr.length; i++) {
        if (data.label === periodArr[i].date.slice(4, 10)) {
          chartData[index]['period'] = 38;
          chartData[index]['color'] = 'rgba(255, 99, 132, 0.2)';
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

    chartData.forEach((data, index) => {
      for (let i = 0; i < ovulationArr.length; i++) {
        if (data.label === ovulationArr[i].date.slice(4, 10)) {
          chartData[index]['color'] = 'rgba(255, 206, 86, 0.2)';
          chartData[index]['period'] = 38;
        }
      }
    });

    this.setState({ chartData });
  };
  renderLegend = () => (
    <div className="legend">
      <p className="legend-item">
        <span style={{ color: 'rgb(255, 99, 132)' }} className="legend-color">
          ■
        </span>
        temperature
      </p>
      <p className="legend-item">
        <span
          style={{ color: 'rgba(255, 99, 132, 0.2)' }}
          className="legend-color"
        >
          ■
        </span>
        period
      </p>
      <p className="legend-item">
        <span
          style={{ color: 'rgba(255, 206, 86, 0.2)' }}
          className="legend-color"
        >
          ■
        </span>
        ovulation
      </p>
    </div>
  );
  renderArrows = () => (
    <div className="arrow-box">
      <p onClick={this.handlePrevMonth} className="arrow">
        <i class="material-icons arrow">keyboard_arrow_left</i>
      </p>
      <h3>{dateFns.format(this.state.currentMonth, 'MMM YYYY')}</h3>
      <p onClick={this.handleNextMonth} className="arrow">
        <i class="material-icons arrow"> keyboard_arrow_right</i>
      </p>
    </div>
  );
  render() {
    const options = {
      legend: {
        display: false
      },
      animation: {
        duration: 0
      },
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
              max: 37.5
            }
          }
        ]
      },
      tooltips: {
        enabled: false
      }
    };
    const data = {
      labels: this.state.chartData.map(data => data.label),
      datasets: [
        {
          label: 'Temperature',
          type: 'line',
          data: this.state.chartData.map(data => data.temperature),
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          spanGaps: true
        },
        {
          label: 'Period',
          type: 'bar',
          data: this.state.chartData.map(data => data.period),
          backgroundColor: this.state.chartData.map(data => data.color),
          hoverBackgroundColor: this.state.chartData.map(data => data.color)
        }
      ]
    };

    return (
      <div>
        {this.state.chartData.length === 0 ? (
          <img src={loading} />
        ) : (
          <div className="chart-container">
            {this.renderArrows()}
            {this.renderLegend()}
            <div className="chart-box">
              <Bar data={data} width={400} height={400} options={options} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Chart;
