import React, { Component } from "react";
import { Link } from "react-router-dom";

// importing custom css and javascript
import "../../public/css/indexBody.css";
import "../../public/js/indexBody";

// importing images
import adidas from "../../public/images/indexBody/adidas.png";
import amante from "../../public/images/indexBody/amante.png";
import nike from "../../public/images/indexBody/nike.png";
import gucci from "../../public/images/indexBody/gucci.png";

import s1 from "../../public/images/indexBody/s1.jpg";
import s2 from "../../public/images/indexBody/s2.jpg";
import s3 from "../../public/images/indexBody/s3.jpg";

import c1 from "../../public/images/indexBody/c1.jpg";
import c2 from "../../public/images/indexBody/c2.jpg";
import c3 from "../../public/images/indexBody/c3.jpg";

export default class IndexBody extends Component {
  render() {
    return (
      <div>
        <div
          id="carouselExampleFade"
          class="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src={c1} alt="First slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src={c2} alt="Second slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src={c3} alt="Third slide" />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleFade"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleFade"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <div class="container">
          <div class="newDivider text-center">
            <h1 class="ThemeText">
            “ Dress impeccably for every occasion ! ”
            </h1>
          </div>

          <div class="newDivider">
            <div class="row">
              <div class="col-md-8 slideanim">
                <a href="/">
                  <img class="col-md-12" src={s1} />
                </a>
              </div>

              <div class="col-md-4 justify-content-center align-self-center ">
                <h2 class="text-center text-muted"> Formal</h2>
                <div class="text-center">
                <Link class="btn ThemeBackground" role="button" to="/shop" >Shop now</Link>
                </div>
              </div>
            </div>
          </div>

          <div class="newDivider">
            <div class="row">
              <div class="col-sm-4 justify-content-center align-self-center order-3">
                <h2 class="text-center text-muted"> Casual</h2>
                <div class="text-center">
                  <Link class="btn ThemeBackground" role="button" to="/shop" >Shop now</Link>
                 </div>
              </div>

              <div class="col-md-8 order-2 order-md-12 slideanim">
                <a href="/">
                  <img class="col-md-12" src={s2} />
                </a>
              </div>
            </div>
          </div>

          <div class="newDivider">
            <div class="row">
              <div class="col-md-8 slideanim">
                <a href="/">
                  <img class="col-md-12" src={s3} />
                </a>
              </div>

              <div class="col-sm-4 justify-content-center align-self-center ">
                <h2 class="text-center text-muted"> Jeans</h2>
                <div class="text-center">
                <Link class="btn ThemeBackground" role="button" to="/shop" >Shop now</Link>
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
            <h1 class="ThemeText">About us</h1>
          </div>

          <div class="newDivider text-muted slideanim">
            <h5>
              Welcome to amico fashion store , your number one source for all things in women
              clothing. We are dedicated to giving you the very best clothes with a focus on
              uniqueness , customer service and fine materials. Now we serve customers all over 
              the Sri Lanka and Italy . We are thrilled to be a part of fair trade wing of Sri Lankan 
              fashion industry.
              <br></br>
              We hope you enjoy our products as much as we enjoy offering them to you.If you have any 
              questions or comments please don't hesitate to contact us.

            </h5>
          </div>
        </div>
      </div>
    );
  }
}
