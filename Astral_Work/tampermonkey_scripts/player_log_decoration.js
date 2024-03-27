// ==UserScript==
// @name         Astral WCL Personal Log Decoration
// @namespace    https://www.warcraftlogs.com/
// @version      2024-03-27
// @description  Add Astral recruitment decoration to WCL pages
// @author       Pewbies / Faigns
// @match        https://www.warcraftlogs.com/character/*/*/*
// @icon         https://www.astralguild.com/styles/astral/xenforo/xenforo-logo.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    addAstralButton();

    const buildListOfLinks = ( wclId ) => {
        return {
            'https://wowanalyzer.com/favicon.ico': `https://wowanalyzer.com/report/${ wclId }`,
            'https://www.wipefest.gg/favicon.ico': `https://www.wipefest.gg/report/${ wclId }?gameVersion=warcraft-live`,
        }
    }

    window.startProcessing = function( status ) {
        if ( status ) { addAstralLinks(); }
        else { alert( 'Please select a boss fight then click this button again.' ); }
    }

    function addAstralLinks() {
        Array.from( document.getElementById('boss-table').children[0].children )[0].insertCell().innerHTML = `<img src='https://www.astralguild.com/styles/astral/xenforo/xenforo-logo.png' style='height: 20px; display: block; margin-left: auto; margin-right: auto;'>`;

        Array.from( document.getElementById('boss-table').children[1].children ).forEach( row => {

            const wclogUrl = row.getElementsByClassName('rank-per-second')[0].children[0].href;
            const wclId = wclogUrl.split('/').pop().split('#')[0];
            const linkObj = buildListOfLinks(wclId);
            const displayHtml = Object.keys( linkObj ).reduce( (acc, curr) => { return acc += `<a href = '${linkObj[curr]}' target='_blank'> <img src='${curr}'/> </a>&nbsp;&nbsp`; }, '')
            row.insertCell().innerHTML += displayHtml;
        })
    }

    function addAstralButton() {
        const div = document.createElement('div');
        div.innerHTML = ( `<button class='addAstralLinks' style='position: fixed; top: 0; right: 0; z-index: 99999; height: 30px; background-repeat: no-repeat; background-size: contain; width: 100px; background-color: #111826; background-image:url("https://www.astralguild.com/styles/astral/xenforo/xenforo-logo.png")' onclick='startProcessing(checkForCorrectTable())'/></button>`);
        document.body.prepend(div);
    }

    window.checkForCorrectTable = function() {
        if ( !document.getElementById('boss-table') ) { return false; }
        return true;
    }

    function alertUser( message ) { alert(message); }
})();
