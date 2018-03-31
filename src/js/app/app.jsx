import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchWeather } from '../actions/weather-action'

import Subs from './containers/subs/subs'
import Drinks from './containers/drinks/drinks'
import DrinksAM from './containers/drinks-am/drinks-am'
import Sides from './containers/sides/sides'
import SubDrinks from './containers/subs-drinks/sub-drinks'
import Breakfast from './containers/breakfast/breakfast'
import AddDrink from './containers/add-drink/add-drink'
import HalfBacon from './containers/half-bacon/half-bacon'
import SidesAM from './containers/sides-am/sides-am'

require('StylePath/reset.scss')
require('./app.scss')

// connects redux with react
// @connect(store => {
//     return {
//         weather: store.weather.weather
//     }
// })
class App extends React.Component {

    componentWillMount() {

        let timeline = new SB.Timeline({
            debug: false, // truthy value, will visualise the timeline
            framerate: 30, // frames per second, default: 25
            cycleTime: 3000, // milliseconds, length of the timeline cycle, default: 0
        })
        this.setState({
            items: this.props.data,
            timeline
        })

        // dispatch action
        this.props.dispatch(fetchWeather())
        console.log('props', this.props)
    }

    render() {

        // component mapper
        const components = {
            'Subs'      : Subs,
            'Breakfast' : Breakfast,
            'Drinks'    : Drinks,
            'DrinksAM'  : DrinksAM,
            'SubDrinks' : SubDrinks,
            'Sides'     : Sides,
            'AddDrink'  : AddDrink,
            'HalfBacon' : HalfBacon,
            'SidesAM'   : SidesAM,
        }

        return (
            <div className="app-container">
                {
                    function(){
                        const Component = components[this.state.items.componentType]
                        return <Component timeline={this.state.timeline} data={this.state.items} />
                    }.call(this)
                }
            </div>
        )
    }
}

App.propTypes = {
    data: propTypes.object
}

export default connect(store => {
    return {
        weather: store.weather.weather
    }
})(App)