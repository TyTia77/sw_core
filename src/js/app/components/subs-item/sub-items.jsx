import React from "react"
import propTypes from 'prop-types'
import { imgPath, calToKj} from 'Helpers/helper'
import { connect } from 'react-redux'

require('./sub-items.scss')

class SubsItem extends React.Component {

    // before mounting
    componentWillMount(){
        this.setState({
            subDetails: this.props.subDetails
        })
    }

    // after mounting
    componentDidMount(){
        this.props.timeline.addEvent(function () {
            var bug = document.querySelector('.bug')
            bug.className += ' animated'
        }, 100);
        this.props.timeline.addEvent(function () {
            var bug = document.querySelector('.bug')
            bug.className = 'bug'
        }, 1500);
    }

    render(){
        return (
            this.state.subDetails.Dummy
                ?
                (this.state.subDetails.Product == 'bug' && this.state.subDetails.bug.Active)
                    ? <div class="subs-item-container add-drink-container">
                        <video class="subs-item-image" src={`${imgPath}sub drinks/coke.webm`} autoPlay loop />
                        <div class="bug">
                            <div class="add">add a</div>
                            <div class="drink">drink for</div>
                            <div class="price">{this.state.subDetails.bug.Price}p</div>
                        </div>
                    </div>
                    : <div className="subs-item-container"></div>
                :
                <div className="subs-item-container">
                    <div className="section-subheader subs-item-title">{this.state.subDetails['Display Name']}</div>
                    <div className="subs-item-image-container">
                        <img class="subs-item-image" src={`${imgPath + this.state.subDetails.Category.toLowerCase()}s/${this.state.subDetails.Product}.png`} alt={this.state.subDetails['Display Name'] + ' image'} />
                        <span class={"icon-container"}>
                            <img class={(this.state.subDetails['Health Icons'] ? ' lowfat-icon-show' : '')} src={`${imgPath}icons/lowfat.png`} />
                            <img class={(this.state.subDetails['Health Icons'] ? ' heart-icon-show' : '')} src={`${imgPath}icons/heart.png`} />
                        </span>
                    </div>
                    <div className="subs-sub-ingredients">{this.state.subDetails.Subtitle}</div>
                    <div className="subs-item-info">
                        <div className="subs-info-cal">{this.state.subDetails.Energy}kj / {calToKj(this.state.subDetails.Energy)}kcal <span class="bold">per 6-inch</span></div>
                        <div className="subs-info-price">£{this.state.subDetails.Price}</div>
                    </div>
                </div>
        )
    }
}

SubsItem.propTypes = {
    subDetails : propTypes.object,
    timeline   : propTypes.object
}

export default connect(store => {
    return {
        timeline: store.timeline.timeline
    }
})(SubsItem)