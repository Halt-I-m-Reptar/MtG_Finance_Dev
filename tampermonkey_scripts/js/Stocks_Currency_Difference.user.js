// ==UserScript==
// @name         MtG Stocks Currency Difference
// @namespace    https://www.mtgstocks.com/
// @version      0.2
// @description  Added currency difference to interest list
// @author       Halt_I_m_Reptar (MtG Cabal Cast)
// @match        https://www.mtgstocks.com/*
// @match        https://www.pikastocks.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    Array.from(document.getElementsByClassName("nav-item")).forEach( link => link.addEventListener("click", createCells) );
    createCells();
})();

async function createCells() {
    await sleep(2000);
    addButtonListener();
    addDollaryDoos();
}


function addButtonListener() {
    console.log('woo buttons');
    Array.from(document.getElementsByClassName("btn btn-outline-primary float-right mr-1")).forEach( btn => btn.addEventListener("click", createCells) );
}

function addDollaryDoos() {
    Array.from(document.getElementsByTagName("tr")).forEach( row => {
        if ( Array.from(row.cells).length > 5 ) { return; }
        var newPrice = parseFloat(Array.from(row.cells)[2].innerText.substr(1));
        var oldPrice = parseFloat(Array.from(row.cells)[3].innerText.substr(1));
        if ( newPrice && oldPrice ) {
            row.insertCell(5).innerText = (newPrice-oldPrice).toFixed(2);
            Array.from(row.cells)[5].className = (newPrice-oldPrice).toFixed(2) > 0 ? "text-right alert-success" : "text-right alert-danger";
        } else {
            row.insertCell(5).innerText = "$";
            Array.from(row.cells)[5].className = "clickable";
            Array.from(row.cells)[5].scope = "col";
        }
    });
}

function sleep (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}