import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//inputs for the table

const Item = props => (
    <tr>
        <td><img class="card-img-top" src={`/items/${props.item._id}/itemPhoto`} style={{width: "100px"}} /></td>
        <td>{props.item.totalPrice}</td>
        <td>{props.item.discountedPrice}</td>
        <td>{props.item.averageRate}</td>        
        <td>
            <div class="row">
            <Link class="btn btn-info btn-sm mr-1" to={"items/edit/" + props.item._id}>edit</Link> <Link class="btn btn-danger btn-sm" to="#" onClick={() => {props.deleteItem(props.item._id)}}>delete</Link>
            </div>
        </td>    
    </tr>
)


export default class ItemList extends Component {


    //constructor
    constructor (props) {
        super(props);

        // binding functions
        this.deleteItem = this.deleteItem.bind(this);
        this.state = { items: []};
    }

    //list all categories
    componentDidMount(){
      
        // request to server to get items
        axios.get('/items/')
            .then(response => {
                this.setState({ 
                    items: response.data
                })
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //delete categories
    deleteItem(id){

        // request to server to delete specific item
        axios.delete('/items/' + id)
            .then(res => console.log(res.data));

        // set state
        this.setState({
            items: this.state.items.filter(el => el._id !== id)
        })
    }

    //map to the list
    ItemList(){
        return this.state.items.map(currentItem => {
            return <Item item={currentItem} deleteItem={this.deleteItem} key={currentItem._id}/>
        })
    }

    render() {
        return(
            <div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Total</th>
                        <th scope="col">Dis/price</th>
                        <th scope="col">A/rate</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.ItemList()}
                    </tbody>
                </table>
            </div>
        )
    }
}