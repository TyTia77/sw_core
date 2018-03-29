import React from "react"
import propTypes from 'prop-types'
import style from './make-salad.scss'
import {imgPath} from 'Helpers/helper'

const MakeSalad = ({ title }) =>
    <div id='make-it-a-salad'>
        <div className='child'>{title}</div>
        <div className='child'>
            <img className='image' src={`${imgPath}/salad/salad.png`} alt=""/>
            <img className='image' src={`${imgPath}/salad/2aday.png`} alt=""/>
        </div>
        <div className='child'>+20p extra</div>
    </div>

MakeSalad.propTypes = {
    title: propTypes.string
}

export default MakeSalad