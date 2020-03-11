import React, {Component} from 'react'
import {Link} from 'react-router-dom'

// importing custom css and javascript
import '../public/css/indexBody.css'
import '../public/js/indexBody'

// importing images 

import adidas from '../public/images/indexBody/adidas.png'
import amante from '../public/images/indexBody/amante.png'
import nike from '../public/images/indexBody/nike.png'
import gucci from '../public/images/indexBody/gucci.png'

export default class IndexBody extends Component {

    render() {
        return (
            <div>
                 <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://luckystrikebaitworks.com/wp-content/uploads/2019/03/banner_tournament-1366x500.jpg" class="d-block w-100" />
                        <div class="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="https://luckystrikebaitworks.com/wp-content/uploads/2019/03/banner_tournament-1366x500.jpg" class="d-block w-100" />
                        <div class="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="https://luckystrikebaitworks.com/wp-content/uploads/2019/03/banner_tournament-1366x500.jpg" class="d-block w-100" />
                        <div class="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </div>
                    </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                    </a>
                </div>
            <div class="container">
                
                <div class="newDivider text-center">
                    <h1 class="ThemeText">Enjoy our new arrivals and latest offers</h1>
                </div>

                    <div class="newDivider">
                        <div class="container">
                            <div class="card-deck mb-3 text-center">
                                <div class="card mb-4 shadow-sm slideanim">
                                    <div class="card-header">
                                    <h4 class="my-0 font-weight-normal ThemeText">New Arrivals</h4>
                                    </div>
                                    <div class="card-body d-flex flex-column">
                                        <img src="https://yaliyah.com/wp-content/uploads/2019/10/7756-knfafl-350x350.jpg" />
                                    </div>
                                    <div class="card-footer">
                                    <button type="button" class="btn btn-lg btn-block mt-auto text-white ThemeBackground">Shop Now</button>
                                    </div>
                                </div>

                                <div class="card mb-4 shadow-sm slideanim">
                                    <div class="card-header">
                                    <h4 class="my-0 font-weight-normal ThemeText">Avuduru Offers</h4>
                                    </div>
                                    <div class="card-body d-flex flex-column">
                                        <img src="https://yaliyah.com/wp-content/uploads/2019/10/7756-knfafl-350x350.jpg" />
                                    </div>
                                    <div class="card-footer">
                                    <button type="button" class="btn btn-lg btn-block mt-auto text-white ThemeBackground">Shop Now</button>
                                    </div>
                                </div>

                                <div class="card mb-4 shadow-sm slideanim">
                                    <div class="card-header">
                                    <h4 class="my-0 font-weight-normal ThemeText">Black Friday</h4>
                                    </div>
                                    <div class="card-body d-flex flex-column">
                                        <img src="https://yaliyah.com/wp-content/uploads/2019/10/7756-knfafl-350x350.jpg" />
                                    </div>
                                    <div class="card-footer">
                                    <button type="button" class="btn btn-lg btn-block mt-auto text-white ThemeBackground">Shop Now</button>
                                    </div>
                                </div>
                        </div>
                        </div>
                    </div>

                    <div class="newDivider text-center">
                    <h1 class="ThemeText">Enjoy our new arrivals and latest offers</h1>
                    </div>

                    <div class="newDivider">
                    <div class="row">
                        <img class="col-sm-8 slideanim clickable" onclick="location.href='#';" src="https://luckystrikebaitworks.com/wp-content/uploads/2019/03/banner_tournament-1366x500.jpg" />
                        <div class="col-sm-4 justify-content-center align-self-center ">
                            <h2 class="text-center text-muted">Lorem ipsum dolor sit</h2>
                            <div class="text-center">
                            <button class="btn text-white ThemeBackground" type="submit">Buy now</button>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div class="newDivider">
                    <div class="row">          
                        <div class="col-sm-4 justify-content-center align-self-center order-3">
                            <h2 class="text-center text-muted">Lorem ipsum dolor sit</h2>
                            <div class="text-center">
                            <button class="btn text-white ThemeBackground" type="submit">Buy now</button>
                            </div>
                        </div>
                        <img class="col-sm-8 order-2 order-md-12 slideanim" src="https://luckystrikebaitworks.com/wp-content/uploads/2019/03/banner_tournament-1366x500.jpg" />
                    </div>
                    </div>

                    <div class="newDivider">
                    <div class="row">
                        <img class="col-sm-8 slideanim" src="https://luckystrikebaitworks.com/wp-content/uploads/2019/03/banner_tournament-1366x500.jpg" />
                        <div class="col-sm-4 justify-content-center align-self-center ">
                            <h2 class="text-center text-muted">Lorem ipsum dolor sit</h2>
                            <div class="text-center">
                            <button class="btn text-white ThemeBackground" type="submit">Buy now</button>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div class="newDivider text-center">
                    <h1 class="ThemeText">Our  Partners</h1>
                    <section class="row newDivider slideanim">
                        <img class="col-sm-3" src={adidas} />
                        <img class="col-sm-3" src={amante} />
                        <img class="col-sm-3" src={nike} />
                        <img class="col-sm-3" src={gucci} />
                    </section>
                    </div>


                    <div class="newDivider text-center">
                    <h1 class="ThemeText">Contact us on 24 hours</h1>
                    </div>

                    
                    <div class="newDivider container-fluid my-4 slideanim">
                        <form class="needs-validation"novalidate>
                            <div class="form-row">
                            <div class="col-md-12 mb-3">
                                <label for="validationCustom01">First name</label>
                                <input type="text" class="form-control" id="validationCustom01" placeholder="First name" value="Mark" required />
                                <div class="valid-feedback">
                                Looks good!
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <label for="validationCustom02">Last name</label>
                                <input type="text" class="form-control" id="validationCustom02" placeholder="Last name" value="Otto" required />
                                <div class="valid-feedback">
                                Looks good!
                                </div>
                            </div>
                            </div>
                            <div class="form-row">
                            <div class="col-md-12 mb-3">
                                <label for="validationCustom03">Email</label>
                                <input type="email" class="form-control" id="validationCustom03" placeholder="Email" required />
                                <div class="invalid-feedback">
                                Please provide a valid email.
                                </div>
                            </div>

                            <div class="col-md-12 mb-3">
                                <label for="validationCustom04">contact number</label>
                                <input type="tel" class="form-control" id="validationCustom04" placeholder="Contact Number" required />
                                <div class="invalid-feedback">
                                Please provide a valid contact number.
                                </div>
                            </div>

                            </div>

                            <div class="text-center">
                            <button class="btn text-white ThemeBackground" type="submit">Submit your request</button>
                            </div>
                        </form>
                </div>


                <div class="newDivider text-center">
                    <h1 class="ThemeText">About us</h1>
                </div>

                <div class="newDivider text-muted slideanim">
                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Pretium nibh ipsum consequat nisl vel pretium lectus. Nunc id cursus metus aliquam eleifend. Ullamcorper a 
                    lacus vestibulum sed arcu. Auctor eu augue ut lectus arcu bibendum at varius vel. Orci nulla pellentesque dignissim enim.
                    Sit amet tellus cras adipiscing. Non odio euismod lacinia at. Amet nulla facilisi morbi tempus. Ut consequat semper viverra
                        nam libero. Neque sodales ut etiam sit. Odio morbi quis commodo odio aenean. Cras fermentum odio eu feugiat pretium
                    </h5>
                </div>
            </div>
            </div>
        )
    }
}