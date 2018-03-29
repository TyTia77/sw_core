import React from "react"
import propTypes from 'prop-types'
import style from './make-salad-pm.scss'
import {imgPath} from 'Helpers/helper'

const MakeSalad = ({ title }) =>
    <div class={style.container}>
        <div class={style.title}>{title}</div>
        <div class={style.imgContainer}>
            <img class={style.salad} src={`${imgPath}/salad/salad.png`} alt=""/>
            <img class={style.apple} src={`${imgPath}/salad/2aday.png`} alt=""/>
        </div>
        <div class={style.extra}>+20p extra</div>
    </div>

MakeSalad.propTypes = {
    title: propTypes.string
}

export default MakeSalad