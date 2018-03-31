import $ from 'jquery'
import getWeather from './weather'
import { devPort } from '../setup'
import { getCsvMap } from 'Helpers/map-table'

/**
 * @const {boolean} checks if in dev environment within the react directory
 */
export const devEnv = window.location.port.includes(devPort)

export const imgPath = devEnv ? `${window.location.href}images/` : '/content/SW_CORE.zip/images/'

// helper functions
export function capitalizeFirst(str){
    const capitalize = (letter, index) => !index ? letter.toUpperCase() : letter.toLowerCase()
    return str.split('').map(capitalize).join('')
}

/**
 * @function adds <div id='app'></div> to dom
 */
export function addDom() {
    $('body').prepend("<div id='app'></div>")
}

/**
 * @function to simulate Object.entries from es6, cannot find lodash
 * equivalent so i wrote this function
 * @param {object} obj - object of key / value pairs
 * @returns {array} listPairs - array of key / value pairs
 */
export function objectEntries(obj){
    let listPairs = []

    for (let props in obj) {
        listPairs.push([props, obj[props]])
    }

    return listPairs
}

export const sliderTimer = 10000

/**
 * @function toggles image and video states
 * @param {string} img - id of image dom element
 * @param {string} vid - id of video dom element
 */
export function slider(img, vid, intervalTime){
    const
        image = document.getElementById(img),
        video = document.getElementById(vid),
        ac = 'active'
    setInterval(function sliderTimer() {
        if (!image.classList.contains(ac)) {
            image.classList.add(ac)
            video.classList.remove(ac)
        } else {
            image.classList.remove(ac)
            video.classList.add(ac)
        }

        return sliderTimer
    }(), intervalTime || sliderTimer)
}

export const weatherGetTimer = 30000

/**
 * @function retrieves weather condition then sets state of weather to the component calling
 */
export function getTemp(){
    setInterval(function weatherTimer() {
        getWeather().then(weather => {
            this.setState({
                weather
            })
        })
        return weatherTimer.bind(this)
    }.call(this), weatherGetTimer)
}

export const calToKjRatio = 4.184

/**
 * @function converts and rounds up kilojules to calorie
 * @param {number} cal
 * @return {number}
 */
export function calToKj(cal) {
    return Math.ceil(cal * calToKjRatio)
}

/**
 * @function retrieves and joins all csv files from getcsvmap with main csv files from here
 * @param {string} contentName - name of file eg. classic subs.zip
 * @return {array} all revelent csv files
 */
export function getCsvList(contentName) {
    return [...getCsvMap(contentName)]
        .concat(['UK - Product Mix', 'UK - Settings'])
        .map(listItem => listItem.includes('.csv') ? listItem : `${listItem}.csv`)
}

export function findFile(path){
    return new Promise((resolve, reject) =>
        $.get(imgPath + path)
            .done(function () {
                resolve(true)
            })
            .fail(function () {
                reject(false)
            })
    )
}