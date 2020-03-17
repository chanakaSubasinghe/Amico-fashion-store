import React, {Component} from 'react'
import {Link} from 'react-router-dom'

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
    
    render() {
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
                                    </ul>
                                </div>   

                                <div id="userIcon">
                                    <Link to="/" class="p-2"><img src={shoppingCart} class="user-icons" /><span class="badge badge-light">4</span></Link>
                                    <Link to="/" class="p-4"><img src={heart} class="user-icons" /><span class="badge badge-light">10</span></Link>
                                </div>
                                <div class="navbar-nav">
                                    <Link to="/login" class="nav-link">Login | Join</Link>
                                </div>
                                

                                <button className='navbar-toggler' onClick={collapseFunction} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    </div>
                </nav>
            </div>
        )
    }
}