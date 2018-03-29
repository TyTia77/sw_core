import q from "./vendor/q"
import React from "react"
import ReactDOM from "react-dom"
import sb from "./vendor/sb"

import App from "./app/app"

import { Data } from 'Helpers/data'
import { getCsvMap } from 'Helpers/map-table'
import { getCsvList, addDom } from 'Helpers/helper'

import a from 'Helpers/test'

window.Q = q

window.renderMenu = function(contentName){

    // TODO:
    //validation goes here, ideally we want to pass the url and env location info etc from the index.html
    if(typeof contentName == 'string' && arguments.length){
        switchBoard(contentName)
        return
    }

    // TODO:
    console.error('error need **');
}

// @params {string} cName = contentName
function switchBoard(cName){
    SB.setup({
        url: 'https://digitalproduction.coates.io/',
        environmentLocation: 'SYDLAB',
        channelScreenId: 1,
        content: 'SW_CORE.zip',
        sources: [
            ...getCsvList(cName)
        ],
        success: function () {
            init(cName)
        }
    })
}

// @params {string} cName = contentName
function init(cName){
    addDom()
    let data = new Data(cName)
    console.log('data from index', data.get())
    ReactDOM.render(<App data={data.get()} />, document.getElementById('app'))
}