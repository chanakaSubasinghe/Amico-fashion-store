
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
            <td>
                <button className='btn-sm' style={{ margin: "0% 10%" }} onClick={() => { props.increaseCartQty(props.cart._id, props.cart.discountedPrice) }}>+</button>
                {props.cart.quantity}
                <button className='btn-sm' style={{ margin: "0% 10%" }} onClick={() => { props.decreaseCartQty(props.cart._id, props.cart.quantity, props.cart.discountedPrice) }}>-</button>
            </td>
            <td>Rs.{props.cart.discountedPrice}.00</td>
            <td>Rs.{props.cart.discountedPrice * props.cart.quantity}.00</td>
            <td><button onClick={() => { props.deleteCartItem(props.cart._id, props.cart.discountedPrice, props.cart.quantity) }} class="btn btn-sm btn-danger">Remove</button></td>
        </tr>
    </tbody>
)


export default class CartItemList extends Component {

    constructor(props) {
        super(props);

        //binding the functions
        this.deleteCartItem = this.deleteCartItem.bind(this)
        this.increaseCartQty = this.increaseCartQty.bind(this)
        this.decreaseCartQty = this.decreaseCartQty.bind(this)

        this.state = {
            cart: [],
            totalValue: 0,
            quantity: 0,
            discountedPrice: 0,
            loading: false
        }
    }

    componentDidMount() {

        this.setState({
            loading: true
        })

        axios.get('/cart/' + JSON.parse(localStorage.getItem("jwt")).user._id)
            .then(response => {
                this.setState({
                    loading: false,
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
            return <Cart cart={currentCart} deleteCartItem={this.deleteCartItem} key={currentCart.id} increaseCartQty={this.increaseCartQty} decreaseCartQty={this.decreaseCartQty} />
        })
    }

    //deleting an item in the cart
    deleteCartItem(id, discountedPrice, quantity) {
        axios.delete('/cart/' + id)
            .then(
                axios.get('/cart/' + JSON.parse(localStorage.getItem("jwt")).user._id)
                    .then(response => {
                        this.setState({
                            cart: response.data,
                            totalValue: this.state.totalValue - (quantity * discountedPrice),
                            cart: this.state.cart.filter(el => el._id != id),
                        })
                    }))

    }

    async increaseCartQty(cartId, discountedPrice) {

        await axios.post('/incrementCartQty/' + cartId)
        const response = await axios.get('/cart/' + JSON.parse(localStorage.getItem("jwt")).user._id)

        this.setState({
            cart: response.data,
            totalValue: this.state.totalValue + (1 * discountedPrice)
        })

    }

    async decreaseCartQty(cartId, qty, discountedPrice) {
        if (qty == 1) {
            await axios.delete('/cart/' + cartId)

            const response = await axios.get('/cart/' + JSON.parse(localStorage.getItem("jwt")).user._id)

            this.setState({
                cart: response.data,
                totalValue: this.state.totalValue - (1 * discountedPrice)
            })

            this.setState({
                cart: this.state.cart.filter(el => el._id != cartId)
            })
        }

        else {
            axios.post('/decrementCartQty/' + cartId)
                .then(
                    axios.get('/cart/' + JSON.parse(localStorage.getItem("jwt")).user._id)
                        .then(response => {
                            this.setState({
                                cart: response.data,
                                totalValue: this.state.totalValue - (1 * discountedPrice)
                            })
                        })
                )
        }

    }

    render() {

        if (this.state.loading) {
            return (
                <div class="text-center my-5">
                    <div class="spinner-border" role="status" style={{ width: "3rem", height: "3rem" }}>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    {this.state.cart.length === 0 ? <h2 class="text-danger margin-top text-center">Empty Cart</h2> :
                        <div>
                            <div class="container margin-top text-center">
                                <h2>SHOPPING CART</h2>
                            </div>
                            <div class="margin-top">
                                <div class="col-12 container">
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
                                        <span></span>
                                        <label>Total = {this.state.totalValue}</label>
                                    </div>
                                    <div class="text-center">
                                        <Link to={`../BuyNow/checkout`}>
                                            <button class="btn btn-primary active">CHECKOUT</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </>
            )
        }
    }

}