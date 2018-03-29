import React from "react"
import propTypes from 'prop-types'
import { kjToCal } from 'Helpers/helper'

require('./item.scss')

const Item = ({data, special, singleCol}) =>
    <div>
        {data.map((item, index) =>
            <div
                className={"row" + (getSize(data) == index && special ? ' special' : '')}
                key={index}>

                <div className="menu">
                    {item['Display Name']} <wbr/>
                    {getSize(data) == index && special ? <div className="second-line">(Bacon≠, Sausage, Poached Egg & Cheese)</div> : ''}
                    {item.Energy ? <div className="menu-cal">{item.Energy} kJ / {kjToCal(item.Energy)} kcal per 6-inch</div>:''}
                </div>

                <div className="price">
                    £{item.Price}
                </div>
                {
                    item.priceWith
                        ?
                            <div className="price-with-drink">
                                £{ + item.priceWith || 1.69}
                            </div>
                        :
                            <div className="price-with-drink"></div>
                }
            </div>
        )}
    </div>

function getSize(items){
    return items.length - 1
}

Item.propTypes = {
    // types = string, array, object, number, boolean
    data: propTypes.array,
    special: propTypes.bool,
}

export default Item