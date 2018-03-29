import React from "react"
import propTypes from 'prop-types'
import style from './kidsPak.scss'
import { imgPath } from 'Helpers/helper'

// style
// require('./style.scss')

// component
// import ComponentName from "module"

const KidsPak = ({ title }) =>
    <div id="kids-pak" className={style.container}>
        <div className={style.left}>
            <div className={style.label}>{title}</div>
            <div className={style['lower-text']}>Choose a mini sub from Ham‡,<br/>Turkey Breast‡ <br/>or Veggie Delite®^</div>
            <div className={style.addon}>Plus Bear Pure Fruit Yoyos, Robinsons Fruit Shoot My-5 or water</div>
        </div>
        <div className={style.right}>
            <img className={style.img} src={imgPath + 'kids/pinkbear.png'} alt="" />
            <img className={style.img} src={imgPath + 'kids/fruitshoot.png'} alt="" />
            <img className={style.img} src={imgPath + 'kids/kidssub.png'} alt="" />
            <img className={style.img} src={imgPath + 'kids/2aday.png'} alt="" />
        </div>
    </div>

KidsPak.propTypes = {
    // types = string, array, object, number, boolean
    title: propTypes.string
}

export default KidsPak