import React, {Component} from 'react';
import axios from 'axios';

export default class CreateItem extends Component {
    
    // constructor
    constructor(props){
        super(props);

        // binding functions
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // declaring this state
        this.state = {
            itemPhoto:'',
            itemName : '',
            category: '',
            discount : '',
            totalPrice : '',
            categories: []
        }
    }

    componentDidMount(){

        // get item categories from server
        axios.get('/itemCategories/')
            .then(response => {
                    if(response.data.length > 0){
                        // set state
                        this.setState({
                            categories : response.data.map(category => category)
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

        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }


   //button submit
   onSubmit(e){
       e.preventDefault();

       // create item object
       const item = {
            itemPhoto:this.state.itemPhoto,
            itemName:this.state.itemName,
            category: this.state.category,
            discount : this.state.discount,
            totalPrice : this.state.totalPrice          
         }
       
       // request to server to create an item 
       axios.post('/items/', item)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        // redirect
        window.location = '/storeManagerPanel'
    }



   //page view
    render(){

        return(
            <div>
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Note!</h4>
                    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                </div>

                <form onSubmit={this.onSubmit}>

               

                    <label>Item Photo</label>

                    <div class="custom-file">                    
                        <input type="file" class="custom-file-input" name="itemPhoto" onChange={this.handleChange} required />
                        <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                        <br/>
                        <br/>
                    </div>


                    <div class="form-group">
                        <label>Item Name</label>
                        <input type="text" class="form-control" name="itemName" value={this.state.itemName} onChange={this.handleChange}  required />
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Category</label>
                        <select class="form-control" 
                                name="category"
                                onChange={this.handleChange}                            
                                required>
                                    <option value="">select category</option>
                                   {this.state.categories &&
                                       this.state.categories.map(function(category,key){
                                            return <option key={key} value={category._id}>
                                                    {category.categoryName}
                                                    </option>
                                       })
                                   }
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Discount %</label>
                        <input type="number" class="form-control" name="discount" value={this.state.discount} onChange={this.handleChange} min="1" max="99"   />
                    </div>

                    <div class="form-group">
                        <label>Price Rs.</label>
                        <input type="text" class="form-control" name="totalPrice" value={this.state.price} onChange={this.handleChange}  required />
                    </div>

                     <div class="text-center">
                        <button type="submit" class="btn btn-dark">create item</button>
                    </div>
                </form>
            </div> 
        )
    }
}