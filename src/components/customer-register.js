import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class CustomerRegister extends Component {

    constructor(props) {
        
        super(props)

        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    onChangeFirstName(e){
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeLastName(e){
        this.setState({
            lastName: e.target.value
        })
    }


    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    onChangeConfirmPassword(e){
        this.setState({
            confirmPassword: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        axios.post('http://localhost:5000/users', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })

    }

    render(){

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
                                    <input type="text" class="form-control" value={this.state.firstName} onChange={this.onChangeFirstName} placeholder="John" minLength="2" maxLength="10" required/>
                                </div>

                                <label>Last Name</label>
                                <div class="input-group mb-2 mr-sm-2">
                                    <input type="text" class="form-control" value={this.state.lastName} onChange={this.onChangeLastName} placeholder="Smith" minLength="2" maxLength="15" required/>
                                </div>

                                <label>Email</label>
                                <div class="input-group mb-2 mr-sm-2">
                                    <input type="email" class="form-control" value={this.state.email} onChange={this.onChangeEmail} placeholder="johnsmith@example.com" minLength="2" required/>
                                </div>

                                <label>Password</label>
                                <div class="input-group mb-2 mr-sm-2">
                                    <input type="password" class="form-control" value={this.state.password} onChange={this.onChangePassword} placeholder="Password" minLength="8" required/>
                                </div>

                                <label>Confirm Password</label>
                                <div class="input-group mb-2 mr-sm-2">
                                    <input type="password" class="form-control" value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword} placeholder="Confirm Password" minLength="8" required/>
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