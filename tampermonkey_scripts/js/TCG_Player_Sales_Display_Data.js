// ==UserScript==
// @name         TCG Player Sales Display Data
// @namespace    https://www.tcgplayer.com/
// @version      0.2
// @description  Remove obfuscation around TCG Player Sales Data
// @author       Peter Creutzberger
// @match        https://www.tcgplayer.com/product/*
// @icon         https://www.tcgplayer.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let timesChecked = 0;

    const displayStatus = () => {
        timesChecked++;
        if (document.getElementsByClassName("price-guide__latest-sales__more")[0]?.children[0]) {
            clearInterval(intervalId);
            beginDisplay();
        }
        if (timesChecked > 100) {
            clearInterval(intervalId);
        }
    }

    const intervalId = setInterval(displayStatus, 500);

    async function beginDisplay() {
        document.getElementsByClassName("price-guide__latest-sales__more")[0].children[0].click();
        await sleep(100);
        const salesByCondition = getPriceData();
        document.getElementsByClassName("modal__overlay")[0].click();
        writeSalesDataContainer();
        displaySalesData(Object.entries(salesByCondition).sort((elementOne, elementTwo) =>  elementOne[1].totalQty - elementTwo[1].totalQty ).reverse());
        createSalesToggle();
    }

    function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    const getPriceData = () => {
        const salesByCondition = {};

        Array.from(document.getElementsByClassName("is-modal")[1].children).forEach( (children, index) => {
            const listOfSales = Array.from(document.getElementsByClassName("is-modal")[1].children);
            if (listOfSales[index]?.children[1]) {
                const currentCondition = listOfSales[index]?.children[1].innerText;
                if ( !Object.keys(salesByCondition).includes(currentCondition) ) {
                    salesByCondition[currentCondition] = addCondition();
                }
                salesByCondition[currentCondition].totalPrice += cleanPrice(listOfSales[index].children[2].innerText);
                salesByCondition[currentCondition].totalQty += 1;
            }
        });

        return salesByCondition;
    }

    const addCondition = () => ({
        totalPrice: 0,
        totalQty: 0,
        marketPrice: function() {
            return (this.totalPrice / this.totalQty).toFixed(2);
        }
    });

    const cleanPrice = (price) => +price.substring(1);

    const createSalesToggle = () => {
        const div = document.createElement('div');
        div.innerHTML = ('<button class="salesDataToggle" style="position:fixed;top:0;left:0;z-index:9999;width:auto;height:20px;padding:0 5px 0 0;background:#0b0;color:#fff;font-weight:bold;" onclick="toggleSalesData()">Toggle Sales Data Display</button>');
        document.body.prepend(div);
    }

    const adjustHeight = (div) => (parseInt(div.style.height.replace(/[a-zA-Z]/g,'')) + 25) + "px";

    const writeSalesDataContainer = () => {
        const div = document.createElement('div');
        const setBottom = document.getElementsByClassName("_hj_feedback_container") ? 'bottom:100px' : 'bottom:0';
        div.innerHTML = (`<div class="salesDataDisplay" style="position:fixed;${setBottom};left:0;z-index:9999;width:auto;height:0;padding:0 5px 0 0;border:1px solid #d00;background:#999;color:#fff"></div>`);
        document.body.prepend(div);
    }

    const displaySalesData = (salesByCondition) => {
        const div = document.getElementsByClassName('salesDataDisplay')[0];
        salesByCondition.forEach(condition => {
            const displayString = `<strong>${condition[0]}</strong> - Total Price: ${condition[1].totalPrice.toFixed(2)} - Total Qty Sold: ${condition[1].totalQty} - Market Price: ${condition[1].marketPrice()}`;
            div.innerHTML += displayString + "<br />";
            div.style.height = adjustHeight(div);
        });
    }

    window.toggleSalesData = function() {
        const display = document.getElementsByClassName('salesDataDisplay')[0].style.display;
        document.getElementsByClassName('salesDataDisplay')[0].style.display = display === 'none' ? 'inline' : 'none';
    }

})();
