import React, {Component} from 'react';
import {Redirect} from  'react-router-dom'
import axios from 'axios'

export default class UserProfile extends Component {

    // constructor
    constructor(props) {
        super(props);


        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            redirectTo: null
        }

        // binding functions
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    componentDidMount() {

        // get user by props
        const {user} = this.props

        // set state
        this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
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

        const updateUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password
        }

        // request to server to update the current user
        axios.patch('/users/me', updateUser,
        {headers: 
            {
                Authorization: `Bearer ${localStorage.getItem('JWT_Token')}`
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.error))

        // redirect to index page
        this.setState({
            redirectTo: '/'
        })

    }    

    render() {

        if (this.state.redirectTo) {
            return <Redirect to={{pathname: this.state.redirectTo}} />
        }else {
            return (
                <div>
                    <div className="container margin-top">
                        <h3 className="text-center ThemeText">Customer Profile</h3>
                        <br/>
                        <div className="row">
                            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                <form onSubmit={this.onSubmit}>
    
                                    <img src="https://fallenrockparke.com/images/avatar.png" class="rounded mx-auto d-block my-5"/>
                                    
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
                                        <label htmlFor="exampleInputEmail1">Password</label>
                                        <input type="password"
                                               className="form-control"
                                               name="password"
                                               value={this.state.password}
                                               onChange={this.handleChange}
                                               minLength={8}
                                        />
                                    </div>
    
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">New Password</label>
                                        <input type="password"
                                               className="form-control"
                                               name="newPassword"
                                               value={this.state.newPassword}
                                               onChange={this.handleChange}
                                               minLength={2}
                                        />
                                    </div>
    
    
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Confirm Password</label>
                                        <input type="password"
                                               className="form-control"
                                               name="confirmPassword"
                                               value={this.state.confirmPassword}
                                               onChange={this.handleChange}
                                               minLength={2}
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
}
