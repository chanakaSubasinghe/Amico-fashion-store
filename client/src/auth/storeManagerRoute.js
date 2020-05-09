import React from "react";
import {Route,Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';

const StoreManagerRoute=({component: Component,...rest})=>(
    <Route {...rest} render={
        props => isAuthenticated() && isAuthenticated().user.role === 'storeManager' ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login',state:{from:props.location}}} />
        )
     } 
    />
);

export default StoreManagerRoute;