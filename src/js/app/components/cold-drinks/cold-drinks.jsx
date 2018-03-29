import React from "react"
import propTypes from 'prop-types'

require('./cold-drinks.scss')

import Items from "Components/items/items"

const ColdDrinks = ({ items, title }) => {

    console.log('test item', items)

    //temp fix
    let newItem = items.map(item => {
        return {
            name : item['Display Name'],
            price : item.Price
        }
    })

    let half = newItem.length / 2
    let leftSide = newItem.slice(0, half)
    let rightSide = newItem.slice(half)

    return (
        <div className="cold-drinks-container">
            <div className="section-header">{title}</div>

            <div className="cold-drinks-column col-6">
                {leftSide.map((item, index) => <Items key={index} item={item} />)}
            </div>
            <div className="cold-drinks-column col-6">
                {rightSide.map((item, index) => <Items key={index} item={item} />)}
            </div>
        </div>
    )
}

ColdDrinks.propTypes = {
    // types = string, array, object, number, boolean
    items: propTypes.array,
    title: propTypes.string
}

export default ColdDrinks