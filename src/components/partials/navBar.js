import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

// importing custom css and javascript
import '../../public/css/navbar.css'
import collapseFunction from '../../public/js/navbar.js'

// importing images for navbar
import amico from '../../public/images/navbar/amico.png'
import phone from '../../public/images/navbar/phone-alt-solid.png'
import heart from '../../public/images/navbar/heart-solid.png'
import instagram from '../../public/images/navbar/instagram-brands.png'
import shoppingVan from '../../public/images/navbar/shipping-fast-solid.png'
import shoppingCart from '../../public/images/navbar/shopping-bag-solid.png'


export default class NavBar extends Component {

    // constructor 
    constructor(props) {
        super(props)
        
        // binding functions
        this.logout = this.logout.bind(this)
    }

    // logout function
    logout(e) {

        e.preventDefault()

        // send request to server to login user
        axios.post('/users/logout', null,
        {headers: 
            {
                Authorization: `Bearer ${localStorage.getItem('JWT_Token')}`
            }
        })
        .then(res => {
            // condition
            if(res.status === 200){

                this.props.updateUser({
                    loggedIn: false,
                    user: {}
                })

                localStorage.removeItem('JWT_Token')
            }
        }).catch(err => {
            console.log('Logout error: ' + err.error)
        })

        // redirect    
        // window.location = '/'
    }
    
    render() {

        // get properties
        const {loggedIn, user} = this.props

        return (
            <div>
                <nav class="navbar navbar-dark bg-dark">
                    <div class=" container row">
                        <small class="text-white"><img src={phone} class="nav-icons" /> +94112345678</small>
                        <small class="text-white"><img src={shoppingVan} class="nav-icons" /> free delivery on island wide</small>
                        <small class="text-white"><Link to="http://www.instagram.com"><img src={instagram} class="nav-icons" /></Link> follow us</small>

                    </div>
                </nav>

                <nav class="navbar navbar-expand-lg navbar-dark" id="main-header">
                    <div class="container">
                            <Link class="navbar-brand" to="/"><img class="mx-auto d-block" id="amico-brand" src={amico} /></Link>
                                <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                                    <ul class="navbar-nav">

                                        <li class="nav-item">
                                            <Link class="nav-link active" to="/items">Shop our products</Link>
                                        </li>

                                        <form className="form-inline mx-5">
                                            <input className="form-control form-control-sm mr-2" type="text"
                                                    placeholder="search category" />
                                                <button className="btn btn-sm searchButton my-2 my-sm-0"
                                                        type="submit">Search
                                                </button>
                                        </form>
                                            
                                    </ul>
                                </div>
                                {loggedIn ? ( 
                                <div class="row hideWithCollapse">
                                
                                        <div class="d-inline m-2">
                                            <Link to="/"><img src={heart} class="user-icons" /><span class="badge badge-light">10</span></Link>

                                        </div>

                                        <div class="d-inline m-2">
                                            <Link to="/"><img src={shoppingCart} class="user-icons" /><span class="badge badge-light">4</span></Link>

                                        </div>

                                        <div class="d-inline dropdown nav-link">
                                            <Link class="dropdown-toggle text-light" style={{color: "white", textDecoration: "none"}} to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Signed In As {user.firstName}
                                                </Link>

                                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                                    <Link class="dropdown-item" to="/users/me">Profile</Link>
                                                    {user.role === 'admin'
                                                        &&  <Link class="dropdown-item" to="/adminPanel">Admin Settings</Link>
                                                    }
                                                    {user.role === 'storeManager'
                                                        &&  <Link class="dropdown-item" to="/storeManagerPanel">StoreManager Settings</Link>
                                                    }      
                                                    <div class="dropdown-divider"></div>
                                                    <Link class="dropdown-item" to="#" onClick={this.logout}>Logout</Link>
                                                </div>
                                        </div>  
                                    </div>
                                    ) : ( 

                                            <div class="d-inline">
                                                <Link to="/login" class="hideWithCollapse" style={{color: "white", textDecoration: "none"}}>Login | Join</Link>
                                            </div>

                                    )} 

                                <button className='navbar-toggler' onClick={collapseFunction} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    </div>
                </nav>
            </div>
        )
    }
}