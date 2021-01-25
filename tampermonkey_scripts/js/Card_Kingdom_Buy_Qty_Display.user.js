// ==UserScript==
// @name         Card_Kingdom_Buy_Qty_Display
// @namespace    https://*cardkingdom.com/
// @version      0.1
// @description  Security through obfuscation is bad, m'kay.
// @author       Halt_I_m_Reptar (MtG Cabal Cast)
// @match        https://*cardkingdom.com/purchasing*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    Array.from(document.getElementsByClassName("dropdown-menu qtyList")).forEach((cardNode, index) => {
        document.getElementsByClassName("addToCartButton")[index].innerHTML += '<br /><div style="font-weight:bold; color:#0b0;">' + cardNode.innerHTML.split('<li>').pop().split('</li>')[0] + '</div>';
    });

})();