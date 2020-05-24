import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CartPayment from './cart-payment';

import deliveryBox from '../../public/images/payment/delivery-box.png';
import invoice from '../../public/images/payment/invoice.png';
import world from '../../public/images/payment/world.png'

function CartCheckout() {

    const [modalShow, setModalShow] = useState(false);

    const showModal = (e) => {
        e.preventDefault()
        setModalShow(true);
    };

    const hideModal = (e) => {
        e.preventDefault()
        setModalShow(false);
    };

    return (
        <div class="newDivider">

            <div class="container d-flex justify-content-center">
                <div class="row">
                    <div class="col-6">
                        <img src={invoice} style={{ width: '40%', margin: '6% 40% 10% -40%' }} />
                        <br />
                        <img src={deliveryBox} style={{ width: '40%', margin: '6% 40% 10% -40%' }} />
                        <br />
                        <img src={world} style={{ width: '40%', margin: '6% 40% 10% -40%' }} />
                    </div>

                    <div class="col-6">
                        <form onSubmit={showModal}>
                            <div>
                                <h5 style={{ textTransform: 'uppercase' }}>billing details</h5>
                            </div>
                            <div class="form-group" style={{ width: '150%' }}>
                                <input class="form-control" placeholder='First Name' required></input>
                            </div>
                            <div class="form-group" style={{ width: '150%' }}>
                                <input class="form-control" placeholder='Last Name' required></input>
                            </div>
                            <div class="form-group" style={{ width: '150%' }}>
                                <input class="form-control" placeholder='Street Address' required></input>
                            </div>
                            <div class="form-group" style={{ width: '150%' }}>
                                <input class="form-control" placeholder='City' required></input>
                            </div>
                            <div>
                                <h5 style={{ textTransform: 'uppercase' }}>delivery details</h5>
                            </div>
                            <div class="form-group" style={{ width: '150%' }}>
                                <select class="form-control" placeholder='City' required>
                                    <option>Colombo</option>
                                    <option>Kandy</option>
                                    <option>Gampaha</option>
                                    <option>Galle</option>
                                    <option>Matara</option>
                                    <option>Ratnapura</option>
                                </select>
                            </div>
                            <div class="form-group" style={{ width: '150%' }}>
                                <input class="form-control" placeholder='Postal Code' required></input>
                            </div>
                            <div class="form-group" style={{ width: '150%' }}>
                                <input class="form-control" placeholder='Phone Number' required></input>
                            </div>
                            <div class="form-group" style={{ width: '150%' }}>
                                <input class="form-control" placeholder='email' required></input>
                            </div>
                            <div class="form-group" style={{ width: '150%' }}>
                                <textarea class="form-control" placeholder='Other Notes' required></textarea>
                            </div>
                            <div class="form-group">
                                <Button type="submit" style={{ width: '150%' }} class="btn btn-block ThemeBackground">PLACE ORDER</Button>
                                <CartPayment
                                    show={modalShow}
                                    onHide={hideModal}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CartCheckout;