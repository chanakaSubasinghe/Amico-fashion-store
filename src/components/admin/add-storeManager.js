import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

export default class AddStoreManager extends Component {

    constructor(props){

        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            success: '',
            error: '',
            password: 'amico123#'
        }
    }

    handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

    onSubmit(e){
        e.preventDefault();
       
        const storeManager = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            role: 'storeManager'
        }

        axios.post('/users', storeManager)
            .then(res => {
                console.log(res.data)
                this.setState({
                    error: '',
                    success: 'Successfully added.'
                })
            })
            .catch(err => {
                console.log('Error',err.message)
                this.setState({
                    success: '',
                    error: 'something went wrong!'
                })
            })

            this.setState ({
                firstName: '',
                lastName: '',
                email: '',
                password: 'amico123#',
            })


            window.location = '/adminPanel'

    }

    render() {

            return(
                <div>
                    {this.state.success &&
                        <div class="alert alert-success" role="alert">
                            {this.state.success}
                        </div>
                    }

                    {this.state.error &&
                        <div class="alert alert-error" role="alert">
                            {this.state.error}
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
                            <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} minLength="2" required/>
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input type="text" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} minLength="8" required/>
                        </div>

                        <div class="text-center">
                            <button type="submit" class="btn btn-dark">add store manager</button>
                        </div>
                    </form>
                </div>
            )   
    }
}