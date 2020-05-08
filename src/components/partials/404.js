import React, {Component} from 'react'

import Image from '../../public/images/404/404.jpg'

export default class PageNotFound extends Component{

    render(){

        return(
                <div>
                    <div class="container margin-top text-center">
                        <img src={Image} class="img-fluid mx-auto d-block" alt="..." />
                    </div>
                </div>
        )
    }
}