import { EventEmitter } from "events"
import dispatcher from "../dispatcher"

class Store extends EventEmitter {
    constructor() {
        super()
        this.state = {
            weather: 'hot'
        }
    }

    getWeather() {
        return this.state.weather
    }

    handleActions(action) {
        switch (action.type) {
            case "tester": {
                this.emit('change')
                break
            }
        }
    }

}

const store = new Store
dispatcher.register(store.handleActions.bind(store))

export default store