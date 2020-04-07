import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios'

// importing bootstrap, bootstrap js, jquery
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js'

// importing font-awesome 
import 'font-awesome/css/font-awesome.min.css'

// import css for all components
import './public/css/style.css'

//importing components -----

// partials
import NavBar from './components/partials/navBar';
import Footer from './components/partials/footer';
import IndexBody from './components/partials/indexBody'
import Shop from "./components/partials/shop";

// admin
import AdminPanel from './components/admin/adminPanel'
import AdminLogin from './components/admin/admin-login'

// store Manager
import StoreManagerLogin from './components/storeManager/storeManager-login'
import StoreManagerPanel from './components/storeManager/storeManagerPanel'
import EditItem from './components/storeManager/edit-item'

// user
import LoginForm from './components/user/login'
import RegisterForm from './components/user/register'
import UserProfile from "./components/user/user-profile";


class App extends Component {

	// constructor
	constructor(props) {
		super(props)
	
	}
	


	render(){
		return (

			<div>
				<NavBar />
					<Switch> 	
						<Route exact path="/" component={IndexBody} />
						<Route exact path="/items" component={Shop} />			
						<Route exact path="/login" render={() => <LoginForm />} />
						<Route exact path="/register" render={() => <RegisterForm />} />
						<Route exact path="/users/me/" component={() => <UserProfile />} />

						<Route exact path="/adminPanel" component={AdminPanel} />
						<Route exact path="/adminLogin" component={AdminLogin} />

						<Route exact path="/storeManagerLogin" component={StoreManagerLogin} />
						<Route exact path="/storeManagerPanel" component={StoreManagerPanel} />
						<Route exact path="/items/edit/:id" component={EditItem} />

						<Route exact path="*" render={() => <h1>404 page</h1>} />
					</Switch>
				<Footer />
			</div>
		);
	}
}

export default App;
