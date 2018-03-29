import React from "react"
import propTypes from 'prop-types'
import { imgPath } from 'Helpers/helper'

// style
require('./breakfast-footer.scss')

const BreakfastFooter = ({ bug }) =>
    <div className={`breakfast-footer-container ${!bug.Active ? 'no-add' : ''}`}>
        <img className="breakfast-footer-img" src={`${imgPath}/breakfast/serveduntil.png`} alt="" />

        {
            bug.Active
                ?
                    <span className="price-bug">
                        <span class="add-a">add a</span>
                        <span class="bottle-for">bottle for</span>
                        <span class="price">{bug.Price}p</span>
                    </span>
                : ''
        }
    </div>

BreakfastFooter.propTypes = {
    // types = string, array, object, number, boolean
    bug: propTypes.object
}

export default BreakfastFooter