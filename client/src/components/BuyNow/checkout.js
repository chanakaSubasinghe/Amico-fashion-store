import React, {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Checkout extends Component {
    render(){
        return(
            <div class="newDivider">
                    <div class= "container">
                            <form>
                                <div>
                                    <h5 style={{textTransform:'uppercase'}}>billing details</h5>
                                </div>
                                <div class="form-group"style={{width:'50%'}}>
                                    <input class="form-control" placeholder='First Name'></input>
                                </div>
                                <div class="form-group"style={{width:'50%'}}>
                                    <input class="form-control" placeholder='Last Name'></input>
                                </div>
                                <div class="form-group"style={{width:'50%'}}>
                                    <input class="form-control" placeholder='Street Address'></input>
                                </div>
                                <div class="form-group"style={{width:'50%'}}>
                                    <input class="form-control" placeholder='City'></input>
                                </div>
                                <div>
                                    <h5 style={{textTransform:'uppercase'}}>delivery details</h5>
                                </div>
                                <div class="form-group"style={{width:'50%'}}>
                                    <select class="form-control" placeholder='City'>
                                        <option>Colombo</option>
                                        <option>Kandy</option>
                                        <option>Gampaha</option>
                                        <option>Galle</option>
                                        <option>Matara</option>
                                        <option>Ratnapura</option>
                                    </select>    
                                </div>
                                <div class="form-group"style={{width:'50%'}}>
                                    <input class="form-control" placeholder='Postal Code'></input>
                                </div> 
                                <div class="form-group"style={{width:'50%'}}>
                                    <input class="form-control" placeholder='Phone Number'></input>
                                </div>  
                                <div class="form-group"style={{width:'50%'}}>
                                    <input class="form-control" placeholder='email'></input>
                                </div>
                                <div class="form-group"style={{width:'50%'}}>
                                    <textarea class="form-control" placeholder='Other Notes'></textarea>
                                </div>  
                                <div class="form-group">
                                <Link to={`payment`}>
                                    <button class="btn ThemeBackground">Buy Now</button>
                                </Link>
                                </div>           
                            </form>
                        </div>
            </div>    
        )}
}

