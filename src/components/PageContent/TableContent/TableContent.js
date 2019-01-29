import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import classes from './tableContent.css'
 
const tableContent = (props) => {
    let header = null;
        let data = null;
        switch (props.type) {
            case ("customers"):
                header = 
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Dddress</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    console.log(props)
                data = Object.keys(props.data).map(igKey => {
                        return [...Array(props.data[igKey])].map((content, i) => {
                            return (
                                <tr key={igKey} id={"customer_" + content.id}>
                                    <td>{Number(igKey) + 1}</td>
                                    <td>{content.name}</td>
                                    <td>{content.address}</td>
                                    <td>{content.phone}</td>
                                    <td>
                                        <a href="javascript:void(0)" onClick={() => props.editModal(content.id)} className={classes.Edit}>Edit</a>
                                        <a href="javascript:void(0)" onClick={() => props.deleteModal(content.id)} data-id={content.id}>Delete</a>
                                    </td>
                                </tr>
                            );                           
                        });      
                }).reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
                break;
            case ("invoices"):
                header = 
                    <thead>
                         <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Discount</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                 data = Object.keys(props.data).map(igKey => {
                    return [...Array(props.data[igKey])].map((content, i) => {
                        return (
                            <tr key={igKey} id={"invoice_" + content.id} data-id={content.id}>
                                <td>{Number(igKey) + 1}</td>
                                <td>{content.customer_id}</td>
                                <td>{content.discount}</td>
                                <td>{content.total}</td>
                                <td>
                                        <a href="javascript:void(0)" onClick={() => props.editModal(content.id)} className={classes.Edit}>Edit</a>
                                        <a href="javascript:void(0)" onClick={() => props.deleteModal(content.id)} data-id={content.id}>Delete</a>
                                    </td>
                            </tr>
                        );                           
                    });      
            }).reduce((arr, el) => {
                return arr.concat(el)
            }, []);
                break;
            case ("products"):
                header = 
                    <thead>
                         <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                data = Object.keys(props.data).map(igKey => {
                    return [...Array(props.data[igKey])].map((content, i) => {
                        return (
                            <tr key={igKey} id={"invoice_" + content.id} data-id={content.id}>
                                <td>{Number(igKey) + 1}</td>
                                <td>{content.name}</td>
                                <td>{content.price + "$"}</td>
                                <td>
                                        <a href="javascript:void(0)" onClick={() => props.editModal(content.id)} className={classes.Edit}>Edit</a>
                                        <a href="javascript:void(0)" onClick={() => props.deleteModal(content.id)} data-id={content.id}>Delete</a>
                                    </td>
                            </tr>
                        );                           
                    });      
            }).reduce((arr, el) => {
                return arr.concat(el)
            }, []);
                break;
            default:
                break;
        }
        return (
            <Table>
                {header}
                <tbody>
                    {data}
                </tbody>
            </Table>
        )
  
}
export default tableContent
