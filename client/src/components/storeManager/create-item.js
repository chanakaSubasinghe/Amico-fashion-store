import React, { Component } from 'react';
import axios from 'axios';

export default class CreateItem extends Component {

    // constructor
    constructor(props) {
        super(props);

        // binding functions
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.itemPhoto = this.itemPhoto.bind(this)

        // declaring this state
        this.state = {
            itemPhoto: null,
            itemName: '',
            category: '',
            discount: '',
            totalPrice: '',
            success: '',
            error: '',
            categories: []
        }
    }

    componentDidMount() {

        // get item categories from server
        axios.get('/itemCategories/')
            .then(response => {
                if (response.data.length > 0) {
                    // set state
                    this.setState({
                        categories: response.data.map(category => category)
                    })
                }
            }
            )
    }

    //handleChange
    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    itemPhoto(e) {
        console.log(e.target.files[0])
        this.setState({
            itemPhoto: e.target.files[0],
            image: URL.createObjectURL(e.target.files[0])

        })
    }


    //button submit
    onSubmit(e) {
        console.log(this.state.itemPhoto)

        e.preventDefault();

        const { itemPhoto, itemName, category, discount, totalPrice } = this.state

        const formData = new FormData();

        formData.append('itemPhoto', itemPhoto)
        formData.append('itemName', itemName)
        formData.append('category', category)
        formData.append('discount', discount)
        formData.append('totalPrice', totalPrice)

        // request to server to create an item 
        axios.post('/items/', formData)
            .then(res => {
                if (res.status === 201) {

                    this.setState({
                        success: 'Item uploaded successfully!',
                        itemPhoto: null,
                        itemName: '',
                        category: '',
                        discount: '',
                        totalPrice: '',
                        error: '',
                    })
                }

                window.location = '/storeManagerPanel'
            })
            .catch(err => {
                if (err.response.data) {
                    this.setState({
                        error: err.response.data.error,
                        itemPhoto: null,
                        itemName: '',
                        discount: '',
                        totalPrice: '',
                        success: ''
                    })
                }
            })
    }



    //page view
    render() {

        return (
            <div>
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Note!</h4>
                    <ul>
                        <li>maximum size of an item photo is 1 MB</li>
                        <li>Discount is optional</li>
                    </ul>
                </div>
                <img id="target" src={this.state.image} style={{ width: "15%", marginLeft: "38%" }} />


                {this.state.success &&
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <p>{this.state.success}</p>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }

                {this.state.error &&
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <p>{this.state.error}</p>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }

                <form onSubmit={this.onSubmit}>



                    <label>Item Photo</label>

                    <div class="custom-file">

                        <input type="file" class="custom-file-input" name="itemPhoto" onChange={this.itemPhoto} required />
                        <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>

                        <br />
                        <br />
                    </div>




                    <div class="form-group">
                        <label>Item Name</label>
                        <input type="text" class="form-control" name="itemName" value={this.state.itemName} onChange={this.handleChange} required />
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Category</label>
                        <select class="form-control"
                            name="category"
                            onChange={this.handleChange}
                            required>
                            <option value="">select category</option>
                            {this.state.categories &&
                                this.state.categories.map(function (category, key) {
                                    return <option key={key} value={category._id}>
                                        {category.categoryName}
                                    </option>
                                })
                            }
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Discount %</label>
                        <input type="number" class="form-control" name="discount" value={this.state.discount} onChange={this.handleChange} min="1" max="99" />
                    </div>

                    <div class="form-group">
                        <label>Price Rs.</label>
                        <input type="text" class="form-control" name="totalPrice" value={this.state.totalPrice} onChange={this.handleChange} required />
                    </div>

                    <div class="text-center">
                        <button type="submit" class="btn btn-dark">create item</button>
                    </div>
                </form>
            </div>
        )
    }
}