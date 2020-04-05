import React, {Component} from 'react'

export default class ContactForm extends Component {

    render() {
        return (
            <form>
                <div class="form-row">
                <div class="col-md-12 mb-3">
                    <label for="validationCustom01">First name</label>
                    <input type="text" class="form-control" id="validationCustom01" placeholder="Ashan" maxLength="10" required />
                </div>
                <div class="col-md-12 mb-3">
                    <label for="validationCustom02">Last name</label>
                    <input type="text" class="form-control" id="validationCustom02" placeholder="Senavirathne" maxLength="15" required />
                </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12 mb-3">
                        <label for="validationCustom03">Email</label>
                        <input type="email" class="form-control" id="validationCustom03" placeholder="ashan.s@example.com" maxLength="20" required />
                    </div>

                    <div class="col-md-12 mb-3">
                        <label for="validationCustom04">contact number</label>
                        <input type="tel" class="form-control" id="validationCustom04" placeholder="0712345678" maxLength="10" required />
                    </div>

                </div>

                <div class="form-row">

                    <div class="col-md-12 mb-3">
                        <label for="validationCustom04">Subject</label>
                        <input type="text" class="form-control" id="validationCustom04" placeholder="Requesting product" maxLength="10" required />
                    </div>

                </div>

                <div class="form-row">
                    <div class="col-md-12 mb-3">
                        <label>Your message</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" placeholder="blah blah blah"></textarea>
                    </div> 
                </div>

                <div class="text-center">
                    <button class="btn ThemeBackground" type="submit">Submit your request</button>
                </div>

            </form>

        )
    }
} 