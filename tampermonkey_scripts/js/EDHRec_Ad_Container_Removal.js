// ==UserScript==
// @name         EDHRec Ad Container Removal
// @namespace    https://edhrec.com/
// @version      0.02
// @description  Remove ad containers on EDHRec
// @author       Peter Creutzberger
// @match        *://*.edhrec.com/sets/*
// @match        *://*.edhrec.com/commanders/*
// @icon         chrome-extension://llcpfkbjgkpmapiidpnohffjmmnhpmpb/tabs/ImageViewer.html
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/573775/EDHRec%20Ad%20Container%20Removal.user.js
// @updateURL https://update.greasyfork.org/scripts/573775/EDHRec%20Ad%20Container%20Removal.meta.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(() => {
        const getAdDivs = Array.from( document.getElementsByClassName('mv_slot_target') );

        remove_elems( getAdDivs, true );
    }, 1000);


    function remove_elems( toRemove, isAdSpace = false ) {
        if ( isAdSpace && toRemove.length > 0 ) { toRemove.forEach( elem => elem.parentNode.parentNode.parentNode.remove() ); }
    }


})();
