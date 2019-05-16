import React from 'react';
import dateFns from 'date-fns';
import firebase from '../firebase';
import '../css/Inputs.css';
// import { withFirebase } from './Firebase';

// let message = {
//   periodEnd: null
// };
const initialState = {
  date: '',
  dateIDms: '',
  month: '',
  day: '',
  year: '',
  ovulation: false,
  temperature: '',
  moods: [],
  symptoms: '',
  medicine: false,
  intercourse: false,
  note: '',

  period: false
};

var todayVAR;

class Inputs extends React.Component {
  data = [];
  state = {
    ...initialState
  };

  componentDidUpdate(prevPro, prevState) {
    console.log(this.props);
    if (prevPro.dateID === this.props.dateID && prevState !== this.state)
      return;
    this.setState({
      ...initialState
    });
    let dataFromServer = JSON.parse(localStorage.getItem('data'));
    if (!dataFromServer) {
      return [];
    }

    this.data = [...dataFromServer];

    const theData = dataFromServer.find(
      item => item.date === this.props.dateID
    );
    if (theData) {
      this.setState({
        date: this.props.dataID,
        dateIDms: this.props.dateIDms,
        month: this.props.dateID.slice(4, 7),
        day: this.props.dateID.slice(8, 10),
        year: this.props.dateID.slice(11, 15),
        temperature: theData.temperature,
        moods: theData.moods,
        symptoms: theData.symptoms,
        medicine: theData.medicine,
        intercourse: theData.intercourse,
        note: theData.note,
        period: theData.period,
        ovulation: theData.ovulation
      });
    }
  }

  saveToServer = () => {
    this.setState(
      {
        date: this.props.dateID,
        dateIDms: this.props.dateIDms,
        month: this.props.dateID.slice(4, 7),
        day: this.props.dateID.slice(8, 10),
        year: this.props.dateID.slice(11, 15)
      },
      () => {
        const theData = this.data.findIndex(
          item => item.date === this.props.dateID
        );

        if (theData !== -1) {
          this.data.splice(theData, 1);
        }
        this.data.push(this.state);

        function compare(a, b) {
          a = parseInt(a.dateIDms);
          b = parseInt(b.dateIDms);
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        }

        this.data.sort(compare);
        // this.data.sort();
        console.log(this.data);

        localStorage.setItem('data', JSON.stringify(this.data));
        /////////////////////////
        firebase.auth().onAuthStateChanged(authUser => {
          if (authUser) {
            firebase
              .database()
              .ref('data/' + authUser.uid)
              .set(this.data);
          } else {
            console.log('noooo user2');
          }
        });
      }
    );
  };
  componentDidMount() {
    // console.log('input');
    // firebase.auth().onAuthStateChanged(authUser => {
    //   if (authUser) {
    //     firebase
    //       .database()
    //       .ref('data/' + authUser.uid)
    //       .on('value', snapshot => {
    //         console.log(snapshot.val());
    //       });
    //   } else {
    //     console.log('noooo user2');
    //   }
    // });

    // const test = await firebase
    //   .database()
    //   .ref('data/' + 'I7X6z1dcfhaW30Z0wOtv9WNXMSE3')
    //   .once('value')
    //   .then(snapshot => snapshot.val());

    // console.log(test, 'test');

    // const dataFromServer = JSON.parse(localStorage.getItem('data'));
    // if (!dataFromServer) return '';
    let today = new Date();
    today = today.toString().slice(0, 15);
    today = dateFns.format(today, 'x');

    todayVAR = today;
  }

  render() {
    return (
      <div className="inputs-container">
        <div>
          {this.props.dateIDms > todayVAR ? (
            <div className="item-container">
              <div className="category-box">
                <img src="https://img.icons8.com/color/25/000000/drop-of-blood.png" />
                <strike>period</strike>
              </div>

              <input
                disabled
                type="checkbox"
                style={{ cursor: 'not-allowed' }}
              />
            </div>
          ) : (
            <div className="item-container">
              <div className="category-box">
                <img src="https://img.icons8.com/color/25/000000/drop-of-blood.png" />
                peripd
              </div>
              <div className="input-box">
                <input
                  type="checkbox"
                  checked={this.state.period === true ? 'checked' : false}
                  onChange={() => {
                    this.setState({ period: !this.state.period });
                  }}
                />
              </div>
            </div>
          )}
          <div className="item-container">
            <div className="category-box">
              <img src="https://img.icons8.com/office/25/000000/sunny-side-up-eggs.png" />
              ovulation
            </div>
            <div className="input-box">
              <input
                type="checkbox"
                checked={this.state.ovulation === true ? 'checked' : false}
                onChange={() => {
                  this.setState({ ovulation: !this.state.ovulation });
                }}
              />
            </div>
          </div>
          <div className="item-container">
            <div className="category-box">
              <img src="https://img.icons8.com/office/25/000000/thermometer.png" />
              Temperature:
            </div>
            <div className="input-box">
              <input
                type="text"
                onChange={e => {
                  this.setState({ temperature: e.target.value });
                }}
                value={this.state.temperature}
              />
            </div>
          </div>
          <div className="item-container">
            <div className="category-box">
              <img src="https://img.icons8.com/color/25/000000/question.png" />
              any symptoms?
            </div>
            <div className="input-box">
              <select
                onChange={e => {
                  this.setState({ symptoms: e.target.value });
                }}
                value={this.state.symptoms}
              >
                <option value="">-</option>
                <option value="headache">headache</option>
                <option value="crump">crump</option>
                <option value="heavy">heavy</option>
              </select>
            </div>
          </div>
          <div className="item-container">
            <div className="category-box">
              <img src="https://img.icons8.com/ultraviolet/25/000000/pill.png" />
              Took any medicine?
            </div>
            <div className="input-box">
              <input
                type="checkbox"
                checked={this.state.medicine === true ? 'checked' : false}
                onChange={() => {
                  this.setState({ medicine: !this.state.medicine });
                }}
              />
            </div>
          </div>
          <div className="item-container">
            <div className="category-box">
              <img src="https://img.icons8.com/office/25/000000/hearts.png" />
              intercourse?
            </div>
            <div className="input-box">
              <input
                type="checkbox"
                checked={this.state.intercourse === true ? 'checked' : false}
                onChange={() => {
                  this.setState({ intercourse: !this.state.intercourse });
                }}
              />
            </div>
          </div>
          <div className="item-container">
            <div className="category-box">
              <img src="https://img.icons8.com/office/25/000000/rainbow.png" />
              moods:
            </div>
            <div className="input-box">
              <input
                type="text"
                onChange={e => {
                  this.setState({ moods: e.target.value });
                }}
                value={this.state.moods}
              />
            </div>
          </div>
          <div className="item-container">
            <div className="category-box">
              <img src="https://img.icons8.com/ios/25/000000/note.png" />
              Note:
            </div>
            <div className="input-box">
              <textarea
                onChange={e => {
                  this.setState({ note: e.target.value });
                }}
                value={this.state.note}
              />
            </div>
          </div>
          <button style={{ color: 'red' }} onClick={this.saveToServer}>
            SAVE
          </button>
        </div>
      </div>
    );
  }
}

// const Inputs = withFirebase(InputsBase);

export default Inputs;

// <input
// type="text"
// onChange={e => {
//   this.setState({ symptoms: e.target.value });
// }}
// value={this.state.symptoms}
// />

// <p>symptoms:{this.state.symptoms}</p>
// <p>note:{this.state.note}</p>
// <p>moods:{this.state.moods}</p>
// <p>temperature:{this.state.temperature}</p>
