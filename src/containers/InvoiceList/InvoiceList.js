import React, { Component } from 'react';
import axios from '../../AxiosInstance';
import TableContent from '../../components/PageContent/TableContent/TableContent';
import MainTitle from '../../components/PageContent/MainTitle/MainTitle';
import { Clearfix } from 'react-bootstrap';
import CreateButton from '../../components/UI/CreateButton/CreateButton';
import classes from './InvoiceList.css';
import ModalBlock from '../../components/UI/ModalBlock/ModalBlock';

class InvoiceList extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            invoices: [],
            error: false,
            errorMessage: 'There are no invoices!',
            show: false,
            lastID: null,
            deleteMode: false,
            editMode: false,
            chooseID: null
        }
    }

    componentDidMount () {
        axios.get('/api/invoices').then(res => {
            this.setState({
                invoices: res.data,
                lastID: res.data[res.data.length - 1].id
            }, () => {
                console.log(this.state.invoices)
                if (this.state.invoices.length == 0) {
                    this.setState({ error: true })
                }
            })
        }).catch(error => {
            this.setState({error: true})
        })
        document.title = "Invoices List";
    }

    toggleModal = () => {
        this.setState(( prevState ) => {
            return {show: !prevState.show}
        } )
    }



    render() {
        let page = null;
        if (this.state.error) {
            page = <p>{this.state.errorMessage}</p>
        } else if (this.state.invoices) {
            page = <TableContent type="invoices" data={this.state.invoices}/>;
        }
        return (
            <div>
                <Clearfix className={classes.HeaderContainer}>
                    <MainTitle>Invoices List</MainTitle>
                    <CreateButton clicked={this.toggleModal}/>
                </Clearfix>
                <Clearfix>
                    {page}
                </Clearfix>
                <ModalBlock show={this.state.show} closeModal={this.toggleModal} title="Create Invoice">

                </ModalBlock>
            </div>
        )
        
    }
}

export default InvoiceList
