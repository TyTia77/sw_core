import React from "react"
import propTypes from 'prop-types'
import { getTemp, findFile } from 'Helpers/helper'
import style from './sides.scss'

// style
require('./sides.scss')
import AddBacon from 'Components/add-bacon/add-bacon'

// component
import Items from "Components/items/items"
import Snacks from 'Components/snacks/snacks'
import Disclaimer from 'Components/disclaimer/disclaimer'
import MakeSaladPm from 'Components/make-salad-pm/make-salad-pm'

//NOTE: may need to implement flux or redux later on
// atm each stateful component may request weather temp
// ideally we'd like to use a some sort of state manager
// flux / redux
export default class SideSnacks extends React.Component {

    constructor(props) {
        super()
        this.state = {
            // initiate state cold
            weather: 'cold',
        }
    }

    componentWillMount(){
        getTemp.call(this)

        let
            disclaimer = this.props.data.disclaimer,
            trademark  = this.props.data.trademark,
            data       = this.props.data.items.filter(item => item.Active),
            hot        = data.filter(item => item.Weather == 'Hot'),
            cold       = data.filter(item => item.Weather == 'Cold'),
            imgArr     = data.map(item => {
                return {
                    path: `${item.Category.toLowerCase()}/${item['Product Code']}.png`
                }
            }),
            modData = this.state.weather == 'cold' ? hot.concat(cold) : cold.concat(hot)
            modData = data.map(item => {
                return {
                    name: item['Display Name'],
                    price: item.Price,
                }
            })

        this.setState({
            items: modData,
            disclaimer,
            trademark,
            saladTitle : this.props.data.title.saladTitle,
            sidesTitle : this.props.data.title.sidesTitle,
            kidsTitle  : this.props.data.title.kidsTitle,
            addBacon   : this.props.data.bacon,
            img        : []
        })

        imgArr.map((img, index) => {
            findFile(img.path).then(response => {
                this.setState({
                    img: this.state.img.concat(img.path)
                })
            })
        })
    }

    shouldComponentUpdate(nextProps, nextState){

        if (nextState.weather != this.state.weather)
            return true

        else if (nextState.img.length != this.state.img.length)
            return true

        else if (nextState.items.length != this.state.items.length)
            return true

        return false
    }

    render(){
        return (
            <div className={`section-container ${style.container}`}>
                <div className="section-header side-snacks-label">{this.state.sidesTitle}</div>
                    {this.renderLayout(this.state.items.length > 4 ? false : true)}
                <MakeSaladPm title={this.state.saladTitle}/>
                <Disclaimer text={this.state.disclaimer} tm={this.state.trademark}/>
            </div>
        )
    }

    renderLayout(withImage){
        if (withImage){
            return (
                <div className="side-snacks-menu-container">
                    <div className="side-snacks-menu">
                        {this.state.items.map((item, index) => <Items key={index} item={item} />)}
                    </div>
                    <div className="side-snacks-image">
                        <Snacks image={this.state.img} />
                    </div>
                </div>
            )
        } else {

            let
                half  = Math.ceil(this.state.items.length / 2),
                left  = this.state.items.slice(0, half),
                right = this.state.items.slice(half)

            return (
                <div className="side-snacks-menu-container">
                    <div className={`side-snacks-menu ${style.split}`}>
                        {left.map((item, index) => <Items key={index} item={item} />)}
                    </div>
                    <div className={`side-snacks-menu ${style.split}`}>
                        {right.map((item, index) => <Items key={index} item={item} />)}
                    </div>
                </div>
            )
        }
    }
}

SideSnacks.propTypes = {
    data: propTypes.object
}