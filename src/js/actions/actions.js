import dispatcher from '../dispatcher'
import FetchWeather from 'Helpers/weather'

export function getWeather(){

    FetchWeather().then(result => {
        dispatcher.dispatch({
            type: "weather",
            weather: result
        })

    }, () => console.error('cannot retrieve weather from actions'))
}

export function initTimeline(){
    let timeline = new SB.Timeline({
        debug     : false, // truthy value, will visualise the timeline
        framerate : 30, // frames per second, default: 25
        cycleTime : 3000, // milliseconds, length of the timeline cycle, default: 0
    })

    dispatcher.dispatch({
        type: 'timeline',
        timeline
    })
}