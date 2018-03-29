import React from "react"
import propTypes from 'prop-types'
import style from './snacks.scss'
import {imgPath} from 'Helpers/helper'
import $ from 'jquery'

const Snacks = ({ image }) =>
        <div className={style.container}>
            {handleImg(image)}
            <img id='image' class={style.img} src="" alt=""/>
        </div>

let timer

function handleImg(img, start = true, index = 0){
    let len = img.length - 1

    timer ? clearTimeout(timer) : ''

    if (start && !len){
        setImage(img[index])
    }

    else if(len < 0){
        // need to stop loop if no image
    }

    else {
        setImage(img[index])
        timer = setTimeout(function(){
            handleImg(img, false, index = index++ >= len ? 0 : index++)
        }, 7500)
    }
}

function setImage(img){
    let time = 600

    $('#image').fadeOut(time, function(){
        $(this).attr('src', `${imgPath}${img}`).queue(function(next){
            setImagePos()
            next()
        }).fadeIn(time)
    })
}

function setImagePos(items){

    let dom = $(`.${style.container}`)

    // 3 items or less
    if ($('.items-name').length <= 3){
        dom.css('transform', 'translate(-30px, 5px)')
        return
    }

    dom.css('transform', 'translate(-30px, 30px)')
}

Snacks.propTypes = {
    // types = string, array, object, number, bool, func
    image: propTypes.array,
}

export default Snacks