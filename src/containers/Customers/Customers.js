import React, { Component } from 'react';
import axios from '../../AxiosInstance';
import TableContent from '../../components/PageContent/TableContent/TableContent';
import MainTitle from '../../components/PageContent/MainTitle/MainTitle';
import { Clearfix } from 'react-bootstrap';
import CreateButton from '../../components/UI/CreateButton/CreateButton';
import classes from './Customers.css';
import ModalBlock from '../../components/UI/ModalBlock/ModalBlock';
import CustomerModal from './CustomerModal/CustomerModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import EditModal from '../EditModal/EditModal';

class Customers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            error: false,
            errorMessage: 'There are no customers!',
            show: false,
            lastID: null,
            deleteMode: false,
            editMode: false,
            chooseID: null
        }
    }
    
    componentDidMount() {
        axios.get('/api/customers').then(res => {
            this.setState({
                customers: res.data,
                lastID: res.data[res.data.length - 1].id,
                error: false
            }, () => {
                console.log(this.state.customers.length)
                if (this.state.customers.length == 0) {
                    this.setState({ error: true })
                }
            })


        }).catch(error => {
            console.log(error)
            this.setState({ error: true })
        })
        document.title = "Customers List";
    }


    toggleModal = () => {
        this.setState((prevState) => {
            return {
                show: !prevState.show,
            }
        })
    }

    createCustomer = (props, e) => {
        e.preventDefault();
        if (props.name !== '' && props.address !== '' && props.phone !== '') {
            console.log(this.state)
            let id = null;
            if (this.state.customers.length !== 0) {
                id = this.state.customers[this.state.customers.length - 1].id + 1
            } else {
                id = 1
            }


            let data = {
                id: id,
                name: props.name,
                address: props.address,
                phone: props.phone,
            }
            axios.post('/api/customers', data).then(res => {
                console.log(res, "Passed")
                this.setState((prevState) => {
                    return {
                        customers: prevState.customers.concat([res.data]),
                        lastID: prevState.lastID + 1,
                        error: false
                    }
                }, () => {
                    this.toggleModal();
                })
            }).catch(error => {
                console.log(error)
            })
        }

    }

    editCustomer = (props, e) => {
        e.preventDefault();
        if (props.name !== '' && props.address !== '' && props.phone !== '') {
            
            let data = {
                id: props.id,
                name: props.name,
                address: props.address,
                phone: props.phone,
            }
            axios.put('/api/customers/' + props.id, data).then(res => {
                console.log(res, "Passed")
                this.setState((prevState) => {
                    return {
                        customers: prevState.customers.map(item => {
                            if (item.id == props.id) {
                                console.log(1)
                                return {
                                    address: props.address,
                                    createdAt: item.createdAt,
                                    id: props.id,
                                    name: props.name,
                                    phone: props.phone,
                                    updatedAt: item.updatedAt
                                }
                            } else {
                                console.log(1)
                                return item
                            }
                        }),
                        error: false
                    }
                }, () => {
                    this.toggleModal();
                })
            }).catch(error => {
                console.log(error)
            })
        }
    }

    editModal = (id) => {
        this.setState({
            editMode: true,
            chooseID: id
        })
        this.toggleModal();
    }

    deleteModal = (id) => {
        console.log(id)
        this.setState({
            deleteMode: true,
            chooseID: id
        })
        this.toggleModal();
    }

   

    deleteCustomer = (id) => {
        console.log(id)
        axios.delete('/api/customers/' + id).then(res => {
            console.log(res)
            this.setState((prevState) => {
                return {
                    customers: prevState.customers.filter(item => {
                        return item.id !== id
                    }),
                }
            }, () => {
                if (this.state.customers.length == 0) {
                    this.setState({ error: true })
                }
            })
        }).catch(error => {
            this.setState({ error: true })
        });
        this.closeModalHandler();
    }

    closeModalHandler = () => {
        this.setState({
            show: false,
            chooseID: null
        })
        setTimeout(() => {
            this.setState({
                deleteMode: false,
                editMode: false
            })
        }, 500)

    }

    render() {
        let page = null;
        if (this.state.error) {
            page = <p>{this.state.errorMessage}</p>
        } else if (this.state.customers) {
            page = <TableContent
                type="customers"
                editModal={this.editModal}
                deleteModal={this.deleteModal}
                data={this.state.customers} />;
        }
        let modal = <CustomerModal
            closeModal={this.closeModalHandler}
            createItem={this.createCustomer} button="Create" />;
        let title = "Create Customer";
        if (this.state.deleteMode) {
            modal = <DeleteModal
                id={this.state.chooseID}
                closeModal={this.closeModalHandler}
                delete={this.deleteCustomer} />;
            title = "Delete Customer";
        } else if (this.state.editMode) {
            modal = <EditModal
                id={this.state.chooseID}
                customers={this.state.customers}
                type='customers'
                closeModal={this.closeModalHandler}
                edit={this.editCustomer} />;
            title = "Edit Customer";
        }
        return (
            <div>
                <Clearfix className={classes.HeaderContainer}>
                    <MainTitle>Customers List</MainTitle>
                    <CreateButton clicked={this.toggleModal} />
                </Clearfix>
                <Clearfix>
                    {page}
                </Clearfix>
                <ModalBlock show={this.state.show} closeModal={this.closeModalHandler} title={title}>
                    {modal}
                </ModalBlock>
            </div>
        )

    }
}

export default Customers
