import React from "react"
import propTypes from 'prop-types'
import style from './add-bacon.scss'
import {imgPath} from 'Helpers/helper'

const VideoComponent = ({ price }) =>
    <div id="add-bacon-container">
        <span className="bacon">Add bacon for <span className="price">£{price}</span></span>
       <video src={`${imgPath}bacon.webm`} loop autoPlay></video>
    </div>

VideoComponent.propTypes = {
    // types = string, array, object, number, bool
    price: propTypes.string
}

export default VideoComponent