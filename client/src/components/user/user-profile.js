import React, {Component} from 'react';
import {Redirect} from  'react-router-dom'
import axios from 'axios'

import {isAuthenticated ,authenticate} from '../../auth/index'

export default class UserProfile extends Component {

    // constructor
    constructor(props) {
        super(props);


        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            success: '',
            error: '',
            redirectTo: null
        }

        // binding functions
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        this.setState({
            firstName: isAuthenticated().user.firstName,
            lastName: isAuthenticated().user.lastName,
            email: isAuthenticated().user.email,
        })
    }

    // handle change function
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // on submit function
    onSubmit(e) {
        e.preventDefault()

        // updated user
        const updateUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password
        }
        // request to server to update the current user
        axios.patch('/users/me', updateUser,
        {headers: 
            {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`
            }
        })
            .then(res => {
                authenticate(res.data,
                    () => {
                        this.setState({
                            error: '',
                            success: 'Successfully updated your profile.',
                            password: ''
                        })
                        this.componentDidMount()

                        window.location = '/users/me'

                    }) 
            })
            .catch(err => {
                if (err.response.data.indexOf('cannot contain')) {
                    this.setState({
                        success: '',
                        error: err.response.data.slice(34),
                        password: ''
                    })
                } else {
                    this.setState({
                        success: '',
                        error: err.response.data,
                        password: ''
                    })
                }

            })
    }    

    render() {

            return (
                <div>
                    <div className="container margin-top">
                        <h3 className="text-center ThemeText">Profile Management</h3>
                        <br/>
                        <div className="row">
                            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">


                                {this.state.success &&
                                    <div class="alert alert-success" role="alert">
                                        {this.state.success}
                                    </div>
                                } 

                                {this.state.error &&
                                    <div class="alert alert-danger" role="alert">
                                        {this.state.error}
                                    </div>
                                } 

                                <form onSubmit={this.onSubmit}>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">First Name</label>
                                        <input type="text"
                                               className="form-control"
                                               name="firstName"
                                               value={this.state.firstName}
                                               onChange={this.handleChange}
                                               minLength={2}
                                               maxLength={10}
                                               required
                                        />
                                    </div>
    
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Last Name</label>
                                        <input type="text"
                                               className="form-control"
                                               name="lastName"
                                               value={this.state.lastName}
                                               onChange={this.handleChange}
                                               minLength={2}
                                               maxLength={15}
                                               required
                                        />
    
                                    </div>
    
    
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email"
                                               className="form-control"
                                               name="email"
                                               value={this.state.email}
                                               disabled                             
                                               
                                        />
                                    </div>
    
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">New Password</label>
                                        <input type="password"
                                               className="form-control"
                                               name="password"
                                               value={this.state.password}
                                               onChange={this.handleChange}
                                               minLength={8}
                                               required
                                        />
                                    </div>
    
                                    <div className="text-center">
                                        <button type="submit"
                                                className="btn ThemeBackground my-3"
                                                onSubmit={this.onSubmit}
                                            >update profile
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
}
