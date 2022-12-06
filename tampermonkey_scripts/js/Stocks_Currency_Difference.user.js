// ==UserScript==
// @name         MtG Stocks Currency Difference
// @version      0.6
// @description  Added currency difference to interest list
// @author       Peter Creutzberger
// @match        *://*.mtgstocks.com/*
// @match        *://*.pikastocks.com/*
// @grant        none
// @namespace https://www.mtgstocks.com/
// ==/UserScript==

(function() {
    'use strict';
    writeDataRequestButton();

    const addNewCellsToPriceTables = () => {
        Array.from(document.getElementsByTagName("table")).forEach( priceTableOnPage => {
            addHeaderToTable( priceTableOnPage.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0] );

            Array.from(priceTableOnPage.getElementsByTagName('tbody'))
                .forEach(tableBodyData => {
                    Array.from(tableBodyData.getElementsByTagName('tr'))
                        .forEach(cardDataInRow => {
                            addPriceDifference(cardDataInRow);
                            addCKBLLink(cardDataInRow);
                        });
                })
        });
    }

    const addPriceDifference = (cardDataInRow) => {
        const cardNewPrice = +(cardDataInRow.getElementsByTagName('td')[2].innerText).replace(/\$/g,'');
        const cardOldPrice = +(cardDataInRow.getElementsByTagName('td')[3].innerText).replace(/\$/g,'');
        const cardPriceDiff = (cardNewPrice - cardOldPrice).toFixed(2);
        const cellToInsert = cardDataInRow.insertCell(5);
        cellToInsert.innerHTML = `<span style="color: #212529;">$${cardPriceDiff}</span>`
        cellToInsert.className = cardPriceDiff > 0 ? "table-success" : "table-danger";
    }

    const addCKBLLink = (cardDataInRow) => {
        const buylistURLBase = "https://cardkingdom.com/purchasing/mtg_singles?filter%5Bsearch%5D=mtg_advanced&filter%5Bname%5D=";
        const cardName = cardDataInRow.getElementsByTagName('td')[0].innerText;
        cardDataInRow.insertCell(6).innerHTML = `<span style=\"color: #007bff;\"><a href=\"${buylistURLBase + cardName.replace(/ /g,'+')}" target=\"_blank\">${cardName}</a></span>`;
    }

    const addHeaderToTable = (tableHeaderArray) => {
        tableHeaderArray.insertCell(5).innerHTML = '<span style="font-weight:bold; color: #212529;">$ Diff</span>';
        tableHeaderArray.insertCell(6).innerHTML = '<span style="font-weight:bold; color: #212529;">CK BL</span>';
    }

    window.createCells = () => {
        if (window.location.pathname.match('interests')) {
            addNewCellsToPriceTables();
        } else { alert('Please visit the Interests page to utilize this functionality.'); }
    }

    function writeDataRequestButton() {
        const div = document.createElement('div');
        div.innerHTML = ('<button class="dataRequestButton" style="position:fixed;top:0;left:0;z-index:9999;width:auto;height:20px;padding:0 5px 0 0;background:#00b;color:#fff;" onclick="createCells()">Enhance Price Display</button>');
        document.body.prepend(div);
    }

})();
