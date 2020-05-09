import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

// import functions from auth folder
import {logIn, authenticate, isAuthenticated} from '../../auth/index'

export default class CustomerLogin extends Component {

    // define constructor
    constructor(props) {
        super(props)
        
        // declaring this state
        this.state = {
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
        e.preventDefault();

        // create login user
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        // send login user to server
        logIn(user)
            .then(data => {
                if (data.error) {
                    // if there an error set error property in the state
                    this.setState({
                        error: data.error
                    })
                }
                else {
                    // if there is a valid user then set jwt token and redirect to specific dashboard
                   authenticate(data,
                    () => {
                        this.setState({
                            userObj: data,
                            redirectTo: true
                        })
                    }) 
                }
            })
            .catch(err => {
                console.log('Login error:',err)
            })

    }

    render(){
            // check whether redirectTo is true or false
            if (this.state.redirectTo) {

                // if it is true then redirect to specific dashboard 
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
                                        <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" maxLength="35" required/>
                                    </div>
    
                                    <div class="input-group mb-2 mr-sm-2">
                                        <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" minLength="8" maxLength="20" required/>
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