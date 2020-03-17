import React, {Component} from 'react'

export default class AdminSettings extends Component {

    render() {
        return(
            <div>
                 <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Note!</h4>
                    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                </div>

                <form>
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" class="form-control" />
                    </div>

                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" class="form-control" />
                    </div>

                    <div class="form-group">
                        <label>User Name</label>
                        <input type="text" class="form-control" />
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" />
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control"/>
                    </div>

                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" class="form-control"/>
                    </div>

                    <div class="text-center">
                        <button type="submit" class="btn ThemeBackground">update settings</button>
                    </div>
                </form>
            </div>
        )
    }
}