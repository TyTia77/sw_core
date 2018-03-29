import React from "react"
import propTypes from 'prop-types'

require('./disclaimer.scss')

const Disclaimer = ({ text, tm }) =>
    <div class="disclaimer-container">
        {
            text
                ? text
                : 'Energy values refer to products prepared on 9-grain wheat bread to standard recipe. Customer requests to modify standard recipe may increase energy values. For nutrition information, please visit www.subway.com. ‡Formed meat. ^May come in contact with non-vegetarian items.'
        }

        <div class="trademark">
        {
            tm
                ? tm
                :'All third party trademarks are the property of their respective owners. SUBWAY® is a Registered Trademark of Subway IP Inc. ©2017 Subway IP Inc.'
        }
        </div>
    </div>

Disclaimer.propTypes = {
    // types = string, array, object, number, boolean
    text: propTypes.string,
    tm: propTypes.string
}

export default Disclaimer