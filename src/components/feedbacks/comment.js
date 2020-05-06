import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Comment extends Component{
    constructor(props){
        super(props);

        // this state
        this.state = {
            itemName : '',
            
        }
    }

    componentDidMount(){

        // request to server to get details about provided item
        axios.get('/items/' + this.props.match.params.id)
            .then(response => {
                // set state
                this.setState({
                    itemName:response.data.itemName,
                })
            })
            .catch(function (error) {
                console.log(error)
            })

                    
            // get item categories from server
            axios.get('/itemCategories/')
            .then(response => {
                    if(response.data.length > 0){

                        // set state
                        this.setState({
                            categories : response.data
                        })
                    } 
                }
            )     
    }
    // constructor(props){

    //     super(props)

    //     this.onChangeRate = this.onChangeRate.bind(this);
    //     this.onChangeComment = this.onChangeComment.bind(this);

    //     this.state = {
    //         rate: 0,
    //         comment: ''
    //     }
    // }
    // componentDidMount(){
    //     this.setState({
    //         comment: 'Comment'
    //     })
    // }

    // onChangeRate(e) {
	// 	this.setState({
	// 		rate: e.target.value
	// 	})
    // }
    // onChangeComment(e) {
	// 	this.setState({
	// 		comment: e.target.value
	// 	})
	// }

    // onSubmit(e){
    //     e.preventDefault();

    //     const feedback = {
    //         rate: this.state.rate,
    //         comment: this.state.comment
    //     }

    //     axios.post('/Comment/', feedback)
    //     .then(res => console.log(feedback))

    //         window.location = "/"

    // }

    

    render(){
        return(
            <div className = " jumbotron">
            <h3 className = "container">Give us your Feedback On {this.state.itemName}</h3>
                <form className="container">
                    <div className="form-group "> 
                        <label>Rate: </label>
                        <select  type="text"
                                required
                                className="form-control "
                                // value={this.state.rate}
                                // onChange={this.onChangeRate}
                                >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                        </select>
                    </div>
                    <div className="form-group"> 
                        <label>Comments: </label>
                        <textarea  type="text"
                                required
                                className="form-control"
                                // value={this.state.comment}
                                // onChange={this.onChangeComment}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit the Feedback" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}