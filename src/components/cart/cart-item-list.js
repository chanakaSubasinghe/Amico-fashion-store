import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CartCheckout from './cart-checkout';

function CartItemList(){

    const [modalShow,setModalShow] = useState(false);

    const showModal = () => {
        setModalShow(true);
    }
    const hideModal = () => {
        setModalShow(false);
    }

         return(
            <div>
                <h1 style={{textAlign:'center'}}>Shopping Cart</h1>            
            <div className="container margin-top">
                <table style={{border:'1px solid black', width:'auto'}}>
                    <thead>
                        <tr>
                            <th style={{width:'10%', textAlign:'center'}}>Product Image</th>
                            <th style={{width:'10%', textAlign:'center'}}>Product Quantity</th>
                            <th style={{width:'10%', textAlign:'center'}}>Price</th>
                            <th style={{width:'10%', textAlign:'center'}}>Remove from Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
            <Button class="btn btn-dark" style={{float:'left'}} onClick={showModal}>Checkout</Button>
            <CartCheckout
                show={modalShow}
                onHide={hideModal}
            />
            </div>
        )
    }

export default CartItemList;