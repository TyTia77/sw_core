import React from "react"
import propTypes from 'prop-types'
import style from './breakfast.scss'

import Header from "Components/header-list/header/header"
import Item from "Components/header-list/item/item"
import BreakfastFooter from "Components/breakfast-footer/breakfast-footer"
import Disclaimer from 'Components/disclaimer/disclaimer'

const Breakfast = ({ data }) => {

    let drinkPrice = data.bug.Price

    // add drink price to sub price
    data.items.map(item => {
        item.priceWith = (parseFloat(item.Price) + parseFloat( '0.' +drinkPrice)).toFixed(2)
        return item
    })

    console.log('price', drinkPrice)

    return (
        <div className="section-container breakfast">
            <div className="header">
                <Header title={data.title.subTitle} subheader={true} noPriceHeader={false} />
            </div>
            <Item data={data.items.filter(item => item.Active)} special={true} />
            <BreakfastFooter bug={data.bug} tag={data.tag} />
            <Disclaimer text={data.disclaimer} tm={data.trademark} />
        </div>
    )
}

Breakfast.propTypes = {
    data     : propTypes.object.isRequired,
    timeline : propTypes.object
}

export default Breakfast