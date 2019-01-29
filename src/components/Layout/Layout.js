import React, { Component } from 'react';
import Header from '../Navigation/Header/Header';
import Main from '../../containers/Main/Main'
import classes from './Layout.css';

class Layout extends Component{
    
    render(){
        return (
            <div>
                <Header />
                <Main />
            </div>
        )
    }
};

export default Layout;