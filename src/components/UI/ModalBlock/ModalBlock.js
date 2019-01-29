import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import classes from './ModalBlock.css'

class BlockModal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header>
          <Modal.Title className={classes.ModalTitle}>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
      </Modal>
    )
  }
}

export default BlockModal