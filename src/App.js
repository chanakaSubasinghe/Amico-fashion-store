import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js'

//importing components
import Navbar from './components/navbar';
import Footer from './components/footer';
import IndexBody from './components/indexBody'
function App() {
	return (
		<Router>
			<Navbar />

			<Route path="/" exact component={IndexBody} />

			<Footer />
		</Router>
	);
}

export default App;
