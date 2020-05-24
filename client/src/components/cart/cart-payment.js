import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from '@material-ui/core';

import COD from '../../public/images/payment/COD.png';
import visa from '../../public/images/payment/visa.png';

function CartPayment(props) {

    const [success, setSuccess] = useState(false)



    return (
        <Modal
            {...props}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <h5 style={{ textTransform: 'uppercase' }}>{success ? 'Hurray :)' : 'review your order'}</h5>
            </Modal.Header>
            {success ?
                <Modal.Body>
                    <div class='container'>
                        <form>
                            <div class='container'>
                                <h5 style={{ textTransform: 'uppercase' }} class="text-success">Your Payment is Successful! Go and see our others items...</h5>
                            </div>
                            <div>
                                <Button onClick={props.onHide} class="btn btn-danger" style={{ width: '100%', textTransform: 'uppercase' }}>Close</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body> :



                <Modal.Body>
                    <div class='container'>
                        <form>
                            <div class='container'>
                                <h5 style={{ textTransform: 'uppercase' }}>payment method</h5>
                            </div>
                            <div>
                                <form action="#">
                                    <p>
                                        <input type="radio" id="test1" name="radio-group" checked />
                                        <label for="test1"><img src={COD} style={{ width: '30%', height: "2%" }} /></label>
                                    </p>
                                    <p>
                                        <input type="radio" id="test2" name="radio-group" />
                                        <label for="test2"><img src={visa} style={{ width: '20%', height: "2%" }} /></label>
                                    </p>
                                </form>
                            </div>
                            <div>
                                <Button onClick={() => { setSuccess(true) }} class="btn btn-danger" style={{ width: '100%', textTransform: 'uppercase' }}>{success ? 'Close' : 'Proceed'}</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            }
        </Modal>
    );
}
export default CartPayment;