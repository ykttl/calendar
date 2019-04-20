import React from 'react';
import Inputs from './Inputs';
import '../modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showHideClassName = this.props.show
      ? 'modal display-block'
      : 'modal display-none';

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {this.props.children}

          <button onClick={this.props.handleClose}>close</button>
          <p> {this.props.dateID}</p>
          <Inputs dateID={this.props.dateID} />
        </section>
      </div>
    );
  }
}

export default Modal;