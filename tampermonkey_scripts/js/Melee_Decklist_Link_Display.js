// ==UserScript==
// @name         Melee Decklist Dump
// @namespace    https://melee.gg/
// @version      0.03
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

    const displayDecklists = () => {
        const div = document.getElementsByClassName('decklistContainer')[0];
        const deckListArr = Array.from( document.querySelector("#tournament-standings-table").childNodes[1].children );
        if ( deckListArr.length > 0 ) {
            div.innerHTML += 'Deck Population data found in console.<br />';
            Array.from( document.querySelector("#tournament-standings-table").childNodes[1].children ).reduce( (acc, curr) => {
                if ( !curr.childNodes[2].children[0].children[0].children[0]?.href ) return [ ...acc ];
                return [ ...acc, [{ [curr.childNodes[2].children[0].children[0].innerText.trim()]: curr.childNodes[2].children[0].children[0].children[0].href}] ]
            }, [])
                .filter( decklistName => Object.keys( decklistName[0] )[0].trim() !== 'Decklist' && Object.keys( decklistName[0] )[0].trim() !== 'N/A' )
                .sort( (a, b) => Object.keys( a[0] )[0].trim() > Object.keys( b[0] )[0].trim() ? 1 : -1 )
                .forEach( deckListData => {
                    div.style.height = adjustHeight(div);
                    div.innerHTML += `<a href="${Object.values(deckListData[0])}" target="_blank" style="color: #007bff;">${Object.keys(deckListData[0])}</a><br />`
                });
        }  else {
            div.innerHTML += 'No decklists found. Try again. :(';
        }
    }

    const countDeckPopulation = function() {
        let deckPopulationObjTemp = {};
        let deckPopulationObj = {};
        let deckPopulationArr = [];

        if ( !Array.from( document.getElementsByClassName('decklistContainer') )[0] ) { return false; }

        Array.from( document.getElementsByClassName('decklistContainer') )[0].innerText.trim().split('\n').forEach( elem => {
            if ( deckPopulationObjTemp[elem] ) { deckPopulationObjTemp[elem] += 1; }
            else { deckPopulationObjTemp[elem] = 1; }
        } )

        Object.entries( deckPopulationObjTemp ).forEach( (key, value) => deckPopulationArr.push( [key, value] )  );

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
        displayDecklists();
        displayDecklistPopulation( countDeckPopulation() );
    }
    window.displayDeckLists = function() {
        if ( Array.from( document.getElementsByClassName("Decklists-column") ).length > 0 ) {
            Array.from( document.getElementsByClassName("Decklists-column") ).filter( list => list.innerText.trim() !== 'Decklist' ).map( lists => lists.innerText.trim() ).sort( (a, b) => a > b ? 1 : -1).forEach( list => console.log( list ))
        } else {
            console.log( 'There are no decklists in range to output' );
        }
    }

    const adjustHeight = (div) => (parseInt(div.style.height.replace(/[a-zA-Z]/g,'')) + 20) + "px";

    const clearHtmlElements = () => {
        const htmlElementsToClear = ['decklistContainer'];
        htmlElementsToClear.forEach( selector => {
            if ( document.getElementsByClassName(selector)[0] ) { document.getElementsByClassName(selector)[0].remove(); }
        });
    }
})();
