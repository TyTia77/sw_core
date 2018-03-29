import React from "react"
import propTypes from 'prop-types'
import { getTemp } from 'Helpers/helper'

// style
require('./sides.scss')
import AddBacon from 'Components/add-bacon/add-bacon'

// component
import Items from "Components/items/items"
import Snacks from 'Components/snacks/snacks'
import Disclaimer from 'Components/disclaimer/disclaimer'
import KidsPak from 'Components/kids-pak/kidsPak'

//NOTE: may need to implement flux or redux later on
// atm each stateful component may request weather temp
// ideally we'd like to use a some sort of state manager
// flux / redux
export default class SideSnacks extends React.Component {

    constructor(props) {
        super()
        this.state = {
            // initiate state cold
            weather: 'cold'
        }
    }

    componentWillMount(){

        getTemp.call(this)

        let
            disclaimer = this.props.data.disclaimer,
            trademark  = this.props.data.trademark,
            data       = this.props.data.items.filter(item => item.Active),
            hot        = data.filter(item => item.Weather == 'Hot'),
            cold       = data.filter(item => item.Weather == 'Cold')

            data = this.state.weather == 'cold' ? hot.concat(cold) : cold.concat(hot)
            data = data.map(item => {
                return {
                    name: item['Display Name'],
                    price: item.Price,
                }
            })

        this.setState({
            items: data,
            disclaimer,
            trademark,
            sidesTitle: this.props.data.title.sidesTitle,
            kidsTitle: this.props.data.title.kidsTitle,
            addBacon: this.props.data.bacon
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextState.weather != this.state.weather ? true : false
    }

    render(){
        return (
            <div className="section-container">
                <div className="section-header side-snacks-label">{this.state.sidesTitle}</div>
                <div className="side-snacks-menu-container">
                    <div className="side-snacks-menu">
                        {this.state.items.map((item, index) => <Items key={index} item={item} />)}
                    </div>
                    <div className="side-snacks-image">
                        <Snacks weather={this.state.weather}/>
                    </div>
                </div>
                <div>
                {
                        this.state.addBacon.Active
                            ?
                                <AddBacon price={this.state.addBacon.Price}/>
                            :
                                ""
                    }
                    {/* <KidsPak title={this.state.kidsTitle}/> */}
                </div>
                <Disclaimer text={this.state.disclaimer} tm={this.state.trademark}/>
            </div>
        )
    }
}

SideSnacks.propTypes = {
    data: propTypes.object
}