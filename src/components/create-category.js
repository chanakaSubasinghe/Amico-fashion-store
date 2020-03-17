import React, {Component} from 'react'

export default class CreateCategory extends Component {

    render(){

        return(
            <div>
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Note!</h4>
                    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                </div>

                <form>
                    <div class="form-group">
                        <label>Category Name</label>
                        <input type="text" class="form-control"/>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn ThemeBackground">create category</button>
                    </div>
                </form>
            </div>
        )
    }
}