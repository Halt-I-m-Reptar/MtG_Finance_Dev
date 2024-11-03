// ==UserScript==
// @name         Melee Decklist Dump
// @namespace    https://melee.gg/
// @version      0.05
// @description  List out decklists to console
// @author       Peter Creutzberger
// @match        */Tournament/View/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=melee.gg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    createDataRequestButton();

    function createDataRequestButton() {
        const div = document.createElement('div');
        div.innerHTML = ('<button class="dataRequestButton" style="position:fixed;top:0;left:0;z-index:9999;width:auto;height:20px;padding:0 5px 0 0;background:#00b;color:#fff;font-weight:bold;" onclick="beginDisplay()">Display Decklists</button>');
        document.body.prepend(div);
    }

    const writeDecklistContainer = () => {
        const div = document.createElement('div');
        div.innerHTML = ('<div class="decklistContainer" style="position:fixed;bottom:20px;left:0;z-index:8888;width:auto;height:200px;max-height:600px;overflow-y:scroll;padding:0 5px 0 0;border:1px solid #d00;background:#fff;color:#000;"></div>');
        document.body.prepend(div);

    }

    const startDecklistDisplay = () => {
        const div = document.getElementsByClassName('decklistContainer')[0];
        const deckListArr = Array.from( document.querySelector("#tournament-standings-table").getElementsByTagName('tr') )
        if ( deckListArr.length > 0 ) {
            div.innerHTML += `<strong><em>Deck Population data found in console.</em></strong><br />`;
            const decklistObj = getDeckLists( deckListArr );
            writeDecklists( div, decklistObj );
            displayDecklistPopulation( countDeckPopulation( decklistObj ) );
        } else {
            div.innerHTML += 'No decklists found. Try again. :(';
        }
    }

    const getDeckLists = ( deckListArr ) => {
        return deckListArr.reduce( (acc, curr) => {
            const currentRow = Array.from( curr.getElementsByClassName('match-table-player-container') );
            if( currentRow.length > 1 ) {
                return [...acc, [{[currentRow[1]?.innerText?.trim() || 'N/A']: {'href': currentRow[1]?.children[0]?.href || 'N/A', 'player': currentRow[0]?.innerText?.trim() || 'N/A', 'playerHref': currentRow[0]?.children[0]?.href || 'N/A'} }]]
            }
            return [...acc];
        }, [])
            .filter( decklistName => Object.keys( decklistName[0] )[0].trim() !== 'Decklist' && Object.keys( decklistName[0] )[0].trim() !== 'N/A' )
            .sort( (a, b) => Object.keys( a[0] )[0].trim() > Object.keys( b[0] )[0].trim() ? 1 : -1 )
    }

    const writeDecklists = ( div, decklistObj ) => {
        decklistObj.forEach( deckListData => {
            div.style.height = adjustHeight(div);
            div.innerHTML += `<a href="${ Object.values(deckListData[0])[0].href }" target="_blank" style="color: #007bff;">${ Object.keys(deckListData[0]) }</a>  
                by <a href="${ Object.values(deckListData[0])[0].playerHref }" target="_blank" style="color: #007bff;">${ Object.values(deckListData[0])[0].player }</a><br />`
        });
    }

    const countDeckPopulation = function( decklistObj ) {
        let deckPopulationObjTemp = {};
        let deckPopulationObj = {};
        let deckPopulationArr = [];

        decklistObj.forEach( deckData => {
            const deckName = Object.keys( deckData[0] )[0];
            if ( deckPopulationObjTemp[deckName] ) { deckPopulationObjTemp[deckName] += 1; }
            else { deckPopulationObjTemp[deckName] = 1; }
        } )

        Object.entries( deckPopulationObjTemp ).forEach( (key, value) => deckPopulationArr.push( [key, value] ) );

        deckPopulationArr.sort( (a, b) => b[0][1] - a[0][1] ).forEach( elem => deckPopulationObj[elem[0][0]] = elem[0][1] );

        return deckPopulationObj;
    }

    const displayDecklistPopulation = function( decklistData) {
        console.log('%cDeck Population Data:',"font-weight:bold; color:yellow");
        if ( decklistData ) { console.table( decklistData ); }
        else { console.log('No decklists found. Try again. :(') }
    }

    window.beginDisplay = function() {
        clearHtmlElements();
        writeDecklistContainer();
        startDecklistDisplay();
    }

    const adjustHeight = (div) => (parseInt(div.style.height.replace(/[a-zA-Z]/g,'')) + 20) + "px";

    const clearHtmlElements = () => {
        const htmlElementsToClear = ['decklistContainer'];
        htmlElementsToClear.forEach( selector => {
            if ( document.getElementsByClassName(selector)[0] ) { document.getElementsByClassName(selector)[0].remove(); }
        });
    }
})();
