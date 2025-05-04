// ==UserScript==
// @name         MtG Stocks Currency Difference
// @version      0.7
// @description  Added currency difference to interest list
// @author       Peter Creutzberger
// @match        *://*.mtgstocks.com/*
// @match        *://*.pikastocks.com/*
// @grant        none
// @namespace https://www.mtgstocks.com/
// ==/UserScript==

(function() {
    'use strict';

    window.writeDataRequestButton = function( linkData ) {
        const buttonClassName = 'dataRequestButton';
        if ( linkData === 'pageLoad' || linkData?.attributes?.href?.value === '/interests') {
            const buttonHtml = document.createElement('div');
            buttonHtml.innerHTML = (`<button class="${buttonClassName}" style="position:fixed;top:0;left:0;z-index:9999;width:auto;height:20px;padding:0 5px 0 0;background:#00b;color:#fff;" onclick="createCells()">Enhance Price Display</button>`);
            document.body.prepend(buttonHtml);
            return;
        }

        if ( document.getElementsByClassName(`${buttonClassName}`).length > 0 ) {
            document.getElementsByClassName(`${buttonClassName}`)[0].remove();
            return;
        }

        return;
    }

    writeOnClickEvents();

    function writeOnClickEvents() {
        if ( window.location.pathname === '/interests' ) { writeDataRequestButton( 'pageLoad' ) }
        Array.from( document.getElementsByTagName('a') ).forEach( function(elem) {
            if ( !elem.getAttribute('onclick') ) { elem.setAttribute('onclick','writeDataRequestButton(this);'); }
        })
    }
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
        const cardNewPrice = +(cardDataInRow.getElementsByTagName('td')[2].innerText).replace(/[$,]/g,'');
        const cardOldPrice = +(cardDataInRow.getElementsByTagName('td')[3].innerText).replace(/[$,]/g,'');
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


})();
