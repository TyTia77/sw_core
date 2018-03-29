import React from "react"
import propTypes from 'prop-types'
import style from './image-component.scss'
import {imgPath} from 'Helpers/helper'

const ImageComponent = ({ props }) =>
    <div id="image-container">
        <div className="child">
            <img className={style['image-sub'] +' ' +style.image} src={`${imgPath}/sub drinks/ham.png`} alt=""/>
        </div>
        <div className="child">+</div>
        <div className="child">
            <img className={style['image-drink'] + ' ' + style.image} src={`${imgPath}/sub drinks/Subwaycup.png`} alt="" />
        </div>

    </div>

ImageComponent.propTypes = {
    // types = string, array, object, number, bool
    // props: propTypes.type
}

export default ImageComponent