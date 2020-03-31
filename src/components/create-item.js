import React, {Component} from 'react';
import axios from 'axios';

export default class CreateItem extends Component {
    
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            itemName : '',
            category : '',
            discount : 0,
            price : 100.00,
            categories: []
        }
    }

    componentDidMount(){
        axios.get('/itemCategories/')
            .then(response => {
                    if(response.data.length > 0){
                        this.setState({
                            categories : response.data.map(category => category.categoryName),
                            category : response.data[0].categoryName
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


   //button submit
   onSubmit(e){
       e.preventDefault();

       const item = {
            itemName:this.state.itemName,
            category: this.state.category,
            discount : this.state.discount,
            price : this.state.price           
         }
       

       axios.post('/items/', item)
            .then(res => console.log(res.data));

         this.setState({
            itemName : '',
            category : '',            
            discount : '',
            price : ''
         })

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

                    <div class="form-group">
                        <label>Item Name</label>
                        <input type="text" class="form-control" name="itemName" value={this.state.itemName} onChange={this.handleChange}  required />
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Category</label>
                        <select class="form-control" 
                                name="category"
                                value={this.state.category}
                                onChange={this.handleChange}
                                required>
                                   {
                                       this.state.categories.map(function(category){
                                           return <option
                                                        key ={category}
                                                        value = {category} > {category}
                                                  </option>;
                                       })
                                   }
                        </select>
                    </div>

                    
                    

                    <div class="form-group">
                        <label>Discount %</label>
                        <input type="number" class="form-control" name="discount" value={this.state.discount} onChange={this.handleChange} min="1" max="99"   />
                    </div>

                    <div class="form-group">
                        <label>Price</label>
                        <input type="text" class="form-control" name="price" value={this.state.price} onChange={this.handleChange}  required />
                    </div>

                     <div class="text-center">
                        <button type="submit" class="btn btn-dark">create item</button>
                    </div>
                </form>
            </div> 
        )
    }
}