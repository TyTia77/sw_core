import React from "react"
import propTypes from 'prop-types'
import style from './half-bacon.scss'
import {imgPath} from 'Helpers/helper'

const HalfBacon = ({ data }) =>
    <div id="half-bacon-container">
        <div className="bacon">Add bacon for </div>
        <div className="bacon">£{data.bacon.Price}</div>
       <video src={`${imgPath}half-bacon.webm`} loop autoPlay></video>
    </div>

// HalfBacon.propTypes = {
//     // types = string, array, object, number, bool
//     price: propTypes.string
// }

HalfBacon.propTypes = {
    // types = string, array, object, number, bool
    data: propTypes.object
}
export default HalfBacon