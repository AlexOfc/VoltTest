import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, InputGroup, FormControl } from 'react-bootstrap';



class ProductsModal extends Component {

    state = {
        name: '',
        price: '',
        id: null
    }

    setValues(input, e) {
        this.setState({[input]: e.target.value}, () => {
            console.log(this.state)
        })
    }
    componentWillMount () {
        if (this.props.editMode) {
            this.setState({
                name: this.props.product.name,
                price: this.props.product.price,
                id: this.props.product.id
                
            })
        }
        
    }

    render() {
        let values = this.state;
        
        let submitFunction = this.props.editMode ? this.props.edit.bind(this, values) : this.props.createItem.bind(this, values);
        let nameValue = this.props.editMode ? this.props.product.name : '';
        let priceValue = this.props.editMode ? this.props.product.price : '';
        console.log(this.props)
        return (
            <form onSubmit={submitFunction}>
                <FormGroup>
                    <InputGroup>
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            id="ProductName"
                            name="name"
                            type="text"
                            placeholder="Enter Product name" 
                            defaultValue = {nameValue}
                            onChange={this.setValues.bind(this, 'name')} />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <ControlLabel>Price</ControlLabel>
                        <FormControl
                            id="ProductPrice"
                            type="text"
                            name="address"
                            placeholder="Enter Price"
                            defaultValue = {priceValue}
                            onChange={this.setValues.bind(this, 'price')} />
                    </InputGroup>
                </FormGroup>
                <Button type="submit">{this.props.button}</Button>
                <Button onClick={this.props.closeModal} className="pull-right">Close</Button>
            </form>
        )
    }
}

export default ProductsModal;
