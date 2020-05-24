import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../../public/css/style.css'
import Image from "../../public/images/user/usercomment.png";

import { isAuthenticated, authenticate } from "../../auth/index";

const Comment = props => (
    <span>
        <img src={Image} style={{ maxWidth: "5%" }} class="img mx-auto float-left" alt="..." />
        <p>{props.comments.userName}</p>
        <p class="float-right"><span class="fa fa-star">{props.comments.rate}</span></p>
        <br />
        <p class="text-primary ml-5">{props.comments.comment}</p>
        <br />
        <a class="float-right date"><small>Date : {new Date(props.comments.createdAt).toDateString()}</small></a>
        {props.comments.userid === JSON.parse(localStorage.getItem("jwt")).user._id &&
            <span>
                <a><Link to={`/comments/${props.comments.itemid}`}> <button class="btn-sm btn-primary" style={{ margin: "0.5%" }}>edit</button></Link></a>
                <button onClick={() => { props.deleteComment(props.comments._id) }} class="btn-sm btn-danger ">Remove</button>
            </span>}
        <hr />
    </span>
)

export default class PreviewItem extends Component {

    //constructor
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addToWishList = this.addToWishList.bind(this);
        this.deleteComment = this.deleteComment.bind(this);

        this.state = {
            id: '',
            itemPhoto: '',
            itemName: '',
            category: '',
            discountedPrice: '',
            totalPrice: '',
            comments: [],
            totalRate: 0,
            userCount: 0,
            userID: '',
            quantity: '',
            alreadyItemCount: 0,
            cartid: '',
            wishListid: ''
        }
    }

    //list all categories
    componentDidMount() {

        // request to server to get item details
        axios.get('/items/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    id: res.data._id,
                    itemPhoto: res.data.itemPhoto,
                    itemName: res.data.itemName,
                    category: res.data.category.categoryName,
                    discountedPrice: res.data.discountedPrice,
                    totalPrice: res.data.totalPrice
                })
                console.log(this.state)
            });

        axios.get('/comment/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    comments: response.data
                })
                this.state.comments.forEach((comment) => {
                    this.setState({
                        totalRate: this.state.totalRate + comment.rate,
                        userCount: this.state.userCount + 1
                    })
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }
    CommentList() {
        return this.state.comments.map((currentComment) => {
            return <Comment comments={currentComment} deleteComment={this.deleteComment} key={currentComment.id} />
        })
    }
    deleteComment(id) {
        axios.delete('/comment/' + id)
            .then(res => {
                console.log(res.data)

                window.location = '/items/' + this.props.match.params.id
            });

        this.setState({
            comments: this.state.comments.filter(el => el._id != id)
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit(e) {

        e.preventDefault();
        axios.get('/cartDetails/' + JSON.parse(localStorage.getItem("jwt")).user._id + '/' + this.props.match.params.id)
            .then(res => {

                res.data.forEach((cartItem) => {
                    this.setState({
                        alreadyItemCount: this.state.alreadyItemCount + 1,
                        cartid: cartItem._id
                    })
                })

                if (this.state.alreadyItemCount > 0) {


                    const formData = {
                        quantity: this.state.quantity,
                        itemName: this.state.itemName,
                        discountedPrice: this.state.discountedPrice,
                        userID: JSON.parse(localStorage.getItem("jwt")).user._id,
                        itemID: this.props.match.params.id,
                        alreadyInCart: true,
                        cartid: this.state.cartid
                    }
                    // request to server to create a cart
                    axios.post('/cart/', formData)
                        .then(res => {
                            if (res.status === 201) {

                                this.setState({
                                    quantity: '',
                                    itemName: '',
                                    discountedPrice: '',
                                })
                            }
                        })
                        .catch(err => {
                            if (err.response.data) {
                                this.setState({
                                    quantity: '',
                                    itemName: '',
                                    discountedPrice: ''
                                })
                            }
                        })

                }
                else {

                    const formData = {
                        quantity: this.state.quantity,
                        itemName: this.state.itemName,
                        discountedPrice: this.state.discountedPrice,
                        userID: JSON.parse(localStorage.getItem("jwt")).user._id,
                        itemID: this.props.match.params.id,
                        cartid: this.state.cartid
                    }

                    // request to server to create an cart

                    axios.post('/cart/', formData)
                        .then(res => {
                            if (res.status === 201) {

                                this.setState({
                                    quantity: '',
                                    itemName: '',
                                    discountedPrice: '',
                                })
                            }
                        })
                        .catch(err => {
                            if (err.response.data) {
                                this.setState({
                                    quantity: '',
                                    itemName: '',
                                    discountedPrice: ''
                                })
                            }
                        })
                }
            })
    }

    //sending wishlist details to the cart DB
    addToWishList(e) {
        e.preventDefault();
        axios.get('/wishlistDetails/' + JSON.parse(localStorage.getItem("jwt")).user._id + '/' + this.props.match.params.id)
            .then(res => {
                res.data.forEach((wishlistItem) => {
                    this.setState({
                        alreadyItemCount: this.state.alreadyItemCount + 1,
                        wishListid: wishlistItem._id
                    })
                })

                if (this.state.alreadyItemCount > 0) {
                    const formData = {
                        itemName: this.state.itemName,
                        discountedPrice: this.state.discountedPrice,
                        userID: JSON.parse(localStorage.getItem("jwt")).user._id,
                        itemID: this.props.match.params.id,
                        alreadyInWishList: true,
                        wishListid: this.state.wishListid
                    }

                    // request to server to create a wishlist
                    axios.post('/wishlist/', formData)
                        .then(res => {
                            if (res.status === 201) {

                                this.setState({
                                    itemName: '',
                                    discountedPrice: '',
                                })
                            }

                        })
                        .catch(err => {
                            if (err.response.data) {
                                this.setState({
                                    itemName: '',
                                    discountedPrice: ''
                                })
                            }
                        })

                }
                else {
                    const formData = {
                        itemName: this.state.itemName,
                        discountedPrice: this.state.discountedPrice,
                        userID: JSON.parse(localStorage.getItem("jwt")).user._id,
                        itemID: this.props.match.params.id,
                        wishListid: this.state.wishListid
                    }

                    axios.post('/wishlist/', formData)
                        .then(res => {
                            if (res.status === 201) {

                                this.setState({
                                    itemName: '',
                                    discountedPrice: '',
                                })
                            }
                        })
                        .catch(err => {
                            if (err.response.data) {
                                this.setState({
                                    itemName: '',
                                    discountedPrice: ''
                                })
                            }
                        })

                    console.log(this.state.alreadyItemCount);

                }

            }

            )

    }

    render() {
        return (
            <div class="container">
                <div class="card-deck col-lg-12" style={{ marginTop: "10%" }}>
                    <div class="card" style={{ margin: "0% 20%" }}>
                        <img class="card-img-top" src={`/items/${this.state.id}/itemPhoto`} alt="" />
                        <div class="card-body">
                            <div class="text-center">
                            </div>
                            <h5 class="card-title">{this.state.itemName}</h5>
                            <p className="float-right" >category - <span style={{ color: "green" }}>{this.state.category}</span></p>
                            {this.state.userCount == 0 ? <p><i class="fa fa-star"></i>No Ratings</p> : <p><i class="fa fa-star"></i>{(this.state.totalRate / this.state.userCount).toFixed(1)}</p>}
                            {this.state.discountedPrice < this.state.totalPrice
                                &&
                                <div class="float-right">
                                    <del class="card-text text-dark">Rs.{this.state.totalPrice}.00</del>
                                    <h5 class="card-text text-primary">Rs.{this.state.discountedPrice}.00</h5>
                                </div>
                                ||
                                <div class="float-right">
                                    <br />
                                    <h5 class="card-text text-primary">Rs.{this.state.discountedPrice}.00</h5>
                                </div>
                            }
                        </div>
                        {isAuthenticated().user.role === "user" &&
                            <div>
                                <form className="container">
                                    <div className="form-group text-center row">
                                        <input style={{ width: '20%' }} type="Number" class="form-control ml-3" name="quantity" onChange={this.handleChange} />
                                        <button class="btn btn-sm ThemeBackground ml-2" onClick={this.onSubmit}>Add to cart</button>
                                        <button class="btn btn-sm ThemeBackground ml-2" onClick={this.addToWishList}>Add to WishList</button>
                                    </div>
                                </form>
                            </div>
                        }
                        <div class="card-footer">
                            <div class="inline">
                                <a class="comment" href="#comments">Show Comments</a>
                                <div id="comments">
                                    <a class="commenta float-right" href="#">Hide</a>
                                    <h3>Comments</h3>
                                    <hr />
                                    {this.CommentList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}