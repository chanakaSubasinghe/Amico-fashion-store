import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import '../../public/css/style.css'

export default class Comment extends Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEdit = this.onEdit.bind(this);

        // this state
        this.state = {
            itemName : '',
            comment :'',
            rate :'',
            itemid:'',
            userid:'',
            userName:'',
            alreadyRated:false,
            commentID:''

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
        axios.get('/comment/'+ this.props.match.params.id)
            .then(response => {
                this.setState({
                   comments:  response.data
               })
                this.state.comments.forEach((comment)=>{
                    if(comment.userid === JSON.parse(localStorage.getItem("jwt")).user._id){
                        this.setState({
                           
                            alreadyRated : true,
                            comment:comment.comment,
                            commentID:comment._id,
                            rate:comment.rate

                    })
                    }
                })
            })
            
            .catch(function (error) {
                console.log(error)
            })

    }
    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
    }
    //button submit
   onSubmit(e){

    const formData = {
        comment: this.state.comment,
        rate:this.state.rate,
        itemid:this.props.match.params.id,
        userid:JSON.parse(localStorage.getItem("jwt")).user._id,
        userName:JSON.parse(localStorage.getItem("jwt")).user.firstName + ' ' + JSON.parse(localStorage.getItem("jwt")).user.lastName
    }


    // request to server to create an comment
    axios.post('/comment/',formData)
         .then(res => {
             if (res.status === 201) {

                 this.setState({
                     comment: '',
                     rate:''
                 })
             }
             window.location ='/boughtItems'
         })
         .catch(err => {
             if (err.response.data) {
                 this.setState({
                     comment:'',
                     rate:''
                 })
             }
         })
    }
    onEdit(e){
        e.preventDefault();

        const editData = {
            comment: this.state.comment,
            rate:this.state.rate
        }

        // request to server to create an comment
        axios.patch('/comment/'+ this.state.commentID, editData)
             .then(res => console.log(res.data));
             window.location ='/boughtItems'
    }
    

    render(){
        return(
            <div className = " jumbotron">
                 
                 {this.state.alreadyRated ? 
                    <form className="container" onSubmit={this.onEdit}>
                        <h3 className="text-center">YOU Already Rated On {this.state.itemName}</h3>
                        <div className="form-group ">
                            <lable class = "rateLable"> Current Rate : </lable>
                            <div className="rating-box">
                                <div class="rating-container"> 
                                <input class = "inputstar" type="radio" name="rate" value='5' onChange={this.handleChange} checked = {this.state.rate == 5 ?  true :  false} id="star-5"/> <label class = " star"for="star-5">&#9733;</label>
                                <input class = "inputstar" type="radio" name="rate" value='4' onChange={this.handleChange} checked = {this.state.rate == 4 ?  true :  false} id="star-4"/> <label class = " star" for="star-4">&#9733;</label>
                                <input class = "inputstar" type="radio" name="rate" value='3' onChange={this.handleChange} checked = {this.state.rate == 3 ?  true :  false} id="star-3"/> <label class = " star" for="star-3">&#9733;</label>
                                <input class = "inputstar" type="radio" name="rate" value='2' onChange={this.handleChange} checked = {this.state.rate == 2 ?  true :  false} id="star-2"/> <label class = " star" for="star-2">&#9733;</label>
                                <input class = "inputstar" type="radio" name="rate" value='1' onChange={this.handleChange} checked = {this.state.rate == 1 ?  true :  false} id="star-1"/> <label class = " star" for="star-1">&#9733;</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group"> 
                            <label>Comments:</label>
                            <textarea type="text" class="form-control" name="comment" value={this.state.comment}  onChange={this.handleChange} ></textarea>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Edit the Feedback" className="btn btn-primary" />
                        </div>
                    </form>
                    :
                    <form className="container" onSubmit={this.onSubmit}>
                        <h3 className = "container">Give us your Feedback On {this.state.itemName}</h3>
                        <div className="form-group ">
                            <lable class = "rateLable">Rate: </lable>
                            <div className="rating-box">
                                <div class="rating-container"> 
                                <input class = "inputstar" type="radio" name="rate" value='5' onChange={this.handleChange} id="star-5"/> <label class = " star"for="star-5">&#9733;</label>
                                <input class = "inputstar" type="radio" name="rate" value='4' onChange={this.handleChange} id="star-4"/> <label class = " star" for="star-4">&#9733;</label>
                                <input class = "inputstar" type="radio" name="rate" value='3' onChange={this.handleChange} id="star-3"/> <label class = " star" for="star-3">&#9733;</label>
                                <input class = "inputstar" type="radio" name="rate" value='2' onChange={this.handleChange} id="star-2"/> <label class = " star" for="star-2">&#9733;</label>
                                <input class = "inputstar" type="radio" name="rate" value='1' onChange={this.handleChange} id="star-1"/> <label class = " star" for="star-1">&#9733;</label>
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
                    }
            </div>
        )
    }
}