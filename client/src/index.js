import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase/index';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// import React from 'react';

// import  { FirebaseContext } from '../Firebase';

// const SomeComponent = () => (
//   <FirebaseContext.Consumer>
//     {firebase => {
//       return <div>I've access to Firebase and render something.</div>;
//     }}
//   </FirebaseContext.Consumer>
// );

// export default SomeComponent;
