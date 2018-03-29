import React from "react"
import propTypes from 'prop-types'

import {objectEntries} from 'Helpers/helper'

require('./items.scss')

const Items = ({ item }) =>
    objectEntries(item).length < 3
        ?
            <div className="items-container section-subheader">
                <label className="items-name">{item.name}</label>
                <label className="items-price">£{item.price}</label>
            </div>
        :
            <div className="items-container section-subheader">
                <label className="items-name">{item.name}</label>
                <label className="items-price">£{item.priceReg}</label>
                <label className="items-price-lg">£{item.priceLrg}</label>
            </div>

Items.propTypes = {
    item: propTypes.object
}

export default Items