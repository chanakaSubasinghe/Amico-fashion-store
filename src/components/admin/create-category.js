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
            redirectTo: null,
            success: '',
            error: '' 
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
                    categoryName : '',
                    success: 'successfully added category.',
                    error: ''
                })

                window.location = '/adminPanel'
            })
            .catch(err => {
                this.setState({categoryName: ''})
                if (err.response.data.error) this.setState({success: '',error: 'Sorry this is already exist!'})
            })
    }



   //page view
    render(){

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        }
        else {
            return(
                <div>                    
                    {this.state.success &&
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <p>{this.state.success}</p>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    }

                    {this.state.error &&
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <p>{this.state.error}</p>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    }

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