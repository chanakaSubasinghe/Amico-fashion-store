import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import CartCheckout from './cart-checkout';

import '../../public/css/style.css'
import { isAuthenticated, authenticate } from "../../auth/index";

const Cart = props => (
    <tbody>
        <tr>
            <td class="w-25">
                { <img src={`/items/${props.cart.itemID}/itemPhoto`} class="img-fluid img-thumbnail" alt=""/> }
            </td>
            <td>{props.cart.itemName}</td>
            <td><input type="Number" className= "text-center" value={props.cart.quantity}/></td>
            <td>Rs.{props.cart.discountedPrice}.00</td>
            <td>Rs.{props.cart.discountedPrice*props.cart.quantity}.00</td>
            <td><button class="btn btn-danger">Remove</button></td>
        </tr>
    </tbody>
)

export default class CartItemList extends Component{
    constructor(props){
        super(props);

        this.state = {
            cart: [],
        };
    }

    componentDidMount(){

        axios.get('/cart/'+ JSON.parse(localStorage.getItem("jwt")).user._id)
            .then(response => {
                this.setState({
                    cart: response.data
                })
            })
        axios.get('/items/')
            .then(response => {
                this.setState({
                    items: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    CartList() {
        return this.state.cart.map(currentCart => {
            return <Cart cart={currentCart} key={currentCart.id} />
        })
    }

    render(){
        return(
            <div>
                <div class="container margin-top text-center">
                        <h2>SHOPPING CART</h2>
                </div>
                <div class="margin-top">
                <div class="col-12 container">
                    <table class="table table-image text-center">
                    <thead class="thead-dark">
                         <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">quantity</th>
                        <th scope="col">Price of the item</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Remove from Cart</th>
                        </tr> 
                    </thead>

                        {this.CartList()}

                    </table>
                    <div>
                        <Link to={`/cartCheckout`}>
                            <button class="btn btn-primary active">CHECKOUT</button>
                        </Link>
                    </div>                
                        </div>
                    </div>                    
                </div>
        )
    }

}