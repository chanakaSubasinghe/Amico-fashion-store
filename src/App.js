import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

function App() {
	return (
		<Router>
			<Navbar />

			<Route path="/" exact component={IndexBody} />
			<Route path="/adminPanel" exact component={AdminPanel} />
			<Route path="/login" exact component={CustomerLogin} />
			<Route path="/register" exact component={CustomerRegister} />
			<Route path="/adminLogin" exact component={AdminLogin} />
			<Route path="/storeManagerLogin" exact component={StoreManagerLogin} />

			<Footer />
		</Router>
	);
}

export default App;
