import React from "react"
import propTypes from 'prop-types'
import { imgPath } from 'Helpers/helper'

// style
// require('./style.scss')
import style from './style'

// component
// import ComponentName from "module"

const Image = ({ props }) =>
        <div className={style.container}>
            <video className={style.image} src={`${imgPath}drinks/coffee.webm`} alt="" autoPlay loop />
            <img className={style.image} src={`${imgPath}drinks/waterbottle.png`} alt="" />
            <video className={style.image} src={`${imgPath}drinks/coke.webm`} alt="" autoPlay loop/>
        </div>

Image.propTypes = {
    // types = string, array, object, number, boolean
    // props: propTypes.type
}

export default Image