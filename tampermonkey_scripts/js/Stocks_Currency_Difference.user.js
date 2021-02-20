// ==UserScript==
// @name         MtG Stocks Currency Difference
// @version      0.4
// @description  Added currency difference to interest list
// @author       Halt_I_m_Reptar (MtG Cabal Cast)
// @match        *://*.mtgstocks.com/*
// @match        *://*.pikastocks.com/*
// @grant        none
// @namespace https://www.mtgstocks.com/
// ==/UserScript==

(function() {
    'use strict';
    Array.from(document.getElementsByClassName("nav-item")).forEach( link => link.addEventListener("click", createCells) );
    createCells();
})();

async function createCells() {
    await sleep(1000);
    addButtonListener();
    addNewCells();
}


function addButtonListener() {
    Array.from(document.getElementsByClassName("btn btn-outline-primary float-right mr-1")).forEach( btn => btn.addEventListener("click", createCells) );
}

function addNewCells(){
    Array.from(document.getElementsByTagName("tr")).forEach( row => {
        if ( Array.from(row.cells).length > 5 ) { return; }
        var newPrice = parseFloat(Array.from(row.cells)[2].innerText.substr(1));
        var oldPrice = parseFloat(Array.from(row.cells)[3].innerText.substr(1));
        if ( newPrice && oldPrice ) {
            addDollaryDoos(row, newPrice, oldPrice);
            if (window.location.host.includes('mtgstocks')) { addCKBLLink(row); }
        } else {
            addTableHeader(row);
        }
    });
}

function addDollaryDoos(row, newPrice, oldPrice) {
    row.insertCell(5).innerHTML = "<span style=\"font-family: Open Sans; color: #212529;\">$"+(newPrice-oldPrice).toFixed(2)+"</span>";
    Array.from(row.cells)[5].className = (newPrice-oldPrice).toFixed(2) > 0 ? "text-right alert-success" : "text-right alert-danger";
}

function addCKBLLink(row) {
    //https://cardkingdom.com/purchasing/mtg_singles?filter%5Bsearch%5D=mtg_advanced&filter%5Bname%5D=Will-o%27-the-Wisp
    var url = "https://cardkingdom.com/purchasing/mtg_singles?filter%5Bsearch%5D=mtg_advanced&filter%5Bname%5D=";
    row.insertCell(6).innerHTML = "<span style=\"font-family: Open Sans; color: #007bff;\"><a href=\""+url+Array.from(row.cells)[0].innerText.replace(/ /g,'+')+"\" target=\"_blank\">"+Array.from(row.cells)[0].innerText+"</a></span>";
}

function addTableHeader(row) {
    //$ Diff
    row.insertCell(5).innerHTML = "<span style=\"font-weight:bold; font-family: Open Sans; color: #212529;\">$</span>";
    Array.from(row.cells)[5].className = "clickable";
    Array.from(row.cells)[5].scope = "col";
    //CK BL Link
    if (window.location.host.includes('mtgstocks')) {
        row.insertCell(6).innerHTML = "<span style=\"font-weight:bold; font-family: Open Sans; color: #212529;\">CK BL</span>";
        Array.from(row.cells)[6].className = "clickable";
        Array.from(row.cells)[6].scope = "col";
    }
}

function sleep (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
