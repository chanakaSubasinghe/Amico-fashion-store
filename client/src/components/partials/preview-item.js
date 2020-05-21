import React, {Component} from 'react'
import axios from 'axios';

import '../../public/css/style.css'
import Image from "../../public/images/user/usercomment.png";

import { isAuthenticated, authenticate } from "../../auth/index";
const Comment = props => (
    
    <span>
    <img src={Image} style={{ maxWidth: "5%"}} class="img mx-auto float-left" alt="..."/> <p>{props.comments.userName}</p><p><span class="fa fa-star">{props.comments.rate}</span></p>
    <p>{props.comments.comment}</p><a class="float-right date"><small>Date : {props.comments.createdAt}</small></a>
   <p><small><a href="">Like</a> - <a href="">Share</a></small></p>
   
        <hr/>
    </span>
)

export default class PreviewItem extends Component {

    //constructor
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            itemPhoto: '',
            itemName: '',
            category: '',
            discountedPrice: '',
            totalPrice: '',
            comments:[],
            totalRate:0,
            userCount:0,
            userID:'',
            quantity:'',
            alreadyItemCount:0,
            cartid:''
          }
    }

    //list all categories
    componentDidMount(){

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

            axios.get('/comment/'+ this.props.match.params.id)
            .then(response => {
               this.setState({
                   comments:  response.data
               })
               this.state.comments.forEach((comment)=>{
                this.setState({
                    totalRate : this.state.totalRate + comment.rate ,
                    userCount: this.state.userCount +1
                 })

            })
            }
             )

            .catch((error) => {
                console.log(error);
            })

    }
    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit(e){
        axios.get('/cartDetails/'+JSON.parse(localStorage.getItem("jwt")).user._id+'/'+this.props.match.params.id)
        .then(res => {

            res.data.forEach((cartItem) =>{
                this.setState({
                    alreadyItemCount:this.state.alreadyItemCount+1,
                    cartid :cartItem._id
                })
            }


            )

            if(this.state.alreadyItemCount > 0){
                const formData = {
                    quantity: this.state.quantity,
                    itemName:this.state.itemName,
                    discountedPrice:this.state.discountedPrice,
                    userID:JSON.parse(localStorage.getItem("jwt")).user._id,
                    itemID:this.props.match.params.id,
                    alreadyInCart:true,
                    cartid:this.state.cartid
                }

                // request to server to create an comment
                axios.post('/cart/',formData)
                     .then(res => {
                         if (res.status === 201) {

                             this.setState({
                                 quantity: '',
                                 itemName: '',
                                 discountedPrice: '',
                             })
                            }
                            // window.location ='/cartList'
                     })
                     .catch(err => {
                         if (err.response.data) {
                             this.setState({
                                 quantity:'',
                                 itemName: '',
                                 discountedPrice: ''
                             })
                         }
                     })

            }
            else{
                const formData = {
                    quantity: this.state.quantity,
                    itemName:this.state.itemName,
                    discountedPrice:this.state.discountedPrice,
                    userID:JSON.parse(localStorage.getItem("jwt")).user._id,
                    itemID:this.props.match.params.id,
                    cartid:this.state.cartid
                }

                // request to server to create an comment
                axios.post('/cart/',formData)
                     .then(res => {
                         if (res.status === 201) {

                             this.setState({
                                 quantity: '',
                                 itemName: '',
                                 discountedPrice: '',
                             })
                            }

                            window.location ='/cartList'
                     })
                     .catch(err => {
                         if (err.response.data) {
                             this.setState({
                                 quantity:'',
                                 itemName: '',
                                 discountedPrice: ''
                             })
                         }
                     })

                     console.log(this.state.alreadyItemCount);
            }
        })
     }
     CommentList() {
        return this.state.comments.map((currentComment) => {
          return <Comment comments={currentComment} key={currentComment.id} />
        })
    }

    render() {
        return (
            <div class="container">
            <div class="card-deck col-lg-12" style={{marginTop: "10%"}}>
                <div class="card" style={{margin:"0% 20%"}}>
                    <img class="card-img-top" src={`/items/${this.state.id}/itemPhoto`} alt="" />
                        <div class="card-body">
                            <div class="text-center">
                            </div>
                            <h5 class="card-title">{this.state.itemName}</h5>
                            <p className="float-right" >category - <span style={{color: "green"}}>{this.state.category}</span></p>
                            {this.state.userCount == 0 ? <p><i class="fa fa-star"></i>No Ratings</p> : <p><i class="fa fa-star"></i>{(this.state.totalRate/this.state.userCount).toFixed(2)}</p>}            
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
                        <form className="container" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                <input type="Number" class="form-control" name="quantity" onChange={this.handleChange} />
                                <input type="submit" value="ADD TO CART" className="btn btn-primary" />
                                </div>
                            </form>

                        </div>
                        <div class="card-footer">
                            <div class="inline">
                            <a class ="commenta" href="#comments">Show Comments</a>
                                    <div id="comments">
                                    <a class ="commenta float-right" href="#">Hide</a> 
                                        <h3>Comments</h3>
                                        <hr/>
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