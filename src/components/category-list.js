import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//inputs for the table

const Category = props => (
    <tr>
        <td>{props.category.categoryName}</td>
        <td><Link to={"itemCategories/edit/" + props.category._id}>edit</Link> | <Link to="#" onClick={() => {props.deleteCategory(props.category._id)}}>delete </Link></td>
    </tr>
)


export default class CategoryList extends Component {


    //constructor
    constructor (props) {
        super(props);

        this.deleteCategory = this.deleteCategory.bind(this);
        this.state = { categories: []}
    }

    //list all categories
    componentDidMount(){
      
        axios.get('/itemCategories/')
            .then(response => {
                this.setState({ categories: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //delete categories
    deleteCategory(id){
        axios.delete('/itemCategories/' + id)
            .then(res => console.log(res.data));

        this.setState({
            categories: this.state.categories.filter(el => el._id !== id)
        })
    }

    //map to the list
    CategoryList(){
        return this.state.categories.map(currentcategory => {
            return <Category category={currentcategory} deleteCategory={this.deleteCategory} key={currentcategory._id}/>
        })
    }



    render() {
        return(
            <div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Category Name</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.CategoryList()}
                    </tbody>
                </table>
            </div>
        )
    }
}