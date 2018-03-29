import React from "react"
import propTypes from 'prop-types'
import style from './snacks.scss'
import {imgPath} from 'Helpers/helper'
import getWeather from 'Helpers/weather'

<<<<<<< HEAD
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
=======
import store from '../../../stores/store'
import * as actions from '../../../actions/actions'

const Snacks = ({ weather }) => {
    store.on("change", abc)
    actions.test()

    return (
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
    )
}

function abc() {
    console.log('from snacks')
}
>>>>>>> c5565208edbce4ea68dbf5b0927bbb5daa2d9052

Snacks.propTypes = {
    // types = string, array, object, number, boolean
    weather: propTypes.string
}

export default Snacks