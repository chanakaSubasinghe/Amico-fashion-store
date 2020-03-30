import React , {Component} from 'react' ;
import {Link} from 'react-router-dom';
import axios from 'axios';


//inputs
const Item = props => (
   
    <div class="card-deck col-lg-4 my-3">
        <div class="card">
            <img class="card-img-top" src="https://cdn.shopify.com/s/files/1/0997/6502/files/30_4217_1024x1024.jpg?v=1512729140" alt="Card image cap" />
            <div class="card-body">
                <h5 class="card-title">{props.item.itemName}</h5>
                <h4 class="float-right text-danger">{props.item.discount}% off</h4>
                <h5 class="card-text text-primary">Rs.{props.item.price}.00</h5>
                <br />
                <p class="float-right">Average Rate:{props.item.averageRate}</p>
            </div>
            <div class="card-footer">
                <button class="btn ThemeBackground btn-block">Buy Now</button>
                    {/* <div class="float-right">
                        <button class="btn btn-info btn-sm m-1">edit</button>
                        <button class="btn btn-danger - btn-sm m-1">delete</button>
                    </div> */}
            </div>
        </div>
    </div>  
       
                   
)


export default class Shop extends Component {

    //constructor
    constructor(props) {
        super(props);

        this.state = { 
            items : []
        };
    }

    //list all categories
    componentDidMount(){

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

    //map to list
    ItemList() {
        return this.state.items.map(currentItem => {
            return <Item item={currentItem} key={currentItem.id} />
        })
    }

    render() {
        return (

            <div class="container margin-top">
                <ul class="nav justify-content-end">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle ThemeText" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Categories</a>
                        <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="#">All</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        </div>
                    </li>
                </ul>

                <div class="my-5 row">
                    {this.ItemList()}                           
                </div>


                <nav>
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link ThemeText" href="#">First</a></li>
                        <li class="page-item"><a class="page-link ThemeText" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link ThemeText" href="#">Next</a></li>
                        <li class="page-item"><a class="page-link ThemeText" href="#">Last</a></li>
                    </ul>
                </nav>

            </div>

        )
    }
}