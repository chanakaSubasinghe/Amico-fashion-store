// importing dependencies
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// functional component
const StoreManager = props => (
    <tr>
        <td>{props.storeManager.firstName}</td>
        <td>{props.storeManager.email}</td>
        <td>
            <Link class="btn btn-danger btn-sm" onClick={() => { props.deleteStoreManager(props.storeManager._id) }}>delete</Link>
        </td>
    </tr>
)

// class definition
export default class StoreManagersList extends Component {

    // constructor
    constructor(props) {
        super(props)

        // binding functions
        this.deleteStoreManager = this.deleteStoreManager.bind(this)

        // state
        this.state = {
            storeManagers: [],
            loading: false
        }
    }

    // things should fore before load the page
    componentDidMount() {

        // set state
        this.setState({
            loading: true
        })

        // get store managers list
        axios.get('/users')
            .then(res => {
                this.setState({
                    storeManagers: res.data,
                    loading: false
                })
            })
            .catch(err => console.log(err))


    }

    // delete function
    deleteStoreManager(id) {
        // set state
        this.setState({
            loading: true
        })

        // send request to server
        axios.delete('/users/' + id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        // set function
        this.setState({
            storeManagers: this.state.storeManagers.filter(storeManager => storeManager._id !== id),
            loading: false
        })
    }

    // store manager list
    SMList() {
        return this.state.storeManagers.map(currentStoreManager => {
            return <StoreManager storeManager={currentStoreManager} deleteStoreManager={this.deleteStoreManager} key={currentStoreManager._id} />
        })
    }

    // render function
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
                                <th scope="col">first Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.SMList()}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}