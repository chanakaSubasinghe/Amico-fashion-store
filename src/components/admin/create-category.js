import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'

export default class CreateCategory extends Component {
    
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            categoryName : '',
            redirectTo: null 
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

       const category = {
                categoryName:this.state.categoryName,
       }
       

       axios.post('/itemCategories/', category)
            .then(res => {
                this.setState({
                    categoryName : ''
                })
            })
            .catch(err => {
                console.log(err.response.data)
            })

        

        //  window.location = '/adminPanel'
    }



   //page view
    render(){

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        }
        else {
            return(
                <div>                    
                    <div class="alert alert-warning" role="alert">
                        <h4 class="alert-heading">Note!</h4>
                        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label>Category Name</label>
                            <input type="text" class="form-control" name="categoryName" value={this.state.categoryName} onChange={this.handleChange} minLength="2" maxLength="20" required />
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-dark">create category</button>
                        </div>
                    </form>
                </div> 
            )
        }
    }
}