import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// importing custom css and javascript
import '../../public/css/footer.css'

import { isAuthenticated, logout } from '../../auth/index'

export default class Footer extends Component {

    // constructor 
    constructor(props) {
        super(props)

        this.state = {
            userObj: isAuthenticated()
        }
    }

    render() {
        return (
            <footer class="py-5 amico-footer">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-md-3 item">
                            <h3>Navigate</h3>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/shop">Shop</Link></li>

                            </ul>
                        </div>
                        <div class="col-lg-4 col-md-3 item">
                            <h3>Hello there !</h3>
                            {this.state.userObj ? (
                                <ul>
                                    <li><Link to="/users/me">My account</Link></li>
                                    {isAuthenticated() && isAuthenticated().user.role === 'user' &&
                                        <li><Link to="/boughtItems">My orders</Link></li>
                                    }
                                </ul>
                            ) : (
                                    <ul>
                                        <Link to="/login" class="hideWithCollapse" style={{ color: "white", textDecoration: "none" }}>Login | Join</Link>
                                    </ul>

                                )}
                        </div>

                        <div class="col-lg-4 col-md-3 item">
                            <h3>Amico</h3>
                            <p>Welcome to amico.lk, one of the biggest women clothing brand in Sri Lanka.</p>

                        </div>
                    </div>
                    <div class="text-center">
                        <div class="col item social">
                            <img class="payments" src="https://i.ya-webdesign.com/images/vector-pipe-tubing-16.png" />
                        </div>
                    </div>
                    <p class="copyright">Amico 2020 All Rights Reserved</p>

                </div>
            </footer>
        )
    }
}