import React from "react"
import propTypes from 'prop-types'
import style from './video-component.scss'
import {imgPath} from 'Helpers/helper'

const VideoComponent = ({ props }) =>
    <div id="video-container">
        <span className="bacon">Add bacon for <span className="price">£2</span></span>
       <video src={`${imgPath}bacon.webm`} loop autoPlay></video>
    </div>

VideoComponent.propTypes = {
    // types = string, array, object, number, bool
    // props: propTypes.type
}

export default VideoComponent