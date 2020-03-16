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

function App() {
	return (
		<Router>
			<Navbar />

			<Route path="/" exact component={IndexBody} />
			<Route path="/adminPanel" exact component={AdminPanel} />

			<Footer />
		</Router>
	);
}

export default App;
