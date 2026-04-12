// ==UserScript==
// @name         Spicerack Decklist Dump
// @namespace    https://www.spicerack.gg/
// @version      0.01
// @description  List out decklists to console
// @author       Peter Creutzberger
// @match        */events/decklists?event_id=*
// @icon         https://www.spicerack.gg/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(() => {
        createDataRequestButton();
    }, 2000);

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
        const decklistsFromTable = Array.from( document.getElementsByTagName('tr') );
        if ( decklistsFromTable.length > 0 ) {
            div.innerHTML += `<strong><em>Deck Population data found in console.</em></strong><br />`;
            writeDecklists( div, decklistsFromTable );
            displayDecklistPopulation( countDeckPopulation( decklistsFromTable ) );
        } else {
            div.innerHTML += 'No decklists found. Try again. :(';
        }
    }

    const getDeckLists = ( decklistArr ) => {
        return decklistArr.reduce( (acc, curr) => {
            const currentRow = Array.from( curr.getElementsByClassName('match-table-player-container') );
            if( currentRow.length > 1 ) {
                return [...acc, [{[currentRow[1]?.innerText?.trim() || null]: {'href': currentRow[1]?.children[0]?.href || null, 'player': currentRow[0]?.innerText?.trim() || null, 'playerHref': currentRow[0]?.children[0]?.href || null} }]]
            }
            return acc;
        }, []);
    }

    const buildDecklistFilters = ( additionalFilters ) => {
        let decklistFilter = ['Desklist', 'N/A'];

        if( Array.isArray( additionalFilters ) ) { decklistFilter.concat( additionalFilters ); }
        if( typeof( additionalFilters) === 'string' && additionalFilters ) { decklistFilter.push( additionalFilters ); }

        return decklistFilter;
    }

    const writeDecklists = ( div, decklistArr ) => {
        decklistArr.forEach( ( decklistData, index ) => {
            if ( index === 0 ) { return; }
            div.style.height = adjustHeight(div);
            let innerHtml = decklistData.children[1].innerText ? `<a href="${ decklistData.children[3].firstChild.href }" target="_blank" style="color: #007bff;">${ decklistData.children[1].innerHTML }</a>` : `No decklist found`;
            innerHtml += ` by `;
            innerHtml += decklistData.children[2].innerText ? `${ decklistData.children[2].innerText }<br />` : `No player name found. <br />`;
            div.innerHTML += innerHtml;
        });
    }

    const countDeckPopulation = function( decklistArr ) {
        let deckPopulationObjTemp = {};
        let deckPopulationObj = {};
        let deckPopulationArr = [];

        decklistArr.forEach( deckData => {
            const deckName = deckData.children[1].innerText;
            if ( deckPopulationObjTemp[deckName] ) { deckPopulationObjTemp[deckName] += 1; }
            else { deckPopulationObjTemp[deckName] = 1; }
        } )

        Object.entries( deckPopulationObjTemp ).forEach( ( deckName, population) => deckPopulationArr.push( [deckName, population] ) );

        deckPopulationArr.sort( ( a, b ) => b[0][1] - a[0][1] ).forEach( elem => deckPopulationObj[ elem[0][0] ] = elem[0][1] );

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

    const adjustHeight = ( div ) => ( parseInt(div.style.height.replace(/[a-zA-Z]/g,'' ) ) + 20 ) + "px";

    const clearHtmlElements = () => {
        const htmlElementsToClear = ['decklistContainer'];
        htmlElementsToClear.forEach( selector => {
            if ( document.getElementsByClassName(selector)[0] ) { document.getElementsByClassName(selector)[0].remove(); }
        });
    }
})();
