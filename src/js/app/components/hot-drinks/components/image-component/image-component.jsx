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
            <img className={style.image} src={`${imgPath}drinks/cappucino.png`} alt="" />
            <img className={style.image} src={`${imgPath}drinks/waterbottle.png`} alt="" />
            <img className={style.image} src={`${imgPath}drinks/subwaycup.png`} alt="" />
        </div>

Image.propTypes = {
    // types = string, array, object, number, boolean
    // props: propTypes.type
}

export default Image