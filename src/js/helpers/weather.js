import $ from 'jquery'
import _ from 'lodash'

const weatherApiKey = '?apikey=WLnQVZq9VmGJU8QpbLIXdYzBLw5isNTL'

/**
 * @function get weather temperature
 * @return {promise - string:string} hot/cold:error message
 */
export default function getWeatherTemp(){

    let
        base = 'http://dataservice.accuweather.com/currentconditions/v1/',
        tempData = getTempThreshold(),
        measurement = tempData.measurement == 'c' ? 'Metric' : 'Imperial',
        limit = tempData.temp

    return new Promise((resolve, reject) => {

        if (tempData){
            getWeatherLocation().then(key => {
                key += '.json'

                let url = base + key + weatherApiKey

                $.get(url).then(data => {
                    resolve(_.first(data).Temperature[measurement].Value > limit ? 'hot' : 'cold')

                    // on error
                }, () => reject('ERROR: CANNOT RETRIEVE TEMPERATURE'))
            })
        } else {
            reject('ERROR: CANNOT GET TEMP THRESHOLD')
        }
    })
}

/**
 * @function get temp threshold from group tags
 * @return {object} temp:, measurement: 'C or F'
 */
function getTempThreshold(){
    let temp = SB.Env.location.groups.filter(item => item.includes('temp')).join('').split(' ').slice(1).join(''),
        measurement = temp.charAt(temp.length - 1)

    measurement = measurement.toLowerCase() == 'c' || measurement.toLowerCase() == 'f' ? measurement : false

    temp = measurement ? temp.replace(measurement, '') : false

    return temp && measurement ? {temp, measurement: measurement.toLowerCase()} : false
}

/**
 * @function retrieve location from tags (location groups)
 * @return {promise function:string} getlocationkey function : error message
 */
function getWeatherLocation(){

    let tagList = SB.Env.location.groups.filter(item => item.includes('location')).join('').split(' ')

    return new Promise((resolve, reject) => {
        if (tagList.length == 3){

            // remove location word from text to be searched
            // eg location london uk = london uk
            getLocationKey(tagList.slice(1).join(' ')).then(data => {
                resolve(data)
            }, () => reject('ERROR: CANNOT GET LOCATION TAG'))
        } else {
            // reject cannot retrieve location
            reject('ERROR: CANNOT GET LOCATION TAG')
        }
    })
}

/**
 * @function retrieve/map location keycode from location text
 * @param {string} location of where to search eg. sydney australia
 * @return {promise number:string} location key code : error message
 */
function getLocationKey(location){

    let
        base = 'http://dataservice.accuweather.com/locations/v1/search',
        url = `${base + weatherApiKey}&q=${location}`

    return new Promise((resolve, reject) => {
        $.get(url).then(data => {
            resolve(_.first(data).Key)
        }, () => reject('ERROR: CANNOT RETRIEVE LOCATION KEY'))
    })
}