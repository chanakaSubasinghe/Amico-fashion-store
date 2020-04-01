import React, {Component} from 'react'
import {Link} from 'react-router-dom'



export default class AdminLogin extends Component {

    render(){

        return(
            <div>
                 <div class="container margin-top">
                    <h3 class="text-center ThemeText">Administrator Login</h3>
                    <br/>
                    <div class="row">
                        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <form>


                                <div class="input-group mb-2 mr-sm-2">
                                    <input type="email" class="form-control" name="email" placeholder="UserName" required/>
                                </div>

                                <div class="input-group mb-2 mr-sm-2">
                                    <input type="password" class="form-control" name="password" placeholder="Password" required/>
                                </div>

                                <button type="submit" class="btn ThemeBackground btn-block">Login</button>

                            </form>
                            <br />
                            <p class="float-right">For store manager login? <Link to="/storeManagerLogin" class="text-decoration-none">Store Manager</Link></p>        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}