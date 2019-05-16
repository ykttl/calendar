import React from 'react';
import dateFns from 'date-fns';
import firebase from '../firebase';
import '../css/Inputs.css';

const initialState = {
  date: '',
  dateIDms: '',
  month: '',
  day: '',
  year: '',
  ovulation: false,
  temperature: '',
  moods: '',
  symptoms: '',
  medicine: false,
  intercourse: false,
  note: '',

  period: false
};

var today;

class Inputs extends React.Component {
  data = [];
  state = {
    ...initialState
  };

  async componentDidUpdate(prevPro, prevState) {
    if (prevPro.dateID === this.props.dateID && prevState !== this.state)
      return;

    this.setState({
      ...initialState
    });

    const data = await firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        firebase
          .database()
          .ref('data/' + authUser.uid)
          .on('value', snapshot => {
            let dataFromServer = snapshot.val();
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
          });
      }
    });
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
    let now = new Date();
    now = now.toString().slice(0, 15);
    now = dateFns.format(now, 'x');
    today = now;
  }

  render() {
    return (
      <div className="inputs-container">
        <div>
          {this.props.dateIDms > today ? (
            <div className="item-container">
              <div className="category-box">
                <img src="https://img.icons8.com/color/25/000000/drop-of-blood.png" />

                <span>
                  <strike>Period</strike>{' '}
                  <span className="period-disabled">
                    * present or past only
                  </span>
                </span>
              </div>
              <div className="input-box">
                <input
                  disabled
                  type="checkbox"
                  style={{ cursor: 'not-allowed' }}
                />
              </div>
            </div>
          ) : (
            <div className="item-container">
              <div className="category-box">
                <img src="https://img.icons8.com/color/25/000000/drop-of-blood.png" />
                <span>Period</span>
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
              <span>Ovulation</span>
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
              <span>Temperature</span>
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
              <span>Symptoms</span>
            </div>
            <div className="input-box">
              <select
                onChange={e => {
                  this.setState({ symptoms: e.target.value });
                }}
                value={this.state.symptoms}
              >
                <option value="">-</option>
                <option value="Headache">Headache</option>
                <option value="Anemia">Anemia</option>
                <option value="Cramps">Cramps</option>
                <option value="Spotting">Spotting</option>
                <option value="Sore Breasts">Sore Breasts</option>
              </select>
            </div>
          </div>
          <div className="item-container">
            <div className="category-box">
              <img src="https://img.icons8.com/ultraviolet/25/000000/pill.png" />
              <span>Medicine</span>
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
              <span>Intercourse</span>
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
              <span>Moods</span>
            </div>
            <div className="input-box">
              <select
                onChange={e => {
                  this.setState({ moods: e.target.value });
                }}
                value={this.state.moods}
              >
                <option value="">-</option>
                <option value="Happy">Happy</option>
                <option value="Relaxed">Relaxed</option>
                <option value="Motivated">Motivated</option>
                <option value="Normal">Normal</option>
                <option value="Depressed">Depressed</option>
                <option value="Anxious">Anxious</option>
                <option value="Sad">Sad</option>
                <option value="Irritated">Irritated</option>
                <option value="Slow">Slow</option>
              </select>
            </div>
          </div>
          <div className="item-container">
            <div className="category-box">
              <img src="https://img.icons8.com/ios/25/000000/note.png" />
              <span>Note</span>
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
          <button onClick={this.saveToServer} className="save-btn">
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

// const data = await firebase.auth().onAuthStateChanged(authUser => {
//   if (authUser) {
//     firebase
//       .database()
//       .ref('data/' + authUser.uid)
//       .on('value', snapshot => {
//         if (snapshot.val() === null) {
//           return [];
//         } else {
//           this.data = [...snapshot.val()];
//           const theData = snapshot
//             .val()
//             .map(item => item.date === this.props.dateID);
//           console.log(snapshot.val());
//           console.log(this.props.dateID);
//           console.log(theData);
//           if (theData) {
//             this.setState({
//               date: this.props.dataID,
//               dateIDms: this.props.dateIDms,
//               month: this.props.dateID.slice(4, 7),
//               day: this.props.dateID.slice(8, 10),
//               year: this.props.dateID.slice(11, 15),
//               temperature: theData.temperature,
//               moods: theData.moods,
//               symptoms: theData.symptoms,
//               medicine: theData.medicine,
//               intercourse: theData.intercourse,
//               note: theData.note,
//               period: theData.period,
//               ovulation: theData.ovulation
//             });
//           }
//         }
//       });
//   }
// });

// getDataFromServer = async () => {
//   const data = await firebase.auth().onAuthStateChanged(authUser => {
//     if (authUser) {
//       firebase
//         .database()
//         .ref('data/' + authUser.uid)
//         .on('value', snapshot => {
//           if (snapshot.val() === null) {
//             this.setState({
//               ...initialState
//             });
//           } else {
//             const theData = snapshot
//               .val()
//               .map(item => item.date === this.props.dateID);
//             console.log(snapshot.val());
//             console.log(this.props.dateID);
//             if (theData) {
//               this.setState({
//                 date: this.props.dataID,
//                 dateIDms: this.props.dateIDms,
//                 month: this.props.dateID.slice(4, 7),
//                 day: this.props.dateID.slice(8, 10),
//                 year: this.props.dateID.slice(11, 15),
//                 temperature: theData.temperature,
//                 moods: theData.moods,
//                 symptoms: theData.symptoms,
//                 medicine: theData.medicine,
//                 intercourse: theData.intercourse,
//                 note: theData.note,
//                 period: theData.period,
//                 ovulation: theData.ovulation
//               });
//             }
//           }
//         });
//     }
//   });
// };
