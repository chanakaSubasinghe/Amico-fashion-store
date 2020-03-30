import React , {Component} from 'react' ;
import {Link} from 'react-router-dom';
import axios from 'axios';


//inputs
const Item = props => (
   
    <div class="card-deck col-md-4 my-3">
        <div class="card h-100">
            <img class="card-img-top" src="https://helpfulsheep.com/2017-07-25-google-adsense-ad-sizes/250x250.png" />
            <div class="card-body">
                <h5 class="card-title">{props.item.itemName}</h5>
                <p><i class="fa fa-star"></i> {props.item.averageRate}.0</p>
                <div class="float-right">
                    <h5 class="card-text text-primary"><del class="mr-3"><small>Rs.{props.item.price}.00</small></del>Rs.{props.item.price}.00</h5>
                </div>
            </div>
            <div class="card-footer">
                <div class="inline">
                    <Link><i class="fa fa-heart"></i></Link>
                    <Link><i class="fa fa-shopping-cart ml-3"></i></Link>
                    <div class="float-right">
                        <button class="btn ThemeBackground">Buy Now</button>
                    </div>
                </div>
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
                        <a class="nav-link dropdown-toggle ThemeText" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">filter by category</a>
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