import React, {} from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from '@material-ui/core';

import COD from '../../public/images/payment/COD.png';
import visa from '../../public/images/payment/visa.png';

function CartPayment(props) {
    return(
        <Modal
            {...props}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                    <h5 style={{textTransform:'uppercase'}}>review your order</h5>
            </Modal.Header>
            <Modal.Body>
                <div class='container'>
                    <form>
                        <div class="form-group"style={{width:'100%'}}>
                            <input class="form-control" placeholder='Sub Total'></input>
                        </div>
                        <div class="form-group"style={{width:'100%'}}>
                            <input class="form-control" placeholder='Shipping Amount'></input>
                        </div>
                        <div class="form-group"style={{width:'100%'}}>
                            <input class="form-control" placeholder='Net Amount'></input>
                        </div>
                        <div class='container'>
                            <h5 style={{textTransform:'uppercase'}}>payment method</h5>
                        </div>
                        <div>
                            <form action="#">
                                    <p>
                                        <input type="radio" id="test1" name="radio-group" checked/>
                                        <label for="test1"><img src={COD} style={{width:'30%', height:"2%"}}/></label>                                        
                                    </p>
                                    <p>
                                        <input type="radio" id="test2" name="radio-group"/>
                                        <label for="test2"><img src={visa} style={{width:'20%', height:"2%"}}/></label>
                                    </p>
                            </form>
                        </div>
                        <div>
                            <Button onClick={props.onHide} class="btn btn-danger"style={{width:'100%', textTransform:'uppercase'}}>proceed</Button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}
export default CartPayment;