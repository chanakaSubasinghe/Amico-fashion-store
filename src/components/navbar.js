import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

// importing custom css and javascript
import '../public/css/navbar.css'
import collapseFunction from '../public/js/navbar.js'

// importing images for navbar
import amico from '../public/images/navbar/amico.png'
import phone from '../public/images/navbar/phone-alt-solid.png'
import heart from '../public/images/navbar/heart-solid.png'
import instagram from '../public/images/navbar/instagram-brands.png'
import shoppingVan from '../public/images/navbar/shipping-fast-solid.png'
import shoppingCart from '../public/images/navbar/shopping-bag-solid.png'

export default class Navbar extends Component {

    constructor() {
        super()
        
        this.logout = this.logout.bind(this)
    }

    logout(e) {

        e.preventDefault()
        console.log('logged out')

        axios.post('http://localhost:5000/users/logout')
            .then(res => {
                console.log('logging out')

                if(res.status === 200){

                    this.props.updateUser({
                        loggedIn: false,
                        username: null
                    })
                }
            }).catch(err => {
                console.log('Logout error: ' + err)
            })

        window.location = '/'    
    }
    
    render() {

        const loggedIn = this.props.loggedIn
        const username = this.props.username
        return (
            <div>
                <nav class="navbar navbar-dark bg-dark">
                    <div class=" container row">
                        <small class="text-white"><img src={phone} class="nav-icons" /> +94112345678</small>
                        <small class="text-white"><img src={shoppingVan} class="nav-icons" /> free delivery on island wide</small>
                        <small class="text-white"><Link to="http://www.google.com"><img src={instagram} class="nav-icons" /></Link> follow us</small>

                    </div>
                </nav>

                <nav class="navbar navbar-expand-lg navbar-dark" id="main-header">
                    <div class="container">
                            <Link class="navbar-brand" to="/"><img class="mx-auto d-block" id="amico-brand" src={amico} /></Link>
                                <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                                    <ul class="navbar-nav">
                                            <li class="nav-item">
                                                <Link class="nav-link" to="#">Dresses</Link>
                                            </li>

                                            <li class="nav-item">
                                                <Link class="nav-link" to="#">Tops</Link>
                                            </li>

                                            <li class="nav-item">
                                                <Link class="nav-link" to="#">Jeans</Link>
                                            </li>


                                            <li class="nav-item">
                                                <Link class="nav-link" to="#">Shoes</Link>
                                            </li>

                                            <li class="nav-item">
                                                <Link class="nav-link" to="#">Accessories</Link>
                                            </li>

                                            <li class="nav-item dropdown">
                                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    More
                                                </a>
                                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <a class="dropdown-item" href="#">Profile</a>
                                                    <a class="dropdown-item" href="#">Wish list</a>
                                                    <a class="dropdown-item" href="#">My cart</a>
                                                    <div class="dropdown-divider"></div>
                                                    <a class="dropdown-item" href="#">Logout</a>
                                                </div>
                                            </li>
                                    </ul>
                                </div>

                                <div id="hideWithCollapse">
                                        <div class="d-inline">
                                            <Link to="/"><img src={shoppingCart} class="user-icons" /><span class="badge badge-light">4</span></Link>
                                        </div>

                                        <div class="d-inline m-3">
                                            <Link to="/"><img src={heart} class="user-icons" /><span class="badge badge-light">10</span></Link>
                                        </div> 
                                </div>                                              
                                {loggedIn ? ( 
                                            
                                        <div id="hideWithCollapse" class="row">
                                            <div class="nav-item dropdown">
                                                <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Logged In as {username}
                                                </a>
                                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <Link class="dropdown-item" to="/adminPanel">Profile</Link>
                                                    <a class="dropdown-item" href="#">Wish list</a>
                                                    <a class="dropdown-item" href="#">My cart</a>
                                                    <div class="dropdown-divider"></div>
                                                    <Link class="dropdown-item" to="#" onClick={this.logout}>Logout</Link>
                                                </div>
                                            </div>
                                        </div>                                                                       
                                            
                                    ) : ( 

                                            <div class="d-inline">
                                                <Link to="/login" style={{color: "white", textDecoration: "none"}}> Login</Link>
                                            </div>

                                    )} 

                                <button className='navbar-toggler' onClick={collapseFunction} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    </div>
                </nav>
            </div>
        )
    }
}