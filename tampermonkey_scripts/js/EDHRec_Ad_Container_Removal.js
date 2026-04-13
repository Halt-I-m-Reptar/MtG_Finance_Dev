// ==UserScript==
// @name         EDHRec Ad Container Removal
// @namespace    https://edhrec.com/sets/
// @namespace    https://edhrec.com/commanders/
// @version      0.01
// @description  Remove ad containers on EDHRec
// @author       Peter Creutzberger
// @match        */*
// @icon         chrome-extension://llcpfkbjgkpmapiidpnohffjmmnhpmpb/tabs/ImageViewer.html
// @grant        none
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
