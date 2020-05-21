import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

export default class PreviewItem extends Component {

    //constructor
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addToWishList = this.addToWishList.bind(this);

        this.state = {
            id: '',
            itemPhoto: '',
            itemName: '',
            category: '',
            discountedPrice: '',
            totalPrice: '',
            userID:'',
            quantity:'',
            alreadyItemCount:0,
            cartid:'',
            wishListid:''
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
                    totalPrice: res.data.totalPrice,
                    averageRate: res.data.averageRate
                })
                console.log(this.state)
            });
            
    }
    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //sending cart details to the cart DB
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
                
                // request to server to create a cart
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
                
                axios.post('/cart/',formData)
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
                                 quantity:'',
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

     //sending wishlist details to the cart DB
     addToWishList(e) {
        axios.get('/wishlistDetails/'+JSON.parse(localStorage.getItem("jwt")).user._id+'/'+this.props.match.params.id)
        .then(res => {

            res.data.forEach((wishlistItem) =>{
                this.setState({
                    alreadyItemCount:this.state.alreadyItemCount+1,
                    wishListid :wishlistItem._id   
                })
            }

           
            )

            if(this.state.alreadyItemCount > 0){
                const formData = {
                    itemName:this.state.itemName,
                    discountedPrice:this.state.discountedPrice,
                    userID:JSON.parse(localStorage.getItem("jwt")).user._id,
                    itemID:this.props.match.params.id,
                    alreadyInWishList:true,
                    wishListid:this.state.wishListid
                }
                
                // request to server to create a wishlist
                axios.post('/wishlist/',formData)
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
            else{
                const formData = {
                    itemName:this.state.itemName,
                    discountedPrice:this.state.discountedPrice,
                    userID:JSON.parse(localStorage.getItem("jwt")).user._id,
                    itemID:this.props.match.params.id,
                    wishListid:this.state.wishListid
                }
                
                axios.post('/wishlist/',formData)
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
            <div class="card-deck col-lg-12" style={{marginTop: "10%"}}>
                <div class="card" style={{margin:"0% 20%"}}>
                    <img class="card-img-top" src={`/items/${this.state.id}/itemPhoto`} alt="" />
                        <div class="card-body">
                            <div class="text-center">
                            </div>
                            <h5 class="card-title">{this.state.itemName}</h5>
                            <p className="float-right" >category - <span style={{color: "green"}}>{this.state.category}</span></p>
                            <p><i class="fa fa-star"></i>{this.state.averageRate}</p>            
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
                        <div>                                              
                            <form className="container" onSubmit={this.onSubmit}>
                                <div className="form-group text-center">
                                    <input style={{width:'40%'}} type="Number" class="form-control" name="quantity" onChange={this.handleChange}/>
                                    <input type="submit" value="ADD TO CART" class="btn btn-primary"/>
                                </div>
                            </form>
                            <form className="container" onSubmit={this.addToWishList}>
                                <div className="form-group text-center">
                                    <input type="submit" value="ADD TO WISHLIST" class="btn btn-primary"/>
                                </div>
                            </form>
                            </div>
                            </div>
                        </div>     
                </div>
        
        )
    }
}