import React from 'react';
import classes from './MainTitle.css';

const MainTitle = (props) => {
  return (
    <h1 className={classes.MainTitle}>{props.children}</h1>
  )
}

export default MainTitle
