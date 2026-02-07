// ==UserScript==
// @name         MtG Stock EDH Rec Link Addition
// @version      0.02
// @description  Add link to EDHRec page of the card being viewed
// @author       Peter Creutzberger
// @match        *://*.mtgstocks.com/prints/*
// @grant        none
// @namespace https://www.mtgstocks.com/
// @downloadURL https://update.greasyfork.org/scripts/501604/MtG%20Stock%20EDH%20Rec%20Link%20Addition.user.js
// @updateURL https://update.greasyfork.org/scripts/501604/MtG%20Stock%20EDH%20Rec%20Link%20Addition.meta.js
// ==/UserScript==

(function() {
    'use strict';

    addEDHRecLink();

    function addEDHRecLink() {
        console.log('adding link');
        const cleanedName = document.getElementsByClassName('content-title')[0].innerText.split("\n")[0].replace(/\W+/g, '-').toLowerCase();
        document.getElementsByClassName('content-title')[0].innerHTML += `\t--\t<a href='https://edhrec.com/cards/${cleanedName}' target='_blank'>EDH Rec Link</a>`;
    }

})();
