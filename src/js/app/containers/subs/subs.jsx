import React from "react"
import propTypes from 'prop-types'
import _ from 'lodash'

// style
require('./subs.scss')

// component
import SubItem from "Components/subs-item/sub-items"
import Disclaimer from 'Components/disclaimer/disclaimer'

const Subs = ({ data }) =>
    <div className="section-container">
        <div className="section-header">{data.title.subTitle}</div>
        {getSubList(data).map((item, index) => <SubItem key={index} subDetails={item} />)}
        <Disclaimer text={data.disclaimer} tm={data.trademark}/>
    </div>

/**
 * @function order/reorder sub items
 * @param {object} data - sub items
 * @return {array} renderSubs - list of ordered sub items
 */
function getSubList(data){
    let
        // filter active subs
        activeSubs = data.items.filter(item => item.Active),
        itemSize = 6,
        renderSubs

    // can render max 6 subs per page
    activeSubs = activeSubs.length > itemSize ? activeSubs.slice(0, itemSize) : activeSubs

    // get unique list then filter out false truthy
    // because if there are no true unique it will still
    // return 1
    let uniqueList = getUniq(activeSubs).filter(item => item.Position != 'none')

    // conditions
    if (uniqueList.length == itemSize) {
        renderSubs = sortByPosition(mapPosition(uniqueList))
    }

    else if (!uniqueList.length && activeSubs.length == itemSize) {
        renderSubs = sortByPrice(activeSubs)
    }

    else if (uniqueList.length < itemSize && activeSubs.length == itemSize) {

        let
            uniqueMapped = mapPosition(getUniq(uniqueList)),
            notUnique = sortByPrice(activeSubs.filter(item => typeof item.Position != 'number'))

        renderSubs = sortCombined(uniqueMapped, notUnique)
    }

    else if (activeSubs.length < itemSize && !uniqueList.length) {

        let
            notUnique = sortByPrice(activeSubs.filter(item => typeof item.Position != 'number')),
            lengthToAdd = itemSize - notUnique.length

        notUnique = notUnique.concat(new Array(lengthToAdd).fill('').map(item => addDummy()))
        renderSubs = notUnique
    }

    else if (activeSubs.length < itemSize && uniqueList.length) {

        let
            uniqueMapped = mapPosition(getUniq(uniqueList)),
            notUnique = sortByPrice(activeSubs.filter(item => typeof item.Position != 'number')),
            lengthToAdd = itemSize - uniqueMapped.length - notUnique.length

        notUnique = notUnique.concat(new Array(lengthToAdd).fill('').map(item => addDummy()))
        renderSubs = sortCombined(uniqueMapped, notUnique)
    }

    return handleBug(renderSubs, data)
}

// TODO: document
function handleBug(list, data){
    list.map(item => {
        if(item.Dummy && item.Product == 'bug'){
            delete item.Pence
            delete item.Price
            item.bug = data.bug
            return item
        }
        return item
    })

    return list
}

/**
 * @function order subs from two list/array
 * @param {array} uniqueList - array of unique .Position property list
 * @param {array} list - array of regular list
 * @return {array} newList - ordered merged list
 */
function sortCombined(uniqueList, list){

    uniqueList = sortByPosition(uniqueList)

    let
        newList = [],
        mappedUniqueList = uniqueList.map(item => item.Position)

    // loop section
    let
        uniqueListIndex = 0,
        listIndex = 0,
        loopIndex = 1

    while (loopIndex < 7){
        if (mappedUniqueList[uniqueListIndex] == loopIndex) {
            newList.push(uniqueList[uniqueListIndex])
            uniqueListIndex++
        } else {
            newList.push(list[listIndex])
            listIndex++
        }
        loopIndex++
    }

    return newList
}

/**
 * @function sort list by price property
 * @param {array} list
 */
function sortByPrice(list){
    return list.sort((a, b) => b.Price - a.Price)
}

/**
 * @function sort list by position property
 * @param {array} list
 */
function sortByPosition(list){
    return _.sortBy(list, 'Position')
}

/**
 * @function maps empty price and energy to default 0 values
 * @param {array} list - array of object
 * @return {array} item - array of mapped price and energy property
 */
function mapPrice(list){
    return list.map(item => {
        item.Price = !item.Price.length ? '0.00' : item.Price
        item.Energy = !item.Energy.length ? 0 : item.Energy

        return item
    })
}

/**
 * @function retrieve unique items
 * @param {array} list - array of objects
 * @return {array} list - filtered list of unique items
 */
function getUniq(list){
    return list.filter((item, position, self) => self.map(mapItem => mapItem.Position).indexOf(item.Position) == position)
}

/**
 * @function map position to number, so we can order the array
 * @param {array} list - array of objects to map
 * @return {array} list - with position property mapped to corresponding number
 */
function mapPosition(list){
    let positionMapper = {
        'top left'     : 1,
        'top right'    : 2,
        'middle left'  : 3,
        'middle right' : 4,
        'bottom left'  : 5,
        'bottom right' : 6
    }

    return list.map(item => {
        item.Position = positionMapper[item.Position]
        return item
    })
}

/**
 * @function create dummy object, so we are able to have
 * a placeholder space on the dom
 * @return {object}
 */
function addDummy(){
    return {
        Dummy: true
    }
}

Subs.propTypes = {
    subItems: propTypes.object,
}

export default Subs