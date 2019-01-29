import React from 'react';
import { Button } from 'react-bootstrap';
import classes from './CreateButton.css'


const createButton = (props) => (
    <Button className={classes.CreateButton} onClick={props.clicked}>Create</Button>
  )


export default createButton

