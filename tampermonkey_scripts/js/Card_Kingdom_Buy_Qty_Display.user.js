// ==UserScript==
// @name         Card_Kingdom_Buy_Qty_Display
// @namespace    cardkingdom.com
// @version      0.4
// @description  Security through obfuscation is bad, m'kay.
// @author       Halt_I_m_Reptar (MtG Cabal Cast)
// @match        */purchasing/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    Array.from(document.getElementsByClassName("dropdown-menu qtyList")).forEach((cardNode, index) => {
        //document.getElementsByClassName("stylePrice")[index].innerHTML += '<div style="font-weight:bold; color:#0b0; float: right">' + cardNode.innerHTML.split('<li>').pop().split('</li>')[0] + '</div>';
        var spanStylePrice = document.getElementsByClassName("stylePrice")[index].innerHTML;
        document.getElementsByClassName("stylePrice")[index].innerHTML = '<div style="font-weight:bold; color:#0b0; float: right; font-size: 12pt;">' + cardNode.innerHTML.split('<li>').pop().split('</li>')[0] + '</div><br style="clear" />' + spanStylePrice;
    });

})();
