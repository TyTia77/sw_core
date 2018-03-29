import { getTitleName, getComponentMap } from 'Helpers/map-table'
import { objectEntries } from 'Helpers/helper'

let
    settings,
    productList,
    dataSource,
    contentName

// @params cName = content name
export function Data(cName) {

    contentName = cName
    settings = getSettings()
    productList = getDS('product mix')
    dataSource = _.first(SB.Data._sources)

    this.componentType = getComponentType(settings)
    this.disclaimer = _.first(settings).Disclaimer || ''
    this.trademark = _.first(settings).Trademark || ''
    this.items = getItems()
    this.title = getTitle()
    this.bug = getBug()
    this.tag = getTag()
    this.bacon = getBacon()

    return this
}

/**
 * @function filters all unnessary properties eg. no function property, no empty property
 */
Data.prototype.get = function (){
    let obj = {}
    for (let prop in this){
        if (this[prop] && typeof this[prop] != 'function'){
            obj[prop] = this[prop]
        }
    }
    return obj
}

/**
 * @function retrieves csv data
 * @param {string} csv - csv name eg. classic subs.csv **tip - dont need to include full name 'classic' is fine**
 * @return {array} - csv data
 */
function getDS(csv) {
    return SB.Data.like(csv).single() || false
}

/**
 * @function retrieves the component type to use for rendering
 * @param {object} settings - settings object from csv file which contains the revelent property for mapping
 * @return {string} name of component to use
 */
function getComponentType(settings){
    return getComponentMap(_.snakeCase(_.first(settings).Component)) || ''
}

/**
 * @function retrieves lineup items eg bacon sub, lamb subs etc
 * @return lineup items
 */
function getItems(){
    let itemList = handleMarketSelection(getDS(dataSource)) || ''
    return itemList ? handlePrice(joinCsv(itemList, productList, 'Product', 'Product Code')) : ''
}

/**
 * @function retrieve bacon promo video
 * @return {object} bacon - bacon properties if applicable
 */
function getBacon(){
    let hasDrinks = getDS('add bacon'),
        bacon = hasDrinks ? _.first(handlePrice(joinCsv(hasDrinks, productList, 'Product Code'))) : ''
    
    return bacon ? {
        Active: bacon.Active,
        Price: bacon.Pence == '00' ? bacon.Pounds : bacon.Price
    } : ''
}

/**
 * @function retrieve tag information
 * @return {object} tag - tag properties if applicable
 */
function getTag(){
    let
        hasBrekki = getDS('UK Breakfast Served Until Option'),
        tag = hasBrekki ? _.first(joinCsv(hasBrekki, productList, 'Product Code')) : ''

    return tag ? {
        Active: tag.Active,
        Time: tag.Hour + ':' + tag.Minutes
    } : ''
}

/**
 * @function retrieve bug information
 * @return {object} bug - bug properties if applicable
 */
function getBug(){
    let
        hasBug = getDS('add drink bug'),
        bug = hasBug ? _.first(joinCsv(hasBug, productList, 'Product Code')) : ''

    return bug ? {
        Active: bug.Active,
        Price: bug.Pence
    } : ''
}

/**
 * @function - retrieves the settings data from setting.csv **filename may not be accurate**
 * @return {object} - object of setting properties, component type etc.
 */
function getSettings(){
    return getDS('settings')
        .filter(setting => setting.Content === contentName) || ''
}

/**
 * @function - retrieves title
 */
function getTitle(){
    return getDS('title') ? getDS('title').reduce((obj, next) => {

        // maps correct title from map-table
        obj[getTitleName(next.Section)] = getTitleText(next)
        return obj
    }, {}) : ''
}

/**
 * @function - handles title string manpulation
 * @param {object} obj - object that contains property rules. eg length, active, string to edit
 * @return {object} obj - edited title
 */
function getTitleText(obj) {
    return obj.Active
        ? obj.Title.slice(0, obj['Character Limit'])
        : ''
}

/**
 * @function concats pounds and pence together eg 8.99
 * @param {array} items
 * @return {object} items - new property with combined price
 */
function handlePrice(items) {
    return items.map(item => {
        item.Pence = item.Pence < 10 ? '0' + String(item.Pence): item.Pence
        item.Price = `${item.Pounds}.${item.Pence}`
        return item
    })
}

/**
 * @function determines whether to append market selection sub
 * @param {array} list - array of subitem objects
 * @return {array} list - with marketSelection if applicable
 */
function handleMarketSelection(list) {
    let
        market = getDS('market selection'),
        name = market
            ? market.map(item => item.Active ? item.Product : '').join('')
            : '',

        health = market ? market.map(item => item['Health Icons']
            ? item['Health Icons'] : '').join('')
            : ''

    if (name) {
        list.push({
            Product: name,
            Active: true,
            'Health Icons': health ? true : false,
            Position: 'bottom right'
        })
    }

    // TODO: hack for now
    if (contentName.toLowerCase().includes('classic') || contentName.toLowerCase().includes('low fat') ){
        list.push({
            Dummy: true,
            Product: 'bug',
            Active: true,
            Position: 'bottom right'
        })
    }

    return list
}

/**
 * @function join csv file
 * @param {array} data1 - csv dataset to join
 * @param {array} data2 - csv dataset to join
 * @param {string} data1on - key value for data1 to join on eg. Product Code
 * @param {string} data2on - key value for data2 to join on eg. Product Id
 *
 */
function joinCsv(data1, data2, data1on, data2on) {
    return cleanColumns(SB.Dataset(data1)
        .join(data2)
        .on(...data2on
            ? [data1on, data2on]
            : [data1on]).get())
}

/**
 * @function removes unnecessary columns
 * @param {array} list - returned csv file
 */
function cleanColumns(list) {
    return list.map(item =>
        objectEntries(item)
            .filter(filterColumn)
            .reduce(arrayToObject, {})
    )
}

/**
 * @function filters out any column that has 'col' in the name
 * @param {array} property - array of name/value pairs
 */
function filterColumn(property) {
    let name = _.first(property)

    return !name.includes('col')
}

/**
 * @function converts array to object of name/value pairs
 * @param {object} obj
 * @param {array} arr
 */
function arrayToObject(obj, arr) {
    let
        name = _.first(arr),
        value = _.last(arr)

    obj[name] = value
    return obj
}