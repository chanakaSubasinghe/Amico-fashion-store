import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CartPayment from './cart-payment';

function CartCheckout(){

    const [modalShow, setModalShow] = useState(false);

    const showModal = () => {
        setModalShow(true);
    };

    const hideModal = () => {
        setModalShow(false);
    };

    return(
        <div class="newDivider">
                <div class= "container">
                        <form>
                            <div>
                                <h5 style={{textTransform:'uppercase'}}>billing details</h5>
                            </div>
                            <div class="form-group"style={{width:'50%'}}>
                                <input class="form-control" placeholder='First Name'></input>
                            </div>
                            <div class="form-group"style={{width:'50%'}}>
                                <input class="form-control" placeholder='Last Name'></input>
                            </div>
                            <div class="form-group"style={{width:'50%'}}>
                                <input class="form-control" placeholder='Street Address'></input>
                            </div>
                            <div class="form-group"style={{width:'50%'}}>
                                <input class="form-control" placeholder='City'></input>
                            </div>
                            <div>
                                <h5 style={{textTransform:'uppercase'}}>delivery details</h5>
                            </div>
                            <div class="form-group"style={{width:'50%'}}>
                                <select class="form-control" placeholder='City'>
                                    <option>Colombo</option>
                                    <option>Kandy</option>
                                    <option>Gampaha</option>
                                    <option>Galle</option>
                                    <option>Matara</option>
                                    <option>Ratnapura</option>
                                </select>    
                            </div>
                            <div class="form-group"style={{width:'50%'}}>
                                <input class="form-control" placeholder='Postal Code'></input>
                            </div> 
                            <div class="form-group"style={{width:'50%'}}>
                                <input class="form-control" placeholder='Phone Number'></input>
                            </div>  
                            <div class="form-group"style={{width:'50%'}}>
                                <input class="form-control" placeholder='email'></input>
                            </div>
                            <div class="form-group"style={{width:'50%'}}>
                                <textarea class="form-control" placeholder='Other Notes'></textarea>
                            </div>  
                            <div class="form-group">
                                <Button onClick={showModal} style={{width:'50%'}} class="btn btn-block btn-primary">PLACE ORDER</Button>
                                <CartPayment
                                    show={modalShow}
                                    onHide={hideModal}
                                />  
                            </div>           
                        </form>
                    </div>
        </div>    
    );
}
export default CartCheckout;
