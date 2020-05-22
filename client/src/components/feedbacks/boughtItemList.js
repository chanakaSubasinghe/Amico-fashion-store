import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import '../../public/css/style.css'

const Item = props => (
            <tbody>
                <tr>
                <td class="w-25">
                    <img src= {`/items/${props.item._id}/itemPhoto`} class="img-fluid img-thumbnail" alt=""/>
                </td>
                <td>{props.item.itemName}</td>
                <td>Pending</td>
                <td><div><Link class = "btn" to={"/items/" + props.item._id}><i class="fa fa-info"></i></Link></div>
                <div> <Link class = "btn btn-outline-dark" to={"/comments/" + props.item._id}><i class="fa fa-star"> Feedback</i></Link></div>
                    <button class="btn"> <i class="fa fa-copy"></i>Open Dispute</button></td>
                </tr>
            </tbody>
)



export default class BoughtItems extends Component{

    constructor(props) {
        super(props);

        // declaring this state
        this.state = { 
            items : []
        };
    }
    componentDidMount(){

        // get items from server
        axios.get('/items/')
            .then(response => {
               this.setState({
                   items: response.data
               })
            })
            .catch((error) => {
                console.log(error);
            })
    }
        ItemList() {
            return this.state.items.map(currentItem => {
                return <Item item={currentItem} key={currentItem.id} />
            })
        }


    render(){
        return(
            <div class="jumbotron">
                <div class= "container text-center" >
                        <h2>My Orders</h2>
                </div>
                <div>
                <div class="col-12 jumbotron">
                    <table class="table table-image text-center">
                    <thead>
                        <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">order Status</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>

                        {this.ItemList()}

                    </table>
                        </div>
                    </div>
                </div>

        )
        }
    }