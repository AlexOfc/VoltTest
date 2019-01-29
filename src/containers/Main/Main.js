import React, { Component } from 'react'
import Routes from "../../components/Navigation/Routes/Routes";
import { Grid } from "react-bootstrap";


export default class Main extends Component {
  render() {
    return (
      <Grid>
        <Routes />
      </Grid>
    )
  }
}

