import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import '../../public/css/style.css'

export default class Comment extends Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // this state
        this.state = {
            itemName : '',
            comment :'',
            success: '',
            error: '',
            itemid:''
        }
    }

    componentDidMount(){

        // request to server to get details about provided item
        axios.get('/items/' + this.props.match.params.id)
            .then(response => {
                // set state
                this.setState({
                    itemName:response.data.itemName
                })
            })
            .catch(function (error) {
                console.log(error)
            })

    }
    handleChange(e) {

        this.setState({
            comment: e.target.value
        })
    }
    //button submit
   onSubmit(e){

    const formData = {
        comment: this.state.comment,
        itemid:this.props.match.params.id,
    }


    // request to server to create an comment
    axios.post('/comment/',formData)
         .then(res => {
             if (res.status === 201) {

                 this.setState({
                     success:'commented Succesfully',
                     comment: ' ',
                     error:''
                     
                 })
             }
            
              window.location = '/boughtItems'
         })
         .catch(err => {
             if (err.response.data) {
                 this.setState({
                     error: err.response.data.error,
                     comment:'',
                     item:'',
                     success:''
                 })
             }
         })
 }

    render(){
        return(
            <div className = " jumbotron">
                 <h3 className = "container">Give us your Feedback On {this.state.itemName}</h3>
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
                <form className="container" onSubmit={this.onSubmit}>
                    <div className="form-group ">
                       <lable class = "rateLable">Rate: </lable>
                        <div className="rating-box">
                            <div class="rating-container"> 
                            <input class = "inputstar" type="radio" name="rating" value="5" id="star-5"/> <label class = " star"for="star-5">&#9733;</label>
                            
                            <input class = "inputstar" type="radio" name="rating" value="4" id="star-4"/> <label class = " star" for="star-4">&#9733;</label>
                            
                            <input class = "inputstar" type="radio" name="rating" value="3" id="star-3"/> <label class = " star" for="star-3">&#9733;</label>
                            
                            <input class = "inputstar" type="radio" name="rating" value="2" id="star-2"/> <label class = " star" for="star-2">&#9733;</label>
                            
                            <input class = "inputstar" type="radio" name="rating" value="1" id="star-1"/> <label class = " star" for="star-1">&#9733;</label>
                            </div>
                    </div>

                    </div> 
                    <div className="form-group"> 
                        <label>Comments: </label>
                        <textarea type="text" class="form-control" name="comment" value={this.state.comment} onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit the Feedback" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}