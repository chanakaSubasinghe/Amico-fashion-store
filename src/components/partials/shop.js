import React , {Component} from 'react' ;
import {Link} from 'react-router-dom';
import axios from 'axios';


// item - functional component
const Item = props => (
   
    <div class="card-deck col-md-4 my-3">
        <div class="card h-100">
        <img class="card-img-top" src={`/items/${props.item._id}/itemPhoto`} alt="" />
            <div class="card-body">
                <div class="text-center">
                    <a href="#" class="text-decoration-none">view item</a>
                </div>
                <h5 class="card-title">{props.item.itemName}</h5>
                <p><i class="fa fa-star"></i>{props.item.averageRate}</p>            
                {props.item.discountedPrice < props.item.totalPrice 
                &&
                    <div class="float-right">
                        <del class="card-text text-dark">Rs.{props.item.totalPrice}.00</del>
                        <h5 class="card-text text-primary">Rs.{props.item.discountedPrice}.00</h5>
                    </div>    
                || 
                    <div class="float-right">     
                        <br />            
                        <h5 class="card-text text-primary">Rs.{props.item.discountedPrice}.00</h5>
                    </div> 
                }                                                
            </div>     
            <div class="card-footer">
                <div class="inline">
                    <Link><i class="fa fa-heart heart-Icon"></i></Link>
                    <Link><i class="fa fa-shopping-cart shopping-cart-Icon ml-3"></i></Link>
                    <div class="float-right">
                        <button class="btn ThemeBackground">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>                           
)

const Category = (props) => (
    <Link class="dropdown-item" to="#">{props.category.categoryName}</Link>
)

export default class Shop extends Component {

    //constructor
    constructor(props) {
        super(props);

        // declaring this state
        this.state = { 
            items : [],
            categories: []
        };
    }

    //list all categories
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

        // get categories from server
        axios.get('/itemCategories')
            .then(response => {
                this.setState({
                    categories: response.data
                })
                console.log(response.data)
            })
            .catch(err => console.log(err))    
    }

    //map to list items
    ItemList() {
        return this.state.items.map(currentItem => {
            return <Item item={currentItem} key={currentItem.id} />
        })
    }

    // map to list category
    CategoryList() {
        return this.state.categories.map(currentCategory => {
            return <Category category={currentCategory} key={currentCategory._id} />
        })
    }

    render() {
        return (
                <div className="container margin-top">
                    <ul className="nav justify-content-end">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle ThemeText" data-toggle="dropdown" href="#"
                               role="button" aria-haspopup="true" aria-expanded="false">filter by category</a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <Link class="dropdown-item" to="/items">All</Link>
                                {this.CategoryList()}
                            </div>
                        </li>
                    </ul>

                    <div className="my-5 row">
                        {this.ItemList()}
                    </div>


                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className="page-item"><Link class="page-link ThemeText" href="#">First</Link></li>
                            <li className="page-item"><Link class="page-link ThemeText" href="#">Previous</Link></li>
                            <li className="page-item"><Link class="page-link ThemeText" href="#">Next</Link></li>
                            <li className="page-item"><Link class="page-link ThemeText" href="#">Last</Link></li>
                        </ul>
                    </nav>

                </div>
        )
    }
}