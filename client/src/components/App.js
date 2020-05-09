import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// importing bootstrap, bootstrap js, jquery
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js";

// importing font-awesome
import "font-awesome/css/font-awesome.min.css";

// import css for all components
import "../public/css/style.css";

//importing components -----

// partials
import NavBar from "./partials/navBar";
import Footer from "./partials/footer";
import IndexBody from "./partials/indexBody";
import Shop from "./partials/shop";
import PageNotFound from "./partials/404";
import PreviewItem from "./partials/preview-item";

// admin
import AdminPanel from "./admin/adminPanel";

// store Manager
import StoreManagerPanel from "./storeManager/storeManagerPanel";
import EditItem from "./storeManager/edit-item";

// user
import LoginForm from "./user/login";
import RegisterForm from "./user/register";
import UserProfile from "./user/user-profile";

// private routes
import AdminRoute from "../auth/adminRoute";
import StoreManagerRoute from "../auth/storeManagerRoute";
import UserRoute from "../auth/userRoute";
import PrivateRoute from "../auth/privateRoute";

//feedback
import Comment from "./feedbacks/comment";
import BoughtItems from "./feedbacks/boughtItemList";

class App extends Component {
  // constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={IndexBody} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/items/:id" component={PreviewItem} />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/register" render={() => <RegisterForm />} />
          <PrivateRoute
            exact
            path="/users/me/"
            component={() => <UserProfile />}
          />

          <AdminRoute exact path="/adminPanel" component={AdminPanel} />

          <StoreManagerRoute
            exact
            path="/storeManagerPanel"
            component={StoreManagerPanel}
          />
          <StoreManagerRoute
            exact
            path="/items/edit/:id"
            component={EditItem}
          />

          <Route exact path="/comments/:id" component={Comment} />
          <Route exact path="/boughtItems" component={BoughtItems} />

          <Route exact path="*" component={PageNotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
