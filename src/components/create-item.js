import React, {Component} from 'react';
import axios from 'axios';

export default class CreateItem extends Component {
    
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            itemName : '',
            category : '',
            description : '',
            discount : 0,
            price : 0.00,
            averageRate : 1,
            comments : ''
        }
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

       const item = {
            itemName:this.state.itemName,
            category : this.state.category,
            description : this.state.description,
            discount : this.state.discount,
            price : this.state.price,
            averageRate : this.state.averageRate,
            comments : this.state.comments


       }
       

       axios.post('/items/', item)
            .then(res => console.log(res.data));

         this.setState({
            itemName : '',
            category : '',
            description : '',
            discount : '',
            price : '',
            averageRate : '',
            comments : ''
         })

         window.location = '/storeManagerPanel'
    }



   //page view
    render(){

        return(
            <div>
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
                        <label>Category</label>
                        <input type="text" class="form-control" name="category" value={this.state.category} onChange={this.handleChange}  required />
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.handleChange}  required />
                    </div>

                    <div class="form-group">
                        <label>Discount</label>
                        <input type="text" class="form-control" name="discount" value={this.state.discount} onChange={this.handleChange}   />
                    </div>

                    <div class="form-group">
                        <label>Price</label>
                        <input type="text" class="form-control" name="price" value={this.state.price} onChange={this.handleChange}  required />
                    </div>

                    <div class="form-group">
                        <label>Average Rate</label>
                        <input type="text" class="form-control" name="averageRate" value={this.state.averageRate} onChange={this.handleChange}   />
                    </div>

                    <div class="form-group">
                        <label>Comments</label>
                        <input type="text" class="form-control" name="comments" value={this.state.comments} onChange={this.handleChange}   />
                    </div>

                    <div class="text-center">
                        <button type="submit" class="btn btn-dark">create item</button>
                    </div>
                </form>
            </div> 
        )
    }
}