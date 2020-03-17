import React, {Component} from 'react'
import {Link} from 'react-router-dom'



export default class CustomerLogin extends Component {

    render(){

        return(
            <div>
                 <div class="container customer">
                    <h3 class="text-center ThemeText">Already Registered ?</h3>
                    <br/>
                    <div class="row">
                        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <form class="needs-validation" action="/login" method="POST">


                                <div class="input-group mb-2 mr-sm-2">
                                    <input type="email" class="form-control" name="email" placeholder="UserName" required/>
                                </div>

                                <div class="input-group mb-2 mr-sm-2">
                                    <input type="password" class="form-control" name="password" placeholder="Password" required/>
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