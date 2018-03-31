import { EventEmitter } from "events"
import dispatcher from "../dispatcher"

class Store extends EventEmitter {
    constructor() {
        super()
        this.state = {
            weather: 'cold'
        }
    }

    weatherResults() {
        return this.state.weather || false
    }

    getTimeline() {
        return this.state.timeline || false
    }

    handleActions(action) {
        switch (action.type) {
            case "weather": {
                if (action.weather != this.state.weather){
                    this.state.weather = action.weather
                    this.emit('weather change')
                }

                break
            }

            case 'timeline': {
                this.state.timeline = action.timeline
                this.emit('timeline ready')
                break
            }
        }
    }

}

const store = new Store
dispatcher.register(store.handleActions.bind(store))

export default store