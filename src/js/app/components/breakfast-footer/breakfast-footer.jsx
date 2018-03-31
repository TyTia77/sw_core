import React from "react"
import propTypes from 'prop-types'
import { imgPath } from 'Helpers/helper'
import { connect } from 'react-redux'


// style
require('./breakfast-footer.scss')

class BreakfastFooter extends React.Component {

    // before mounting
    componentWillMount() {
        this.setState({
            bug: this.props.bug,
            tag: this.props.tag
        })
    }

    // after mounting
    componentDidMount() {
        console.log('mounted from footer', this.props)
        if (this.state.bug.Active){
            this.props.timeline.addEvent(function () {
                let bug = document.querySelector('.price-bug')
                bug.className += ' animated'
            }, 100)
            this.props.timeline.addEvent(function () {
                let bug = document.querySelector('.price-bug')
                bug.className = 'price-bug'
            }, 1500)
        }
    }

    render() {
        return (
            <div className={`breakfast-footer-container ${!this.state.bug.Active ? 'no-add' : ''}`}>
                {
                    this.state.tag.Active
                        ?
                        <span className="serveduntil">
                            <span class="served">served</span>
                            <span class="until">until</span>
                            <span class="breakfast-time">{this.state.tag.Time}</span>
                        </span>
                        : ""
                }
                <img className="breakfast-footer-img" src={`${imgPath}/breakfast/serveduntil.png`} alt="" />
                {
                    this.state.bug.Active
                        ?
                        <span className="price-bug">
                            <span class="add-a">add a</span>
                            <span class="bottle-for">bottle for</span>
                            <span class="price">{this.state.bug.Price}p</span>
                        </span>
                        : ''
                }
            </div>
        )
    }
}

BreakfastFooter.propTypes = {
    // types = string, array, object, number, boolean
    bug      : propTypes.object,
    timeline : propTypes.object
}

export default connect(store => {
    return {
        timeline: store.timeline.timeline
    }
})(BreakfastFooter)