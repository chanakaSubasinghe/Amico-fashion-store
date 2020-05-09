import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

// importing custom css and javascript
import "../../public/css/navbar.css";
import collapseFunction from "../../public/js/navbar.js";

// importing images for navbar
import amico from "../../public/images/navbar/amico.png";
import phone from "../../public/images/navbar/phone-alt-solid.png";
import instagram from "../../public/images/navbar/instagram-brands.png";
import shoppingVan from "../../public/images/navbar/shipping-fast-solid.png";

import { isAuthenticated, logout } from "../../auth/index";

export default class NavBar extends Component {
  // constructor
  constructor(props) {
    super(props);

    this.state = {
      userObj: isAuthenticated(),
    };
    // binding functions
    this.logout = this.logout.bind(this);
  }

  // logout function
  logout(e) {
    e.preventDefault();

    logout(this.state.userObj, () => {
      return (window.location = "/");
    });
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-dark bg-dark">
          <div class=" container row">
            <small class="text-white">
              <img src={phone} class="nav-icons" /> +94112345678
            </small>
            <small class="text-white">
              <img src={shoppingVan} class="nav-icons" /> free delivery on
              island wide
            </small>
            <small class="text-white">
              <Link to="http://www.instagram.com">
                <img src={instagram} class="nav-icons" />
              </Link>{" "}
              follow us
            </small>
          </div>
        </nav>

        <nav class="navbar navbar-expand-lg navbar-dark" id="main-header">
          <div class="container">
            <Link class="navbar-brand" to="/">
              <img class="mx-auto d-block" id="amico-brand" src={amico} />
            </Link>
            <div
              class="collapse navbar-collapse justify-content-center"
              id="navbarSupportedContent"
            >
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link class="nav-link active" to="/shop">
                    Shop our products
                  </Link>
                </li>
              </ul>
            </div>
            {this.state.userObj ? (
              <div class="row hideWithCollapse">
                {this.state.userObj.user.role === "user" && (
                  <div class="d-inline m-2">
                    <Link class="m-2">
                      <i class="fa fa-heart NavBar-heart-Icon"></i>
                      <span class="badge badge-light">
                        <small>10</small>
                      </span>
                    </Link>
                    <Link>
                      <i class="fa fa-shopping-cart NavBar-shopping-cart-Icon"></i>
                      <span class="badge badge-light">
                        <small>10</small>
                      </span>
                    </Link>
                  </div>
                )}

                <div class="d-inline dropdown nav-link">
                  <Link
                    class="dropdown-toggle text-light"
                    style={{ color: "white", textDecoration: "none" }}
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Signed In As {this.state.userObj.user.firstName}
                  </Link>

                  <div
                    class="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link class="dropdown-item" to="/users/me">
                      Profile
                    </Link>
                    {this.state.userObj.user.role === "admin" && (
                      <Link class="dropdown-item" to="/adminPanel">
                        Settings
                      </Link>
                    )}
                    {this.state.userObj.user.role === "storeManager" && (
                      <Link class="dropdown-item" to="/storeManagerPanel">
                        Settings
                      </Link>
                    )}
                    <div class="dropdown-divider"></div>
                    <Link class="dropdown-item" to="#" onClick={this.logout}>
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div class="d-inline">
                <Link
                  to="/login"
                  class="hideWithCollapse"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Login | Join
                </Link>
              </div>
            )}

            <button
              className="navbar-toggler"
              onClick={collapseFunction}
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>
    );
  }
}
