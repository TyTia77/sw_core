import React from "react"
import propTypes from 'prop-types'

import Subs from './containers/subs/subs'
import Drinks from './containers/drinks/drinks'
import DrinksAM from './containers/drinks-am/drinks-am'
import Sides from './containers/sides/sides'
import SubDrinks from './containers/subs-drinks/sub-drinks'
import Breakfast from './containers/breakfast/breakfast'
import AddDrink from './containers/add-drink/add-drink'

require('StylePath/reset.scss')
require('./app.scss')

export default class App extends React.Component {

    componentWillMount() {
        this.setState({
            items: this.props.data
        })
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
            'AddDrink'  : AddDrink
        }

        return (
            <div className="app-container">
                {
                    function(){
                        const Component = components[this.state.items.componentType]
                        return <Component data={this.state.items} />
                    }.call(this)
                }
            </div>
        )
    }
}

App.propTypes = {
    data: propTypes.object
}