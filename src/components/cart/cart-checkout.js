import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from '@material-ui/core';
import CartPayment from './cart-payment';

function CartCheckout(props){

    const [modalShow1, setModalShow1] = useState(false);

    const showModal1 = () => {
        setModalShow1(true);
    };

    const hideModal1 = () => {
        setModalShow1(false);
    };
   
        return(
            <Modal
                {...props}
                size="lg"
                aria-labelled="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{textTransform:'uppercase'}}>
                        Summary
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <form style={{width:'100%'}}>
                       <div>
                           <h5 style={{textTransform:'uppercase'}}>billing details</h5>
                       </div>
                       <div>
                           <input class="form-control" type='text' placeholder='First Name'style={{width:'40%'}}/><input class="form-control" type='text' placeholder='Last Name'style={{width:'40%'}}/>
                       </div><br/>
                       <div>
                           <input class="form-control" type='text' placeholder='Street Address'style={{width:'100%'}}/>
                       </div><br/>
                       <div>
                           <input class="form-control" type='text' placeholder='City'style={{width:'100%'}}/>
                       </div><br/>
                       <div>
                           <h5 style={{textTransform:'uppercase'}}>delivery area</h5>
                       </div>
                       <div>
                            <select class="form-control"name='Area'style={{width:'100%'}}>
                                <option>Central</option>
                                <option>Western</option>
                                <option>Southern</option>
                                <option>Uva</option>
                                <option>Wayamba</option>
                                <option>North-Central</option>
                            </select>
                       </div><br/>
                       <div>
                           <input class="form-control" type='text'style={{width:'100%'}} placeholder='Postal Code'/>
                       </div><br/>
                       <div>
                           <input class="form-control" type='text' style={{width:'100%'}}placeholder='Phone Number'/>
                       </div><br/>
                       <div>
                           <input class="form-control" style={{width:'100%'}} placeholder='email'/>
                       </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={showModal1} variant="contained" color="primary"style={{width:'100%'}}>Place order</Button>
                    <CartPayment
                        show={modalShow1}
                        onHide={hideModal1}
                    />
                </Modal.Footer>
            </Modal>
        );
    }

export default CartCheckout;


