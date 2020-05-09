import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const StoreManager = props => (
    <tr>
        <td>{props.storeManager.firstName}</td>
        <td>{props.storeManager.email}</td>
        <td>
            <Link class="btn btn-danger btn-sm" onClick={() => {props.deleteStoreManager(props.storeManager._id)}}>delete</Link>
        </td>
    </tr>
)

export default class StoreManagersList extends Component {

    constructor(props) {
        super(props)

        this.deleteStoreManager = this.deleteStoreManager.bind(this)

        this.state = {
            storeManagers: []
        }
    }

    componentDidMount(){
        axios.get('/users')
            .then(res => {
                this.setState({
                    storeManagers: res.data
                })
            })
            .catch(err => console.log(err))


    }

    deleteStoreManager(id){
        axios.delete('/users/' + id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        this.setState({
            storeManagers: this.state.storeManagers.filter(storeManager => storeManager._id !== id)
        })    
    }

    SMList(){
        return this.state.storeManagers.map(currentStoreManager => {
            return <StoreManager storeManager={currentStoreManager} deleteStoreManager={this.deleteStoreManager} key={currentStoreManager._id} />
        })
    }

    render() {
        return(
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
                       { this.SMList()}
                    </tbody>
                </table>
            </div>
        )
    }
}