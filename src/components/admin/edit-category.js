import React, {Component} from 'react'
import axios from 'axios';



export default class EditCategory extends Component {

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            categoryName : '', 
        }
    }

    componentDidMount(){
        axios.get('/itemCategories/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data)
                this.setState({
                    categoryName:response.data.categoryName,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
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

       const category = {
                categoryName:this.state.categoryName,
       }
       
       axios.patch('/itemCategories/' + this.props.match.params.id, category)
            .then(res => console.log(res.data));

         window.location = '/adminPanel'
    }


    render(){

        return(
            <div>
            <div class="container margin-top">
               <h3 class="text-center ThemeText">Edit Category</h3>
               <br/>
               <div class="row">
                   <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                       <form onSubmit={this.onSubmit}>

                        <label>Category Name</label>
                        <div class="input-group mb-2 mr-sm-2">
                            <input type="text" class="form-control" name="categoryName" value={this.state.categoryName} onChange={this.handleChange} required/>
                        </div>

                        <br />
                        <button type="submit" class="btn ThemeBackground btn-block">Update Category</button>

                       </form>       
                   </div>
               </div>
           </div>
       </div>
        )
    }
}