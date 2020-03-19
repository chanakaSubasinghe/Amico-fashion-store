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
            username: '',
            password: '',
            confirmPassword: '',
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
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        // request to server to add a new user
        axios.post('/users', user)
            .then(res => {
                console.log(res.data)
                if(res.status === 200){
                   
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: res.data.username
                    })

                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            })
            .catch(err => {
                console.log('Register error: ' + err)
            })
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
                                <form onSubmit={this.onSubmit}>


                                    <label>First Name</label>
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="text" class="form-control" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="John" minLength="2" maxLength="10" required/>
                                    </div>

                                    <label>Last Name</label>
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="text" class="form-control" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Smith" minLength="2" maxLength="15" required/>
                                    </div>

                                    <label>Email</label>
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="johnsmith@example.com" minLength="2" required/>
                                    </div>

                                    <label>Username</label>
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="text" class="form-control" name="username" value={this.state.username} onChange={this.handleChange} placeholder="johnsmith2020" minLength="2" required/>
                                    </div>

                                    <label>Password</label>
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" minLength="8" required/>
                                    </div>

                                    <label>Confirm Password</label>
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="password" class="form-control" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} placeholder="Confirm Password" minLength="8" required/>
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