import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios'

// importing bootstrap, bootstrap js, jquery
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js'

// import css for all components
import './public/css/style.css'

//importing components
import Navbar from './components/navbar';
import Footer from './components/footer';
import IndexBody from './components/indexBody'
import AdminPanel from './components/adminPanel'
import CustomerLogin from './components/customer-login'
import CustomerRegister from './components/customer-register'
import AdminLogin from './components/admin-login'
import StoreManagerLogin from './components/storeManager-login'
import EditCategory from './components/edit-category'

class App extends Component {

	constructor() {
		super()

		// declaring this state

		this.state = {
		  loggedIn: false,
		  username: null
		}
	
		// binding functions
		this.getUser = this.getUser.bind(this)
		this.updateUser = this.updateUser.bind(this)
	}
	
	// call get user method before load the pages
	componentDidMount() {
		this.getUser()
	}

	// update method for update this state
	updateUser (userObject) {
	this.setState(userObject)
	}

	// send request to server to check whether is there ant current user logged in or not
	getUser() {

		// send request
		axios.get('/current').then(res => {

		// condition
		if (res.data.user) {
			console.log('Get User: There is a user saved in the server session: ')

			// update this state
			this.setState({
			loggedIn: true,
			username: res.data.user.username
			})

		} else {

			console.log('Get user: no user');

			// update this state
			this.setState({
			loggedIn: false,
			username: null
			})
		}
		})
	  }

	render(){
		return (

			<div>
				<Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} username={this.state.username} />
	
				<Route path="/" exact component={IndexBody} />
				<Route path="/adminPanel" exact component={AdminPanel} />
				<Route path="/login" render={() => <CustomerLogin updateUser={this.updateUser} />} />
				<Route path="/register" exact component={CustomerRegister} />
				<Route path="/adminLogin" exact component={AdminLogin} />
				<Route path="/storeManagerLogin" exact component={StoreManagerLogin} />
				<Route path="/itemCategories/edit/:id" exact component={EditCategory} />
			
				<Footer />
			</div>
		);
	}
}

export default App;
