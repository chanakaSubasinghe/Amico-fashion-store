import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'


export default class CustomerLogin extends Component {

    constructor(props) {
        super(props)
        
        // declaring this state
        this.state = {
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
        e.preventDefault();

        const user = {
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
                        <h3 class="text-center ThemeText">Already Registered ?</h3>
                        <br/>
                        <div class="row">
                            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            {this.state.error &&
                                <div class="alert alert-danger" role="alert">
                                    {this.state.error}
                                </div>
                            }    

                                <form onSubmit={this.onSubmit}>
    
    
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" required/>
                                    </div>
    
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" required/>
                                    </div>
    
                                    <button type="submit" class="btn ThemeBackground btn-block">Login</button>
    
                                </form>
                                <br />
                                <p class="float-right">Don't have an account? <Link to="/register" class="text-decoration-none">Register</Link></p>        
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}