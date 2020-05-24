import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//inputs for the table
const WishList = props => (
    <tbody>
        <tr>
            <td class="w-25">
                {<img src={`/items/${props.wishlist.itemID}/itemPhoto`} class="img-fluid img-thumbnail" alt="" />}
            </td>
            <td>{props.wishlist.itemName}</td>
            <td>Rs.{props.wishlist.discountedPrice}.00</td>
            <td>
                <Link to={`/wishlistItems/${props.wishlist.itemID}`}>
                    <button onClick={() => { props.deleteWishlistItem(props.wishlist._id) }} class="btn btn-sm ThemeBackground" >ADD TO CART</button>
                </Link>
            </td>
            <td><button onClick={() => { props.deleteWishlistItem(props.wishlist._id) }} class="btn btn-sm btn-danger">REMOVE</button></td>
        </tr>
    </tbody>
)

export default class WishListItems extends Component {

    constructor(props) {
        super(props);

        //binding the functions
        this.deleteWishlistItem = this.deleteWishlistItem.bind(this);

        this.state = {
            wishlist: [],
        };
    }

    componentDidMount() {

        axios.get('/wishlist/' + JSON.parse(localStorage.getItem("jwt")).user._id)
            .then(response => {
                this.setState({
                    wishlist: response.data
                })
            })

        //request server to get all items    
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

    //delete an item in the wishlist
    deleteWishlistItem(id) {
        axios.delete('/wishlist/' + id)
            .then(res => console.log(res.data));

        this.setState({
            wishlist: this.state.wishlist.filter(el => el._id != id)
        })
    }

    //map to the list
    wishLists() {
        return this.state.wishlist.map(currentwishList => {
            return <WishList wishlist={currentwishList} deleteWishlistItem={this.deleteWishlistItem} key={currentwishList.id} />
        })
    }

    render() {
        return (

            <div>
                {this.state.wishlist.length === 0 ? <h2 class="text-danger margin-top text-center">Empty WishList</h2> :
                    <div>
                        <div class="container margin-top text-center">
                            <h2>WISH LIST</h2>
                        </div>
                        <div class="margin-top">
                            <div class="col-12 container">
                                <table class="table table-image text-center">
                                    <thead class="ThemeBackground">
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price of the item</th>
                                            <th scope="col">Action</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>

                                    {this.wishLists()}

                                </table>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }


}