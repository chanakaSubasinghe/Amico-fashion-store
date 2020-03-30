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



//inputs for the table

const Category = props => (
        <Link class="dropdown-item" to="/">{props.category.categoryName}</Link>
)


export default class Navbar extends Component {

    constructor(props) {
        super(props)
        
        this.logout = this.logout.bind(this)
        this.state = { categories: []}
    }

    //list all categories
    componentDidMount(){
    
        axios.get('/itemCategories/')
            .then(response => {
                this.setState({ categories: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // logout function
    logout(e) {

        e.preventDefault()
        console.log('logged out')

        // send request to server to login user
        axios.post('/users/logout')
            .then(res => {
                console.log('logging out')

                // condition
                if(res.status === 200){

                    this.props.updateUser({
                        loggedIn: false,
                        user: null
                    })
                }
            }).catch(err => {
                console.log('Logout error: ' + err)
            })

        // redirect    
        window.location = '/'    
    }

    //map to the list
    CategoryList(){
        return this.state.categories.map(currentCategory => {
            return <Category category={currentCategory} key={currentCategory._id}/>
        })
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

                                        <div className="d-inline dropdown nav-link mx-5">
                                                <Link class="dropdown-toggle text-light"
                                                      style={{color: "white", textDecoration: "none"}} to="#"
                                                      id="navbarDropdown" role="button" data-toggle="dropdown"
                                                      aria-haspopup="true" aria-expanded="false">
                                                    categories
                                                </Link>

                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    {this.CategoryList()}
                                                </div>
                                            </div>


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
                                                    Signed In As {user.username}
                                                </Link>

                                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <Link class="dropdown-item" to="/users/profile">Profile</Link>
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