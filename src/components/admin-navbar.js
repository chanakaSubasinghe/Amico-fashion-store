import React, {Component} from 'react'

//importing css files
import '../public/css/admin-navbar.css'

//importing images
import amico from '../public/images/navbar/amico.png'

export default class AdminNavbar extends Component {

    render(){

        return(
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
     
                <div class="container">
                    <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="navbar-brand" href="#"><img class="mx-auto d-block" id="amico-brand" src={amico} /></a>
                    </li>
                    </ul>
                
                    <div class="float-right">
                        <a class="text-white" href="#">Logged In As chanaka</a> 
                        <a class="text-white" href="#">Logout</a>  
                    </div>
                </div>

            </nav>
        )
    }
}