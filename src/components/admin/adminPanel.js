import React, {Component} from 'react'

// importing components
import CreateCategory from './create-category'
import CategoryList from './category-list'
import AddStoreManager from './add-storeManager'
import StoreManagersList from './storeManagers-list'
import ClientRequestsList from './client-requests-list'

export default class AdminPanel extends Component {

    // constructor
    constructor(props){
        super(props)

        this.state = {
            error : ''
        }
    }


    render() {

        return(
            <div>
                    <div class="newDivider">
                        <div class="container">
                            {this.state.error &&
                                <div class="alert alert-danger" role="alert">
                                    {this.state.error}
                                </div>
                            }

                                <div class="row">
                                    <div class="col-md-4 marginBottom">
                                        <div class="list-group" id="list-tab" role="tablist">
                                        <a class="list-group-item list-group-item-action active" id="list-createCategory-list" data-toggle="list" href="#list-createCategory" role="tab" aria-controls="createCategory">Create category</a>
                                        <a class="list-group-item list-group-item-action" id="list-categoryList-list" data-toggle="list" href="#list-categoryList" role="tab" aria-controls="profile">Category list</a>
                                        <a class="list-group-item list-group-item-action" id="list-storeManager-list" data-toggle="list" href="#list-storeManager" role="tab" aria-controls="storeManager">Add store manager</a>
                                        <a class="list-group-item list-group-item-action" id="list-storeManagerList-list" data-toggle="list" href="#list-storeManagerList" role="tab" aria-controls="storeManagerList">Store managers list</a>
                                        <a class="list-group-item list-group-item-action" id="list-clientRequestsList-list" data-toggle="list" href="#list-clientRequestsList" role="tab" aria-controls="clientRequestsList">Client requests</a>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-8 marginBottom">
                                        <div class="tab-content" id="nav-tabContent">
                                            <div class="tab-pane fade show active" id="list-createCategory" role="tabpanel" aria-labelledby="list-createCategory-list">
                                                <CreateCategory />
                                            </div>
                                            <div class="tab-pane fade" id="list-categoryList" role="tabpanel" aria-labelledby="list-categoryList-list">
                                                <CategoryList />
                                            </div>
                                            <div class="tab-pane fade" id="list-storeManager" role="tabpanel" aria-labelledby="list-storeManager-list">
                                                <AddStoreManager />
                                            </div>
                                            <div class="tab-pane fade" id="list-storeManagerList" role="tabpanel" aria-labelledby="list-storeManagerList-list">
                                                <StoreManagersList />
                                            </div>
                                            <div class="tab-pane fade" id="list-clientRequestsList" role="tabpanel" aria-labelledby="list-clientRequestsList-list">
                                                <ClientRequestsList />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
            </div>        
        )
    }
}