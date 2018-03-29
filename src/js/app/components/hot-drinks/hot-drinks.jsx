import React from "react"
import propTypes from 'prop-types'
import _ from 'lodash'

require('./hot-drinks.scss')

import Items from "Components/items/items"
import Image from "./components/image-component/image-component"

const HotDrinks = ({ items, title }) => {

    //NOTE: functional functions
    const active = item => item.Active

    // retrieve a list of unique drinks
    const removeDup = item => _.first(item['Display Name'].split(' '))

    // get display name without size appended towards end. eg coffee instead of coffee regular
    const mapDisplayName = item => {
        item['Display Name'] = _.first(item['Display Name'].split(' '))

        return item
    }

    // get price for size
    const mapRegPrice = item => item['Product Name'].includes('Regular') ? item.Price : ''
    const mapLrgPrice = item => item['Product Name'].includes('Large') ? item.Price : ''

    // map all data together
    const mapData = item => {
        let
            name = item['Display Name'],
            filteredItem = _.filter(items, item => item['Display Name'].includes(name)),
            priceReg = filteredItem.map(mapRegPrice).filter(item => item).join(''),
            priceLrg = filteredItem.map(mapLrgPrice).filter(item => item).join('')

        return {
            name,
            priceReg,
            priceLrg
        }
    }

    items = items.filter(active)
    let list = _.uniqBy(items, removeDup)
        .map(mapDisplayName)
        .map(mapData)

    return (
        <div className="hot-drinks-container">
            <div className="section-header">{title}</div>
            <div className="hot-drinks-column col-8">
                <div className="hot-drinks-header-container section-subheader">
                <label className="hot-drinks-header"></label>
                    <label className="hot-drinks-header">reg</label>
                    <label className="hot-drinks-header">lrg</label>
                </div>

                {list.map((item, index) => <Items key={index} item={item} />)}
            </div>
            <div className="hot-drinks-image col-4">
                <Image />
            </div>
        </div>
    )
}


HotDrinks.propTypes = {
    // types = string, array, object, number, boolean
    // props: propTypes.type
}

export default HotDrinks