import React, { Component } from 'react';
import CustomerModal from '../Customers/CustomerModal/CustomerModal';
import ProductModal from '../Products/ProductsModal/ProductsModal';

class EditModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.customers ? this.props.customers : 
                    this.props.products ? this.props.products : this.props.invoiceList,
            id: this.props.id,
            type: this.props.type
        }
    }

    componentWillMount () {
        this.setState((prevState) => {
           return { item: prevState.item.filter(element => element.id == this.state.id)[0] }
        })
    }

    render () {
        let content = null;
        switch (this.state.type) {
            case ("customers"):
                content = <CustomerModal editMode={true} edit={this.props.edit} closeModal={this.props.closeModal} button='Edit' customer={this.state.item}/>
                break;
            case ("invoices"):
               
                break;
            case ("products"):
                content = <ProductModal editMode={true} edit={this.props.edit} closeModal={this.props.closeModal} button='Edit' product={this.state.item}/>
            break;
            default:
                content = null
                break;
        }
        return (
            <div>
                {content}
            </div>
        )
    }
    
}

export default EditModal
