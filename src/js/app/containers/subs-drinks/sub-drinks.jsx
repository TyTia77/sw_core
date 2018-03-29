import React from "react"
import propTypes from 'prop-types'
import _ from 'lodash'
import $ from 'jquery'
import { slider } from 'Helpers/helper'

require('./sub-drinks.scss')
import style from './sub-drinks.scss'

// component
import Header from "Components/header-list/header/header"
import Item from "Components/header-list/item/item"
import ImageComponent from './image-component/image-component'
import VideoComponent from './video-component/video-component'
import Disclaimer from 'Components/disclaimer/disclaimer'

export default class SubDrinks extends React.Component {

    // executes before dom load
    componentWillMount(){
        const removeDup = item => _.first(item['Display Name'].split(' '))

        let data = this.props.data.items.filter(item => item.Active).map(item => {
            delete item.Energy
            item['Display Name'] = item['Display Name'].replace(' Drink Deal', '')
            return item
        })

        let uniqList = _.uniqBy(data, removeDup)
            .map(item => {
                let name = item['Display Name']

                let Price = data
                    .filter(item => item['Display Name'] == name)
                    .filter(item => item['Product Name'].includes('Six Inch'))
                    .map(item => item.Price)
                    .join('')

                let priceWith = data
                    .filter(item => item['Display Name'] == name)
                    .filter(item => item['Product Name'].includes('Footlong'))
                    .map(item => item.Price)
                    .join('')

                return {
                    'Display Name': name,
                    Price,
                    priceWith
                }
            })

        this.setState({
            items     : uniqList,
            title     : this.props.data.title.subTitle,
            trademark : this.props.data.trademark
        })
    }

    componentDidMount(){
        // slider('image-container', 'video-container')
    }

    render(){
        return (
            <div className="section-container">
                <div className="sub-drinks-header">
                    <Header title={this.state.title} />
                </div>
                <div className={style['item-container']}>
                    <Item data={this.state.items} />
                </div>
                <div className="slider">
                    <ImageComponent />
                    {/* <VideoComponent /> */}
                </div>
                <Disclaimer text={this.state.disclaimer} tm={this.state.trademark}/>
            </div>

        )
    }
}

SubDrinks.propTypes = {
    data: propTypes.object
}