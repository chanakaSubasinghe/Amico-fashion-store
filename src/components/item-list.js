import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//inputs for the table

const Item = props => (
    <tr>
        <td>{props.item.itemName}</td>
        <td>{props.item.category}</td>
        <td>{props.item.discount}</td>
        <td>{props.item.price}</td>
        <td>{props.item.averageRate}</td>
        

        <td><Link to={"items/edit/" + props.item._id}>edit</Link> | <a href="#" onClick={() => {props.deleteItem(props.item._id)}}>delete </a></td>
    </tr>
)


export default class ItemList extends Component {


    //constructor
    constructor (props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);
        this.state = { items: []};
    }

    //list all categories
    componentDidMount(){
      
        axios.get('/items/')
            .then(response => {
                this.setState({ items: response.data})
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //delete categories
    deleteItem(id){

        axios.delete('/items/' + id)
            .then(res => console.log(res.data));

        this.setState({
            items: this.state.items.filter(el => el._id !== id)
        })
    }

    //map to the list
    ItemList(){
        return this.state.items.map(currentitem => {
            return <Item item={currentitem} deleteItem={this.deleteItem} key={currentitem._id}/>
        })
    }



    render() {
        return(
            <div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Item Name</th>
                        <th scope="col">category</th>
                        <th scope="col">discount</th>
                        <th scope="col">price</th>
                        <th scope="col">average rate</th>
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