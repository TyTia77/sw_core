import React from "react"
import propTypes from 'prop-types'
import style from "./add-drink.scss"
import {imgPath} from 'Helpers/helper'

// style
// require('./style.scss')

// component
// import ComponentName from "module"

const AddDrink = ({ data }) =>
    data.bug.Active
        ?
            <div className={style.add_drink_container}>
                <div className={style.inner}>
                    <div className={style.add_a}>add a</div>
                    <div className={style.drink}>drink +</div>
                    <div className={style.price}>{data.bug.Price}p</div>
                </div>
                <div className={style.video}>
                    <video src={`${imgPath}drink.webm`} loop autoPlay></video>
                </div>
            </div>
        : ''

AddDrink.propTypes = {
    // types = string, array, object, number, bool
    data: propTypes.object
}

export default AddDrink