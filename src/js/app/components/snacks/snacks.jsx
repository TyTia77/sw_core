import React from "react"
import propTypes from 'prop-types'
import style from './snacks.scss'
import {imgPath} from 'Helpers/helper'
import getWeather from 'Helpers/weather'

const Snacks = ({ weather }) =>
    <div className={style.container}>
        {
            // weather == 'cold'
            //     ?
            //         <video className={style.soup + ' ' + style.img} src={imgPath + 'sides/soup.webm'} loop autoPlay/>
            //     :
            //         <img className={style.img} src={imgPath + 'sides/chips.png'} alt=""/>
        }
        <img className={style.img} src={imgPath + 'snacks/cookie.png'} alt="" />
    </div>

Snacks.propTypes = {
    // types = string, array, object, number, boolean
    weather: propTypes.string
}

export default Snacks