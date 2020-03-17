import React, {Component} from 'react'
import axios from 'axios'

export default class AddStoreManager extends Component {

    constructor(props){

        super(props)

        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
        this.onChangeUserName = this.onChangeUserName.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: 'amico123#'
        }
    }

    onChangeFirstName(e){
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeLastName(e){
        this.setState({
            lastName: e.target.value
        })
    }

    onChangeUserName(e){
        this.setState({
            userName: e.target.value
        })
    }


    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }


    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
       
        const storeManager = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
        }

        axios.post('http://localhost:5000/storeManagers', storeManager)

        this.setState ({
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: ''
        })

        window.location = '/adminPanel'
    }

    render() {
        return(
            <div>
                 <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Note!</h4>
                    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                </div>

                <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" class="form-control" value={this.state.firstName} onChange={this.onChangeFirstName} maxLength="10"/>
                    </div>

                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" class="form-control" value={this.state.lastName} onChange={this.onChangeLastName} maxLength="15"/>
                    </div>

                    <div class="form-group">
                        <label>User Name</label>
                        <input type="text" class="form-control" value={this.state.userName} onChange={this.onChangeUserName} minLength="4" maxLength="15" required/>
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" value={this.state.email} onChange={this.onChangeEmail} minLength="2" required/>
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="text" class="form-control" value={this.state.password} onChange={this.onChangePassword} minLength="8" required/>
                    </div>

                    <div class="text-center">
                        <button type="submit" class="btn ThemeBackground">add store manager</button>
                    </div>
                </form>
            </div>
        )
    }
}