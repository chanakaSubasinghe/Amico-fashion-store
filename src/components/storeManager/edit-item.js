import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios';

export default class EditItem extends Component {

    // constructor
    constructor(props){
        super(props);

        // binding functions
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // this state
        this.state = {
            itemName : '',
            category : '',
            categories: [],
            discount : '',
            totalPrice : '',
            redirectTo: null
        }
    }

    componentDidMount(){

        // request to server to get details about provided item
        axios.get('/items/' + this.props.match.params.id)
            .then(response => {
                // set state
                this.setState({
                    itemName:response.data.itemName,
                    category : response.data.category._id,
                    discount : response.data.discount,
                    totalPrice : response.data.totalPrice
                })
            })
            .catch(function (error) {
                console.log(error)
            })

                    
            // get item categories from server
            axios.get('/itemCategories/')
            .then(response => {
                    if(response.data.length > 0){

                        // set state
                        this.setState({
                            categories : response.data
                        })
                    } 
                }
            )     
    }

    //handleChange
    handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
    }
    
   //button submit
   onSubmit(e){
       e.preventDefault();

       // updated item
       const item = {
                itemName:this.state.itemName,
                category : this.state.category,
                discount : this.state.discount,
                totalPrice : this.state.totalPrice
       }
       
       // request to server to update item 
       axios.patch('/items/' + this.props.match.params.id, item)
            .then(res => console.log(res.data));

         // redirect   
         this.setState({
            redirectTo: '/storeManagerPanel'
        })   

    }

    render(){

        // assigning this.category to a variable
        const defaultCategory = this.state.category

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        }
        else {

            return(
                <div class="container margin-top">
                    <div class="alert alert-warning" role="alert">
                        <h4 class="alert-heading">Note!</h4>
                        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                    </div>
    
                    <form onSubmit={this.onSubmit}>
    
                        <div class="form-group">
                            <label>Item Name</label>
                            <input type="text" class="form-control" name="itemName" value={this.state.itemName} onChange={this.handleChange}  required />
                        </div>
    
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Category</label>
                                <select class="form-control" 
                                        name="category"
                                        onChange={this.handleChange}                            
                                        required>
                                        {this.state.category &&
                                            this.state.categories.map(function(category,key){
                                                    return <option key={key} value={category._id}
                                                    selected={defaultCategory == category._id}>
                                                            {category.categoryName}
                                                            </option>
                                            })
                                        }
                                </select>
                        </div>
    
                        <div class="form-group">
                            <label>Discount</label>
                            <input type="number" class="form-control" name="discount" value={this.state.discount} onChange={this.handleChange} min="1" max="99"  />
                        </div>
    
                        <div class="form-group">
                            <label>Price Rs.</label>
                            <input type="text" class="form-control" name="totalPrice" value={this.state.totalPrice} onChange={this.handleChange}  required />
                        </div>
    
                        <div class="text-center">
                            <button type="submit" class="btn btn-dark">Edit Item</button>
                        </div>
                    </form>
                </div> 
            )
        }
    
    }
}