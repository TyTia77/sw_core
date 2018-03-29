import React from "react"
import propTypes from 'prop-types'
import style from './breakfast.scss'

import Header from "Components/header-list/header/header"
import Item from "Components/header-list/item/item"
import BreakfastFooter from "Components/breakfast-footer/breakfast-footer"
import Disclaimer from 'Components/disclaimer/disclaimer'

const Breakfast = ({data}) =>
    <div className="section-container breakfast">
        <div className="header">
            <Header title={data.title.subTitle} subheader={true} noPriceHeader={true} />
            {
                data.tag.Active
                    ?
                        <span className="serveduntil">
                            <span class="served">served</span>
                            <span class="until">until</span>
                            <span class="breakfast-time">{data.tag.Time}</span>
                        </span>
                    : ""
            }
        </div>
        <Item data={data.items.filter(item => item.Active)} special={true}/>
        <BreakfastFooter bug={data.bug} />
        <Disclaimer text={data.disclaimer} tm={data.trademark}/>
    </div>
Breakfast.propTypes = {
    data: propTypes.object
}

export default Breakfast