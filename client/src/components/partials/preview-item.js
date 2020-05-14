import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'

export default class PreviewItem extends Component {

    //constructor
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            itemPhoto: '',
            itemName: '',
            category: '',
            discountedPrice: '',
            totalPrice: '',
            averageRate: ''
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

    render() {
        return (
            <div class="container">
            <div class="card-deck col-lg-12" style={{marginTop: "10%"}}>
                <div class="card" style={{margin:"0px 200px"}}>
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
                        <div class="card-footer">
                            <div class="inline">
                                // comments goes here..
                            </div>
                        </div>
                </div>
            </div> 
            </div>
        )
    }
}