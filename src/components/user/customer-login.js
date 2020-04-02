import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'


export default class CustomerLogin extends Component {

    constructor(props) {
        super(props)
        
        // declaring this state
        this.state = {
            username: '',
            password: '',
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
            username: this.state.username,
            password: this.state.password
        }

        // send request to server
        axios.post('/users/login', user)
            .then(res => {
 
                console.log('login response: ' + res.data)
 
                if (res.status === 200) {

                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        user: {
                            id: res.data._id,
                            firstName: res.data.firstName,
                            lastName: res.data.lastName,
                            username: res.data.username,
                            email: res.data.email
                        }
                    })

                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            })
            .catch(err => {
                console.log('login error')
                console.log(err)
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
                        <h3 class="text-center ThemeText">Already Registered ?</h3>
                        <br/>
                        <div class="row">
                            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                <form onSubmit={this.onSubmit}>
    
    
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="text" class="form-control" name="username" value={this.state.username} onChange={this.handleChange} maxLength="9" placeholder="Username" required/>
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