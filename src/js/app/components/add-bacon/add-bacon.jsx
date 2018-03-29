import React from "react"
import propTypes from 'prop-types'
import style from './add-bacon.scss'
import {imgPath} from 'Helpers/helper'

const VideoComponent = ({ price, widthHack }) =>
    <div id='add-bacon-container' class={widthHack ? style.container : ''}>
        <div className={`bacon  ${widthHack ? style.baconFix : ''}`}>
            <label class="bacon-label">Add bacon for <span className="price">£{price}</span></label>
        </div>
        <video class={widthHack ? style.widthHack : ''} src={`${imgPath}bacon.webm`} loop autoPlay></video>
    </div>

VideoComponent.propTypes = {
    // types = string, array, object, number, bool
    price: propTypes.string,
    widthHack: propTypes.bool,
}

export default VideoComponent