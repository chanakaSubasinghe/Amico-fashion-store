import React, {Component} from 'react'
import {Link} from 'react-router-dom'

// importing components
import ContactForm from '../user/contact-form'

// importing custom css and javascript
import '../../public/css/indexBody.css'
import '../../public/js/indexBody'

// importing images 
import adidas from '../../public/images/indexBody/adidas.png'
import amante from '../../public/images/indexBody/amante.png'
import nike from '../../public/images/indexBody/nike.png'
import gucci from '../../public/images/indexBody/gucci.png'

import s1 from '../../public/images/indexBody/s1.jpg'
import s2 from '../../public/images/indexBody/s2.jpg'
import s3 from '../../public/images/indexBody/s3.jpg'


import c1 from '../../public/images/indexBody/c1.jpg'
import c2 from '../../public/images/indexBody/c2.jpg'
import c3 from '../../public/images/indexBody/c3.jpg'



export default class IndexBody extends Component {

    render() {


        return (
            <div>

                <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img class="d-block w-100" src={c1}
                            alt="First slide" />
                        </div>
                        <div class="carousel-item">
                        <img class="d-block w-100" src={c2}
                            alt="Second slide" />
                        </div>
                        <div class="carousel-item">
                        <img class="d-block w-100" src={c3}
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
                        <h1 class="ThemeText">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</h1>
                        </div>

                        <div class="newDivider">
                        <div class="row">

                            <div class="col-md-8 slideanim">
                                <a href="/"><img class="col-md-12" src={s1} /></a>
                            </div>
                            
                            <div class="col-md-4 justify-content-center align-self-center ">
                                <h2 class="text-center text-muted">Lorem ipsum dolor sit</h2>
                                <div class="text-center">
                                <button class="btn ThemeBackground" type="submit">Shop now</button>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div class="newDivider">
                        <div class="row">          
                            <div class="col-sm-4 justify-content-center align-self-center order-3">
                                <h2 class="text-center text-muted">Lorem ipsum dolor sit</h2>
                                <div class="text-center">
                                <button class="btn ThemeBackground" type="submit">Shop now</button>
                                </div>
                            </div>

                            <div class="col-md-8 order-2 order-md-12 slideanim">
                                <a href="/"><img class="col-md-12" src={s2} /></a>
                            </div>
                        </div>
                        </div>

                        <div class="newDivider">
                        <div class="row">
                            <div class="col-md-8 slideanim">
                                <a href="/"><img class="col-md-12" src={s3} /></a>
                            </div>

                            <div class="col-sm-4 justify-content-center align-self-center ">
                                <h2 class="text-center text-muted">Lorem ipsum dolor sit</h2>
                                <div class="text-center">
                                <button class="btn ThemeBackground" type="submit">Shop now</button>
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