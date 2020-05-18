import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import CartCheckout from './cart-checkout';

import '../../public/css/style.css'

const Item = props => (
    <tbody>
        <tr>
            <td class="w-25">
                <img src={`/items/${props.item._id}/itemPhoto`} class="img-fluid img-thumbnail" alt=""/>
            </td>
            <td>{props.item.itemName}</td>
            <td>Rs.{props.item.discountedPrice}.00</td>
        </tr>
    </tbody>
)

export default class CartItemList extends Component{
    constructor(props){
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount(){

        axios.get()
            .then(response => {
                this.setState({
                    items: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    ItemList() {
        return this.state.items.map(currentItem => {
            return <Item item={currentItem} key={currentItem.id} />
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
                        <th scope="col">Price</th>
                        </tr>
                    </thead>

                        {this.ItemList()}

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