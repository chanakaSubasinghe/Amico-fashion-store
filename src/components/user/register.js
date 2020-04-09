import React, {Component} from 'react'
import {Link , Redirect} from 'react-router-dom'
import axios from 'axios'

export default class CustomerRegister extends Component {

    constructor(props) {
        
        super(props)

        // declaring this state
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            error: '',
            redirectTo: null

        }

        // binding methods
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()


        // user object
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

    }

    render(){

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } 
        else {
            return(
                <div>
                    <div class="container margin-top">
                        <h3 class="text-center ThemeText">New Member ?</h3>
                        <br/>
                        <div class="row">
                            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">

                                {this.state.error &&
                                    <div class="alert alert-danger" role="alert">
                                        {this.state.error}
                                    </div>
                                } 

                                <form onSubmit={this.onSubmit}>

                                    <label>First Name</label>
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="text" class="form-control" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="John" maxLength="10" required/>
                                    </div>

                                    <label>Last Name</label>
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="text" class="form-control" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Smith" maxLength="15" required/>
                                    </div>

                                    <label>Email</label>
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="johnsmith@example.com" required/>
                                    </div>

                                    <label>Password</label>
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" minLength="8" required/>
                                    </div>

                                    <br />
                                    <button type="submit" class="btn ThemeBackground btn-block">Register</button>

                                </form> 
                                <br/>
                                <p class="float-right">Already registered ? <Link to="/login">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}