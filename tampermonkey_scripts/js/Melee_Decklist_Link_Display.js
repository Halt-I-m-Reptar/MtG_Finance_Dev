// ==UserScript==
// @name         Melee Decklist Dump
// @namespace    https://melee.gg/
// @version      0.01
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
        const deckListArr = Array.from( document.getElementsByClassName("Decklists-column") );
        if ( deckListArr.length > 0 ) {
            deckListArr.filter( decklistName => decklistName.innerText.trim() !== 'Decklist' && decklistName.innerText.trim() !== 'N/A').sort( (a, b) => a.innerText.trim() > b.innerText.trim() ? 1 : -1).reduce( (acc, curr) => {
                return [ ...acc, [{ [curr.innerText.trim()]:  curr.childNodes[0].href }] ]
            }, [] ).forEach( deckListData => {
                div.style.height = adjustHeight(div);
                div.innerHTML += `<a href="${Object.values(deckListData[0])}" target="_blank" style="color: #007bff;">${Object.keys(deckListData[0])}</a><br />`
            });
        } else {
            div.innerHTML += 'No decklists found. Try again. :(';
        }
    }

    window.beginDisplay = function() {
        clearHtmlElements();
        writeDecklistContainer();
        displayDecklists();
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