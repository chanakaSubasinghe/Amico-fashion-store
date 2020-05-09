import React, {Component} from 'react'
import {Link , Redirect} from 'react-router-dom'

// import functions from auth folder
import {register, authenticate, isAuthenticated} from '../../auth/index'

export default class CustomerRegister extends Component {

    // define constructor
    constructor(props) {
        
        super(props)

        // declaring this state
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            error: '',
            userObj: {},
            redirectTo: false
        }

        // binding methods
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    // handle change function
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // onSubmit function
    onSubmit(e){
        e.preventDefault()


        // user object
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

        // send register user to server
        register(user)
            .then(data => {
                // check whether error is there or not
                if (data.error) {
                    // check whether the error has 'cannot contain' string
                    if (data.error.indexOf('cannot contain')) {
                        // if it is then set the state
                        this.setState({
                            error: data.error.slice(34)
                        })
                    } else {
                        // if it is not then set state with error
                        this.setState({
                            error: data.error
                        })
                    }
                }
                // if no errors then save the token and set the state
                else {
                    authenticate(data,
                        () => {
                            this.setState({
                                userObj: data,
                                redirectTo: true
                            })
                        })
                }
            })

    }

    render(){

        // if redirectTo is true or false
        if (this.state.redirectTo) {

            // redirect to user specific dashboard
            if (this.state.userObj.user.role === 'admin') {

                return window.location = '/adminPanel'
            }else if(this.state.userObj.user.role === 'storeManager'){

                return window.location = '/storeManagerPanel'
            }else {

                return window.location = '/'
            }
        } 
        // else check whether the current user is logged in or not
        else if(isAuthenticated()){
            return <Redirect to={{ pathname: '/' }} />
        }
        // if no issue then send login page 
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
                                        <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="johnsmith@example.com" maxLength="35" required/>
                                    </div>

                                    <label>Password</label>
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" minLength="8" maxLength="20" required/>
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