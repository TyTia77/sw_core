import React from "react"
import propTypes from 'prop-types'

require('StylePath/fonts.scss')
require('./header.scss')

const Header = ({ title, subheader, noPriceHeader }) =>
    <div className="row header-menu header-row-container">
        <div className="header-row">
            <div className={"section-header" +(subheader ? ' yellow' : '')}>
                {title}
                {
                    subheader
                        ?
                            <div>
                                <div className="header-choose">choose your 6inch</div>
                                <div className="header-bread">breakfast sub or flatbread</div>
                            </div>
                        : ''
                }
            </div>
        </div>
        {
            noPriceHeader
                ?
                    ''
                :
                    <div className="header-price">
                        <div className={"header-bottom" + (!subheader ? ' no-sub-header' : '')}></div>
                    </div>
        }

        {
            !subheader
                ?
                    <div className="header-price-with-drink">
                        <div className={"header-bottom" + (!subheader ? ' no-sub-header' : '')}></div>
                    </div>
                :
                    ''
        }
    </div>

Header.propTypes = {
    title         : propTypes.string,
    subheader     : propTypes.bool,
    noPriceHeader : propTypes.bool,
}

export default Header