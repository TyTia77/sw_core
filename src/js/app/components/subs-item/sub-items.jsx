import React from "react"
import propTypes from 'prop-types'
import { imgPath, kjToCal } from 'Helpers/helper'

require('./sub-items.scss')

const SubsItem = ({ subDetails }) =>{

    return (
        subDetails.Dummy
            ?
                (subDetails.Product == 'bug' && subDetails.bug.Active)
                    ? <div class="subs-item-container add-drink-container">
                        <img class="subs-item-image" src={`${imgPath}sub drinks/subwaycup.png`}/>
                        <div class="bug">
                            <div class="add">add a drink</div>
                            <div class="price">+{subDetails.bug.Price}p</div>
                        </div>
                    </div>
                    : <div className="subs-item-container"></div>
            :
            <div className="subs-item-container">
                <div className="section-subheader subs-item-title">{subDetails['Display Name']}</div>
                <div className="subs-item-image-container">
                    <img class="subs-item-image" src={`${imgPath + subDetails.Category.toLowerCase()}s/${subDetails.Product}.png`} alt={subDetails['Display Name'] + ' image'} />
                    <span class={"icon-container"}>
                        <img class={(subDetails['Health Icons'] ? ' lowfat-icon-show' : '')} src={`${imgPath}icons/lowfat.png`} />
                        <img class={(subDetails['Health Icons'] ? ' heart-icon-show' : '')} src={`${imgPath}icons/heart.png`} />
                    </span>
                </div>
                <div className="subs-sub-ingredients">{subDetails.Subtitle}</div>
                <div className="subs-item-info">
                    <div className="subs-info-cal">{subDetails.Energy}kj / {kjToCal(subDetails.Energy)}kcal <span class="bold">per 6-inch</span></div>
                    <div className="subs-info-price">£{subDetails.Price}</div>
                </div>
            </div>
    )
}


SubsItem.propTypes = {
    subDetails: propTypes.object
}

export default SubsItem