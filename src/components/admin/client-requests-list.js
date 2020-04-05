import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

// const StoreManager = props => (
//     <tr>
//         <td>{props.storeManager.userName}</td>
//         <td>{props.storeManager.email}</td>
//         <td>
//             <Link class="btn btn-danger btn-sm" onClick={() => {props.deleteStoreManager(props.storeManager._id)}}>delete</Link>
//         </td>
//     </tr>
// )

export default class ClientRequestsList extends Component {

    constructor(props) {
        super(props)

        // this.deleteStoreManager = this.deleteStoreManager.bind(this)

        this.state = {
            storeManagers: []
        }
    }

    // componentDidMount(){
    //     axios.get('http://localhost:5000/storeManagers')
    //         .then(res => {
    //             this.setState({
    //                 storeManagers: res.data
    //             })
    //         })
    //         .catch(err => console.log(err))


    // }

    // deleteStoreManager(id){
    //     axios.delete('http://localhost:5000/storeManagers/' + id)
    //         .then(res => console.log(res.data))
    //         .catch(err => console.log(err))

    //     this.setState({
    //         storeManagers: this.state.storeManagers.filter(storeManager => storeManager._id !== id)
    //     })    
    // }

    // SMList(){
    //     return this.state.storeManagers.map(currentStoreManager => {
    //         return <StoreManager storeManager={currentStoreManager} deleteStoreManager={this.deleteStoreManager} key={currentStoreManager._id} />
    //     })
    // }

    render() {
        return(
            <div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>chanaka</td>
                        <td>requesting a product</td>
                        <td>
                            <div class="row">
                            <Link class="btn btn-info btn-sm mr-1" to={"items/edit/"}>view</Link> <Link class="btn btn-danger btn-sm" to="#">delete</Link>
                            </div>
                        </td> 
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}