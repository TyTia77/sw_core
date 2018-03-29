import React from 'react'
import propTypes from 'prop-types'
import { slider, getTemp } from 'Helpers/helper'

// style
import style from './drinks-am.scss'
import kidStyle from 'Components/kids-pak/kidsPak.scss'

// component
import ColdDrinks from 'Components/cold-drinks/cold-drinks'
import HotDrinks from 'Components/hot-drinks/hot-drinks'
import KidsPak from 'Components/kids-pak/kidsPak'
import AddBacon from 'Components/add-bacon/add-bacon'
import Disclaimer from 'Components/disclaimer/disclaimer'

export default class DrinksAM extends React.Component {

    constructor(props) {
        super()
        this.state = {
            weather: 'cold'
        }
    }

    componentWillMount(){

        console.log('test', this.props.data)

        let
            data       = this.props.data.items.filter(item => item.Active),
            coldDrinks = data.filter(item => item.Category == 'Cold Drinks'),
            hotDrinks  = data.filter(item => item.Category == 'Hot Drinks'),
            disclaimer = this.props.data.disclaimer,
            trademark = this.props.data.trademark

        this.setState({
            coldDrinks,
            hotDrinks,
            disclaimer,
            trademark,
            coldTitle: this.props.data.title.coldDrinkTitle,
            hotTitle: this.props.data.title.hotDrinkTitle,
            saladTitle: this.props.data.title.saladTitle,
            kidsTitle: this.props.data.title.kidsTitle,
            addBacon: this.props.data.bacon
        })

        getTemp.call(this)
    }

    componentDidMount(){
        // if (this.state.addBacon.Active){
        //     slider('kids-pak', 'add-bacon-container')
        // }
    }

    render(){
        return this.state.weather == 'hot'
            ?
                <div className='section-container'>
                    <ColdDrinks items={this.state.coldDrinks} title={this.state.hotTitle}/>
                    <HotDrinks items={this.state.hotDrinks} title={this.state.coldTitle}/>
                    <KidsPak title={this.state.kidsTitle} />
                    {
                        // this.state.addBacon.Active
                        //     ?
                        //         <AddBacon price={this.state.addBacon.Price}/>
                        //     :
                        //         ""
                    }
                    <Disclaimer text={this.state.disclaimer}  tm={this.state.trademark}/>
                </div>
            :
                <div className='section-container'>
                    <HotDrinks items={this.state.hotDrinks} title={this.state.hotTitle}/>
                    <ColdDrinks items={this.state.coldDrinks} title={this.state.coldTitle}/>
                    <KidsPak title={this.state.kidsTitle} />
                    {
                        // this.state.addBacon.Active
                        //     ?
                        //         <AddBacon price={this.state.addBacon.Price}/>
                        //     :
                        //         ""
                    }
                    <Disclaimer text={this.state.disclaimer} tm={this.state.trademark}/>
                </div>
    }
}

DrinksAM.propTypes = {
    data: propTypes.object,
}