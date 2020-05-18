import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//inputs for the table

const Category = props => (
    <tr>
        <td>{props.category.categoryName}</td>
        <td><Link to="#" class="btn btn-danger btn-sm" onClick={() => { props.deleteCategory(props.category._id) }}>delete </Link></td>
    </tr>
)


export default class CategoryList extends Component {


    //constructor
    constructor(props) {
        super(props);

        this.deleteCategory = this.deleteCategory.bind(this);
        this.state = { categories: [], loading: false }
    }

    //list all categories
    componentDidMount() {
        // set state
        this.setState({
            loading: true
        })

        // send request to server
        axios.get('/itemCategories/')
            .then(response => {
                this.setState({ categories: response.data, loading: false })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //delete categories
    deleteCategory(id) {
        // set state
        this.setState({
            loading: true
        })

        axios.delete('/itemCategories/' + id)
            .then(res => console.log(res.data));

        this.setState({
            categories: this.state.categories.filter(el => el._id !== id),
            loading: false
        })
    }

    //map to the list
    CategoryList() {
        return this.state.categories.map(currentcategory => {
            return <Category category={currentcategory} deleteCategory={this.deleteCategory} key={currentcategory._id} />
        })
    }



    render() {

        // condition
        if (this.state.loading) {
            return (
                <div class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>)
        } else {

            return (
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
}