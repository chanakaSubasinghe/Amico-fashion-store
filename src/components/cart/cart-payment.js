import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from '@material-ui/core';

export default class CartPayment extends Component{

    render(){
        return(
            <Modal
                {...this.props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title style={{textTransform:'uppercase'}}>
                    Payment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div>
                        <input placeholder='SubTotal' style={{width:'100%'}} class="form-control"/>
                    </div><br/>
                    <div>
                        <h5 style={{textTransform:'uppercase'}}>payment method</h5>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
        )
    }
}