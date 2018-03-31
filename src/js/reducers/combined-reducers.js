import { combineReducers } from 'redux'
import { weather } from './weather-reducer'
import { timeline } from './timeline-reducer'

export default combineReducers({

    weather,
    timeline,

})