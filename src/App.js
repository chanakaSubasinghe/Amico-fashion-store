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
import StoreManagerPanel from './components/storeManagerPanel'
import EditItem from './components/edit-item'
import UserProfile from "./components/user-profile";

class App extends Component {

	constructor(props) {
		super(props)

		// declaring this state

		this.state = {
			loggedIn: false,
			user: {
				id: '',
				firstName: '',
				lastName: '',
				username: '',
				email: ''
			}
		}
	
		// binding functions
		this.componentDidMount = this.componentDidMount.bind(this)
		this.getUser = this.getUser.bind(this)
		this.updateUser = this.updateUser.bind(this)
	}
	
	// call get user method before load the pages
	componentDidMount() {
		this.getUser()
	}

	// send request to server to check whether is there ant current user logged in or not
	getUser() {
		axios.get('/current').then(res => {

			if (res.data.user) {

				this.setState({
					loggedIn: true,
					user: {
						id: res.data.user._id,
						firstName: res.data.user.firstName,
						lastName: res.data.user.lastName,
						username: res.data.user.username,
						email: res.data.user.email
					}
				})

			} else {

				this.setState({
					loggedIn: false,
					user: {
						id: '',
						firstName: '',
						lastName: '',
						username: '',
						email: ''
					}
				})
			}
		})
	}

	// update method for update this state
	updateUser (userObject) {
	this.setState(userObject)
	}


	render(){
		return (

			<div>
				<Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} user={this.state.user} />

				<Route path="/" exact component={IndexBody} />
				<Route path="/adminPanel" exact component={AdminPanel} />
				<Route path="/login" render={() => <CustomerLogin updateUser={this.updateUser} />} />
				<Route path="/register" render={() => <CustomerRegister updateUser={this.updateUser} />} />
				<Route path="/adminLogin" exact component={AdminLogin} />
				<Route path="/storeManagerLogin" exact component={StoreManagerLogin} />
				<Route path="/itemCategories/edit/:id" exact component={EditCategory} />
				<Route path="/storeManagerPanel" exact component={StoreManagerPanel} />
				<Route path="/items/edit/:id" exact component={EditItem} />
			
				<Route path="/users/profile/" component={() => <UserProfile user={this.state.user} />} />

				<Footer />
			</div>
		);
	}
}

export default App;
