import React, {Component} from 'react'
import {Link} from 'react-router-dom'

// importing components
import ContactForm from '../user/contact-form'
import NavBar from '../partials/navbar'

// importing custom css and javascript
import '../../public/css/indexBody.css'
import '../../public/js/indexBody'

// importing images 
import adidas from '../../public/images/indexBody/adidas.png'
import amante from '../../public/images/indexBody/amante.png'
import nike from '../../public/images/indexBody/nike.png'
import gucci from '../../public/images/indexBody/gucci.png'
import Navbar from '../partials/navbar'



export default class IndexBody extends Component {

    render() {

        const {} = this.props

        return (
            <div>
                <Navbar />

                <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
                            alt="First slide" />
                        </div>
                        <div class="carousel-item">
                        <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(16).jpg"
                            alt="Second slide" />
                        </div>
                        <div class="carousel-item">
                        <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(17).jpg"
                            alt="Third slide" />
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div class="container">
                    <div class="newDivider text-center">
                        <h1 class="ThemeText">Enjoy our new arrivals and latest offers</h1>
                    </div>

                        <div class="newDivider">
                            <div class="container my-4">
                                <div id="multi-item-example" class="carousel slide carousel-multi-item" data-ride="carousel">
        
                                    <div class="carousel-inner slideanim" role="listbox">
                                        <div class="carousel-item active">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="card mb-2">
                                                        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg" alt="Card image cap" />
                                                        <div class="card-body">
                                                        <h4 class="card-title">Card title</h4>
                                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                                            card's content.</p>
                                                        <a class="btn btn-primary">Button</a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-4 d-md-block">
                                                    <div class="card mb-2">
                                                        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg" alt="Card image cap" />
                                                        <div class="card-body">
                                                        <h4 class="card-title">Card title</h4>
                                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                                            card's content.</p>
                                                        <a class="btn btn-primary">Button</a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-4 clearfix d-md-block">
                                                    <div class="card mb-2">
                                                        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(35).jpg" alt="Card image cap" />
                                                        <div class="card-body">
                                                        <h4 class="card-title">Card title</h4>
                                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                                            card's content.</p>
                                                        <a class="btn btn-primary">Button</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="card mb-2">
                                                        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg" alt="Card image cap" />
                                                        <div class="card-body">
                                                        <h4 class="card-title">Card title</h4>
                                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                                            card's content.</p>
                                                        <a class="btn btn-primary">Button</a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-4 clearfix d-md-block">
                                                    <div class="card mb-2">
                                                        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(47).jpg" alt="Card image cap" />
                                                        <div class="card-body">
                                                        <h4 class="card-title">Card title</h4>
                                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                                            card's content.</p>
                                                        <a class="btn btn-primary">Button</a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-4 clearfix d-md-block">
                                                    <div class="card mb-2">
                                                        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(48).jpg" alt="Card image cap" />
                                                        <div class="card-body">
                                                        <h4 class="card-title">Card title</h4>
                                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                                            card's content.</p>
                                                        <a class="btn btn-primary">Button</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="newDivider text-center">
                        <h1 class="ThemeText">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</h1>
                        </div>

                        <div class="newDivider">
                        <div class="row">

                            <div class="col-md-8 slideanim">
                                <a href="/"><img class="col-md-12" src="https://luckystrikebaitworks.com/wp-content/uploads/2019/03/banner_tournament-1366x500.jpg" /></a>
                            </div>
                            
                            <div class="col-md-4 justify-content-center align-self-center ">
                                <h2 class="text-center text-muted">Lorem ipsum dolor sit</h2>
                                <div class="text-center">
                                <button class="btn ThemeBackground" type="submit">Buy now</button>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div class="newDivider">
                        <div class="row">          
                            <div class="col-sm-4 justify-content-center align-self-center order-3">
                                <h2 class="text-center text-muted">Lorem ipsum dolor sit</h2>
                                <div class="text-center">
                                <button class="btn ThemeBackground" type="submit">Buy now</button>
                                </div>
                            </div>

                            <div class="col-md-8 order-2 order-md-12 slideanim">
                                <a href="/"><img class="col-md-12" src="https://luckystrikebaitworks.com/wp-content/uploads/2019/03/banner_tournament-1366x500.jpg" /></a>
                            </div>
                        </div>
                        </div>

                        <div class="newDivider">
                        <div class="row">
                            <div class="col-md-8 slideanim">
                                <a href="/"><img class="col-md-12" src="https://luckystrikebaitworks.com/wp-content/uploads/2019/03/banner_tournament-1366x500.jpg" /></a>
                            </div>

                            <div class="col-sm-4 justify-content-center align-self-center ">
                                <h2 class="text-center text-muted">Lorem ipsum dolor sit</h2>
                                <div class="text-center">
                                <button class="btn ThemeBackground" type="submit">Buy now</button>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div class="newDivider text-center">
                        <h1 class="ThemeText">Our Partners</h1>
                        <section class="row newDivider slideanim rounded mx-auto d-block">
                            <img class="col-md-2" src={adidas} />
                            <img class="col-md-2" src={amante} />
                            <img class="col-md-2" src={nike} />
                            <img class="col-md-2" src={gucci} />
                        </section>
                        </div>


                        <div class="newDivider text-center">
                        <h1 class="ThemeText">Contact us on 24 hours</h1>
                        </div>

                        
                        <div class="newDivider container-fluid my-4 slideanim">
                            <ContactForm />
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
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