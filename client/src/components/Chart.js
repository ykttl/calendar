import { Line, Bar } from 'react-chartjs-2';
import dateFns from 'date-fns';
import React from 'react';

class Chart extends React.Component {
  // state = {
  //   range: 1
  // }  test;
  // label;;
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
    this.test = dataFromServer.map(item => {
      if (item.periodNew) {
        return 38;
      } else {
        return null;
      }
    });

    return this.test;
  };
  getLabel = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    console.log('server', dataFromServer);
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);

    const day = dateFns.format(monthStart, 'd');
    console.log(day);

    var result = dateFns.eachDay(monthStart, monthEnd);
    const label = result.map(item => item.toString().slice(4, 10));
    return label;
    // const startDate = dateFns.startOfWeek(monthStart);
    // const endDate = dateFns.endOfWeek(monthEnd);
    // const dateFormat = 'D';
    // const rows = [];
    // let days = [];
    // let day = startDate;
    // let formattedDate = '';

    // while (day <= endDate) {
    //   console.log(day, endDate);
    //   for (let i = 0; i < 7; i++) {
    //     formattedDate = dateFns.format(day, dateFormat);

    //     const cloneDay = day;
    //     const dateID = day.toString().slice(0, 15);
    //     const dateIDms = dateFns.format(day, 'x');
    //     const dateIDnum = dateFns.format(day, 'YYYYMD');

    //     days.push(day);

    //     day = dateFns.addDays(day, 1);
    //   }
    //   rows.push(days);
    //   days = [];
    // }

    // console.log('days', rows);

    // end = false;
    // return <div className="body">{rows}</div>;

    // const dataFromServer = JSON.parse(localStorage.getItem('data'));
    // if (!dataFromServer) {
    //   return [];
    // }

    // this.label = dataFromServer.map(
    //   item => item.date.slice(4, 7) + parseFloat(item.date.slice(8, 10))
    // );

    // return this.label;
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
      labels: this.getLabel(),
      datasets: [
        {
          label: 'Temperature',
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          data: this.getData(),
          spanGaps: true,
          type: 'line'
        },
        {
          label: 'period',
          data: this.getPeriodData(),

          fillColor: 'rgba(220,220,220,0.5)',
          strokeColor: 'rgba(220,220,220,0.8)',
          highlightFill: 'rgba(220,220,220,0.75)',
          highlightStroke: 'rgba(220,220,220,1)',
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
