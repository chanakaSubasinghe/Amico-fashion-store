import React, {Component} from 'react';
import { Route } from 'react-router-dom';
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

//importing components

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

		// declaring this state
		this.state = {
			loggedIn: false,
			user: {}
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
		axios.get('/users/me', 
			{headers: 
				{
					Authorization: `Bearer ${localStorage.getItem('JWT_Token')}`
				}
			})
			.then(res => {
			console.log(res.data)
			// // condition
			if (res.data) {

				// set state
				this.setState({
					loggedIn: true,
					user: res.data
				})

			} else {
				// set state
				this.setState({
					loggedIn: false,
					user: {}
				})
			}
		}).catch(err => {
			console.log(err.response)
			// set state
			this.setState({
				loggedIn: false,
				user: {}
			})
		})
	}

	// update method for update this state
	updateUser (userObject) {
		this.setState(userObject)
	}

	render(){
		return (

			<div>
				 <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} user={this.state.user} />

				<Route path="/" exact component={IndexBody} />
				<Route path="/items" exact component={Shop} />			
				<Route path="/login" render={() => <LoginForm updateUser={this.updateUser} />} />
				<Route path="/register" render={() => <RegisterForm updateUser={this.updateUser} />} />
				<Route path="/users/me/" component={() => <UserProfile user={this.state.user} />} />

				<Route path="/adminPanel" exact component={AdminPanel} />
				<Route path="/adminLogin" exact component={AdminLogin} />

				<Route path="/storeManagerLogin" exact component={StoreManagerLogin} />
				<Route path="/storeManagerPanel" exact component={StoreManagerPanel} />
				<Route path="/items/edit/:id" exact component={EditItem} />

				<Footer />
			</div>
		);
	}
}

export default App;
