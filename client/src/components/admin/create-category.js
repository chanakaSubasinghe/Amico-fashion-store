// importing dependencies
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

// class definition
export default class CreateCategory extends Component {

    // constructor
    constructor(props) {
        super(props);

        // binding functions
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // this state
        this.state = {
            categoryName: '',
            redirectTo: null,
            success: '',
            error: '',
            loading: false
        }
    }



    //handleChange
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    //button submit
    onSubmit(e) {
        e.preventDefault();

        // set state 
        this.setState({
            loading: true
        })

        const category = {
            categoryName: this.state.categoryName,
        }

        // send request to server
        axios.post('/itemCategories/', category)
            .then(res => {
                this.setState({
                    categoryName: '',
                    success: 'successfully added category.',
                    error: '',
                    loading: false
                })


                setTimeout(() => {
                    window.location = '/adminPanel'
                }, 2000)
            })
            .catch(err => {
                this.setState({ categoryName: '' })
                if (err.response.data.error) this.setState({ success: '', error: 'Sorry this is already exist!', loading: false })
            })
    }



    //page view
    render() {

        // condition
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        }
        else {
            return (
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
                            {this.state.loading ? <button class="btn btn-dark" type="button" disabled>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span class="sr-only">Loading...</span>
                            </button> :
                                <button type="submit" class="btn btn-dark">create category</button>
                            }
                        </div>
                    </form>
                </div>
            )
        }
    }
}