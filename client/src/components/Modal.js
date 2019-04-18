import React from 'react';
// import PropTypes from 'prop-types';
import '../modal.css';
import Inputs from './Inputs';

const Modal = ({ handleClose, show, children, dateID }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  console.log(dateID);
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}

        <button onClick={handleClose}>close</button>
        <p> {dateID}</p>
        <Inputs />
      </section>
    </div>
  );
};

export default Modal;
