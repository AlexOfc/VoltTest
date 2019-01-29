import React, { Component } from 'react';
import axios from '../../AxiosInstance';
import TableContent from '../../components/PageContent/TableContent/TableContent';
import MainTitle from '../../components/PageContent/MainTitle/MainTitle';
import { Clearfix } from 'react-bootstrap';
import CreateButton from '../../components/UI/CreateButton/CreateButton';
import classes from './Products.css';
import ModalBlock from '../../components/UI/ModalBlock/ModalBlock';
import ProductModal from './ProductsModal/ProductsModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import EditModal from '../EditModal/EditModal';

class Products extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            error: false,
            errorMessage: 'There are no products!',
            show: false,
            lastID: null,
            deleteMode: false,
            editMode: false,
            chooseID: null
        }
    }

    componentDidMount () {
        axios.get('/api/products').then(res => {
            this.setState({
                products: res.data,
                lastID: res.data[res.data.length - 1].id
            }, () => {
                console.log(this.state.products)
                if (this.state.products.length == 0) {
                    this.setState({ error: true })
                }
            })
        }).catch(error => {
            this.setState({error: true})
        })
        document.title = "Products List";
    }

    toggleModal = () => {
        this.setState(( prevState ) => {
            return {show: !prevState.show}
        } )
    }

    createProduct = (props, e) => {
        e.preventDefault();
        if (props.name !== '' && props.price !== '') {
            console.log(this.state)
            let id = null;
            if (this.state.products.length !== 0) {
                id = this.state.products[this.state.products.length - 1].id + 1
            } else {
                id = 1
            }


            let data = {
                id: id,
                name: props.name,
                price: props.price,
            }
            axios.post('/api/products', data).then(res => {
                console.log(res, "Passed")
                this.setState((prevState) => {
                    return {
                        products: prevState.products.concat([res.data]),
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

    editProduct = (props, e) => {
        e.preventDefault();
        if (props.name !== '' && props.price !== '') {
            
            let data = {
                id: props.id,
                name: props.name,
                address: props.price
            }
            axios.put('/api/products/' + props.id, data).then(res => {
                console.log(res, "Passed")
                this.setState((prevState) => {
                    return {
                        products: prevState.products.map(item => {
                            if (item.id == props.id) {
                                console.log(1)
                                return {
                                    createdAt: item.createdAt,
                                    id: props.id,
                                    name: props.name,
                                    price: props.price,
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

   

    deleteProduct = (id) => {
        console.log(id)
        axios.delete('/api/products/' + id).then(res => {
            console.log(res)
            this.setState((prevState) => {
                return {
                    products: prevState.products.filter(item => {
                        return item.id !== id
                    }),
                }
            }, () => {
                if (this.state.products.length == 0) {
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
        } else if (this.state.products) {
            page = <TableContent
                type="products"
                editModal={this.editModal}
                deleteModal={this.deleteModal}
                data={this.state.products} />;
        }
        let modal = <ProductModal
            closeModal={this.closeModalHandler}
            createItem={this.createProduct} button="Create" />;
        let title = "Create Product";
        if (this.state.deleteMode) {
            modal = <DeleteModal
                id={this.state.chooseID}
                closeModal={this.closeModalHandler}
                delete={this.deleteProduct} />;
            title = "Delete Product";
        } else if (this.state.editMode) {
            console.log(1)
            modal = <EditModal
                id={this.state.chooseID}
                products={this.state.products}
                type='products'
                closeModal={this.closeModalHandler}
                edit={this.editProduct} />;
            title = "Edit Product";
        }
        return (
            <div>
                <Clearfix className={classes.HeaderContainer}>
                    <MainTitle>Products List</MainTitle>
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

export default Products
