import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//inputs for the table
const Cart = props => (
    <tbody>
        <tr>
            <td class="w-25">
                {<img src={`/items/${props.cart.itemID}/itemPhoto`} class="img-fluid img-thumbnail" alt="" />}
            </td>
            <td>{props.cart.itemName}</td>
            <td><input type="Number" className="text-center" value={props.cart.quantity} /></td>
            <td>Rs.{props.cart.discountedPrice}.00</td>
            <td>Rs.{props.cart.discountedPrice * props.cart.quantity}.00</td>
            <td><button onClick={() => { props.deleteCartItem(props.cart._id) }} class="btn btn-danger">Remove</button></td>
        </tr>
    </tbody>
)


export default class CartItemList extends Component {

    constructor(props) {
        super(props);

        //binding the functions
        this.deleteCartItem = this.deleteCartItem.bind(this);

        this.state = {
            cart: [],
            totalValue: 0,
            quantity: 0,
            discountedPrice: 0
        }
    }

    componentDidMount() {

        axios.get('/cart/' + JSON.parse(localStorage.getItem("jwt")).user._id)
            .then(response => {
                this.setState({
                    cart: response.data
                })
                //cart total
                this.state.cart.forEach((carts) => {
                    this.setState({
                        totalValue: this.state.totalValue + (carts.quantity * carts.discountedPrice)
                    })
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
            return <Cart cart={currentCart} deleteCartItem={this.deleteCartItem} key={currentCart.id} />
        })
    }

    //deleting an item in the cart
    deleteCartItem(id) {
        axios.delete('/cart/' + id)
            .then(res => console.log(res.data));

        this.setState({
            cart: this.state.cart.filter(el => el._id != id)
        })
    }

    render() {
        return (
            <div>
                <div class="container margin-top text-center">
                    <h2>SHOPPING CART</h2>
                    <h2>{`Total - ${this.state.totalValue}`}</h2>
                </div>
                <div class="margin-top">
                    <div class="col-12 container">
                        {this.state.cart.length === 0 ? <h3 class="text-center text-danger">Please add your favorites items to cart in order to checkout</h3> :
                            <>
                                <table class="table table-image text-center">
                                    <thead class="ThemeBackground">
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
                                <div class="text-center">
                                    <Link to={`/cartCheckout`}>
                                        <button class="btn ThemeBackground active">CHECKOUT</button>
                                    </Link>
                                </div>
                            </>
                        }

                    </div>
                </div>
            </div>
        )
    }

}