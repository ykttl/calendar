import React from 'react';
import Inputs from './Inputs';
import '../css/Calendar.css';
import '../css/modal.css';

class Modal extends React.Component {
  render() {
    const showHideClassName = this.props.showModal
      ? 'modal display-block'
      : 'modal display-none';

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <button onClick={this.props.handleClose} className="close-btn">
            <i class="material-icons cancel">cancel</i>
          </button>
          <h3 className="date"> {this.props.dateID}</h3>
          <Inputs dateID={this.props.dateID} dateIDms={this.props.dateIDms} />
        </section>
      </div>
    );
  }
}

export default Modal;
