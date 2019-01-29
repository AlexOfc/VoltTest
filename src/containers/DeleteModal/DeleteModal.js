import React from 'react';
import { Button } from 'react-bootstrap';
import classes from './DeleteModal.css'
 
const DeleteModal = (props) => {
  return (
    <div>
      <p className={classes.DeleteText}>Are you sure that you want to delete {props.name}</p>
      <div className={classes.ButtonContainer}>
      <Button bsStyle="danger" className={classes.No} onClick={props.closeModal}>No</Button>
      <Button bsStyle="success" onClick={() => props.delete(props.id)}>Yes</Button>
      </div>
    </div>
  )
}

export default DeleteModal
