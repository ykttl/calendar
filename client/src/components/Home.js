import React from 'react';
import dateFns from 'date-fns';
// import PropTypes from 'prop-types';

class Home extends React.Component {
  state = { arr: '' };
  arr = [];
  sinceHowManyDay = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return '';
    let today = new Date();
    today = today.toString().slice(0, 15);
    today = dateFns.format(today, 'x');

    const index = dataFromServer.findIndex(obj => obj.dateIDms >= today);

    // const arr = [];

    for (let i = index; i > 0; i--) {
      if (dataFromServer[i].period.start) {
        console.log(dataFromServer[i].dateIDms);
        let dayday = today - dataFromServer[i].dateIDms;

        let a = dayday / 86400000;

        return a;
      }
    }
    // return arr.map(item => <p>{item}</p>).reverse();
  };
  showLength = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return '';

    const pAll = dataFromServer.filter(obj => obj.period);
    const arr = [];

    pAll.map((item, index) => {
      if (!pAll[index + 1]) {
        arr.push('?');
        return;
      }
      if (item.period.start && pAll[index + 1].period.start) {
        arr.push('?');
      }

      if (item.period.start && pAll[index + 1].period.end) {
        arr.push((pAll[index + 1].dateIDms - item.dateIDms) / 86400000);
      } else {
        // arr.push('');
      }
    });
    console.log('arr', arr);

    return arr.map(item => <p>for -{item}-days</p>).reverse();
  };
  showDays = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return '';

    const arr = [];

    const a = dataFromServer.filter(obj => obj.period.start);
    console.log(a);

    //もしendが記入されてなかった場合は「？」にしたい

    const b = a.map((item, index) => {
      if (a[index + 1]) {
        return Math.round((a[index + 1].dateIDms - item.dateIDms) / 86400000);
      } else {
        return '?';
      }
    });
    console.log(b);

    return b.map(item => <p>||||| cycle:{item} |||||</p>);
    //ここだけなぜかreverseがいらない。。。
  };
  showList = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return '';

    const arr = [];

    const a = dataFromServer.filter(obj => obj.period.start);
    console.log(a);

    //もしendが記入されてなかった場合は「？」にしたい

    const b = a.map((item, index) => {
      if (a[index + 1]) {
        return (a[index + 1].dateIDms - item.dateIDms) / 86400000;
      } else {
        return '?';
      }
    });
    console.log(b);

    return a
      .map(item => (
        <p>
          {item.month}-{item.day}
        </p>
      ))
      .reverse();
  };
  getData() {
    console.log('getdate ga yobareata');
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return '';

    let today = new Date();
    today = today.toString().slice(0, 15);
    today = dateFns.format(today, 'x');

    let kijun;
    let arr = [];
    let sArr = [];
    dataFromServer.findIndex((obj, index) => {
      kijun = dataFromServer[index + 1];
      if (kijun) {
        if (
          kijun.month === obj.month &&
          parseInt(kijun.day) === parseInt(obj.day) + 1
        ) {
          sArr.push(obj);
        } else {
          sArr.push(obj);
          arr.push(sArr);
          sArr = [];
        }
      }
    });

    // this.setState({ arr });
    return arr;
  }
  funA = () => {
    const dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) return '';
    let today = new Date();
    today = today.toString().slice(0, 15);
    today = dateFns.format(today, 'x');

    const index = dataFromServer.findIndex(obj => obj.dateIDms >= today);
    console.log(dataFromServer, index);

    if (index !== -1) {
      for (let i = index; i > 0; i--) {
        if (dataFromServer[i].periodNew) {
          console.log('aaa', dataFromServer[i].dateIDms);
          let dayday = today - dataFromServer[i].dateIDms;

          let a = dayday / 86400000;

          return a;
        }
      }
    }
  };
  funDate = () => {
    const data = this.getData();

    return data
      .map(arr => (
        <p>
          {arr[0].date}-----{arr[arr.length - 1].date}
        </p>
      ))
      .reverse();
  };
  funLength = () => {
    const data = this.getData();
    console.log(data);
    return data.map(item => <p>{item.length}days</p>);
  };
  funCycle = () => {
    const data = this.getData();

    const x = data.map((item, index) => {
      if (data[index + 1]) {
        return Math.round(
          (data[index + 1][0].dateIDms - item[0].dateIDms) / 86400000
        );
      } else {
        return '?';
      }
    });
    console.log(x);

    return x.map(item => <p>cycle:{item}days</p>);
  };
  render() {
    return (
      <div>
        <p>{this.funA()}...DAYS SINCE LAST PERIOD STARTED</p>
        <div style={{ display: 'flex' }}>
          <div> {this.funDate()}</div>
          <div style={{ border: 'solid 2px' }}> {this.funLength()}</div>
          <div> {this.funCycle()}</div>
        </div>
      </div>
    );
  }
}

export default Home;
// <div> {this.funDate()}</div>
//           <div> {this.funCycle()}</div>
//           <div> {this.funLength()}</div>
