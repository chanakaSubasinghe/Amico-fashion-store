// importing dependencies
import React, { Component } from 'react'
import axios from 'axios'

// class definition
export default class AddStoreManager extends Component {

    // constructor
    constructor(props) {

        super(props)

        // binding functions
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        // state
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            success: '',
            error: '',
            password: 'amico123#',
            loading: false
        }
    }

    // handle change function
    handleChange(e) {
        // set state
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // on submit button function
    onSubmit(e) {
        e.preventDefault();

        // set state 
        this.setState({
            loading: true
        })

        // create an object
        const storeManager = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            role: 'storeManager'
        }

        // send request to server
        axios.post('/users', storeManager)
            .then(res => {
                console.log(res.data)
                this.setState({
                    error: '',
                    success: 'Successfully added.',
                    loading: false
                })

                setTimeout(() => {
                    window.location = '/adminPanel'
                }, 2000)
            })
            .catch(err => {
                console.log('Error', err.response.data)
                this.setState({
                    success: '',
                    error: 'store manager already exist with that email!',
                    loading: false
                })
            })

        // set state
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: 'amico123#',
        })
    }

    // render function
    render() {

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
                        <label>First Name</label>
                        <input type="text" class="form-control" name="firstName" value={this.state.firstName} onChange={this.handleChange} maxLength="10" required />
                    </div>

                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" class="form-control" name="lastName" value={this.state.lastName} onChange={this.handleChange} maxLength="15" required />
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} minLength="2" required />
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="text" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} minLength="8" required />
                    </div>

                    <div class="text-center">
                        {this.state.loading ? <button class="btn btn-dark" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="sr-only">Loading...</span>
                        </button> :
                            <button type="submit" class="btn btn-dark">Add storeManager</button>
                        }
                    </div>
                </form>
            </div>
        )
    }
}