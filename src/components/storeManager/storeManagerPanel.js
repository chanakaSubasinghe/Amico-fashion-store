import React, {Component} from 'react'

// importing components
import CreateItem from './create-item'
import ItemList from './item-list'
import AddStoreManager from '../admin/add-storeManager'
import StoreManagersList from '../admin/storeManagers-list'
import AdminSettings from '../admin/admin-settings'
import AdminNavbar from '../admin/admin-navbar'


export default class storeManagerPanel extends Component {

    render() {

        return(
            <div>
                <AdminNavbar />
                    <div class="newDivider">
                        <div class="container">
                                <div class="row">
                                    <div class="col-md-4 marginBottom">
                                        <div class="list-group" id="list-tab" role="tablist">
                                        <a class="list-group-item list-group-item-action active" id="list-createCategory-list" data-toggle="list" href="#list-createCategory" role="tab" aria-controls="createCategory">Create item</a>
                                        <a class="list-group-item list-group-item-action" id="list-categoryList-list" data-toggle="list" href="#list-categoryList" role="tab" aria-controls="profile">Item list</a>
                                        <a class="list-group-item list-group-item-action" id="list-storeManager-list" data-toggle="list" href="#list-storeManager" role="tab" aria-controls="storeManager">Add store manager</a>
                                        <a class="list-group-item list-group-item-action" id="list-storeManagerList-list" data-toggle="list" href="#list-storeManagerList" role="tab" aria-controls="storeManagerList">Store managers list</a>
                                        <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Store Manager panel settings</a>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-8 marginBottom">
                                        <div class="tab-content" id="nav-tabContent">
                                        <div class="tab-pane fade show active" id="list-createCategory" role="tabpanel" aria-labelledby="list-createCategory-list">
                                        <CreateItem />
                                        </div>
                                        <div class="tab-pane fade" id="list-categoryList" role="tabpanel" aria-labelledby="list-categoryList-list">
                                        <ItemList />
                                        </div>
                                        <div class="tab-pane fade" id="list-storeManager" role="tabpanel" aria-labelledby="list-storeManager-list">
                                        <AddStoreManager />
                                        </div>
                                        <div class="tab-pane fade" id="list-storeManagerList" role="tabpanel" aria-labelledby="list-storeManagerList-list">
                                            <StoreManagersList />
                                        </div>
                                        <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                                            <AdminSettings />
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
