import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, InputGroup, FormControl } from 'react-bootstrap';



class CustomerModal extends Component {

    state = {
        name: '',
        address: '',
        phone: '',
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
                name: this.props.customer.name,
                address: this.props.customer.address,
                phone: this.props.customer.phone,
                id: this.props.customer.id
                
            })
        }
        
    }

    render() {
        let values = this.state;
        
        let submitFunction = this.props.editMode ? this.props.edit.bind(this, values) : this.props.createItem.bind(this, values);
        let nameValue = this.props.editMode ? this.props.customer.name : '';
        let addressValue = this.props.editMode ? this.props.customer.address : '';
        let phoneValue = this.props.editMode ? this.props.customer.phone : '';
        
        return (
            <form onSubmit={submitFunction}>
                <FormGroup>
                    <InputGroup>
                        <ControlLabel>Your Name</ControlLabel>
                        <FormControl
                            id="CustomerName"
                            name="name"
                            type="text"
                            placeholder="Enter Full Name" 
                            defaultValue = {nameValue}
                            onChange={this.setValues.bind(this, 'name')} />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <ControlLabel>Your Address</ControlLabel>
                        <FormControl
                            id="CustomerAddress"
                            type="text"
                            name="address"
                            placeholder="Enter Address"
                            defaultValue = {addressValue}
                            onChange={this.setValues.bind(this, 'address')} />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <ControlLabel>Your Phone</ControlLabel>
                        <FormControl
                            id="CustomerPhone"
                            type="tel"
                            name="phone"
                            placeholder="Enter Your Phone"
                            defaultValue = {phoneValue}
                            onChange={this.setValues.bind(this, 'phone')} />
                    </InputGroup>
                </FormGroup>
                <Button type="submit">{this.props.button}</Button>
                <Button onClick={this.props.closeModal} className="pull-right">Close</Button>
            </form>
        )
    }
}

export default CustomerModal;
