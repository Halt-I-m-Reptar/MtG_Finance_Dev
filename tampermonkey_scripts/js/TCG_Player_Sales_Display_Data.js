// ==UserScript==
// @name         TCG Player Sales Display Data
// @namespace    https://www.tcgplayer.com/
// @version      0.4
// @description  Remove obfuscation around TCG Player Sales Data
// @author       Peter Creutzberger
// @match        https://www.tcgplayer.com/product/*
// @icon         https://www.tcgplayer.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let timesChecked = 0;

    const addCondition = () => ({
        totalPrice: 0,
        totalQty: 0,
        marketPrice: function() {
            return (this.totalPrice / this.totalQty).toFixed(2);
        }
    });

    const cleanPrice = (price) => +price.substring(1);

    const checkSaleDate = (salesArray, saleDate, price) => {
        if (!salesArray.min || !salesArray.max) {
            return {min: {date: saleDate, price: price}, max: {date: saleDate, price: price}};
        }
        if (new Date(saleDate).getTime() < new Date(salesArray?.min?.date).getTime() || new Date(saleDate).getTime() === new Date(salesArray?.min?.date).getTime()) {
            return Object.assign(salesArray, {min: {date: saleDate,price: price}});
        }
        if (new Date(saleDate).getTime() > new Date(salesArray?.max?.date).getTime() || new Date(saleDate).getTime() === new Date(salesArray?.max?.date).getTime()) {
            return Object.assign(salesArray, {min: {date: saleDate,price: price}});
        }

    }

    const getPriceData = () => {
        const salesByCondition = {};
        const modalDisplayLength = Array.from(document.getElementsByClassName("is-modal")).length -= 1;
        Array.from(document.getElementsByClassName("is-modal")[modalDisplayLength].children).forEach( (children, index) => {
            const listOfSales = Array.from(document.getElementsByClassName("is-modal")[modalDisplayLength].children);
            if (listOfSales[index]?.children[1]) {
                const currentCondition = listOfSales[index]?.children[1].innerText;
                if ( !Object.keys(salesByCondition).includes(currentCondition) ) {
                    salesByCondition[currentCondition] = addCondition();
                }
                salesByCondition[currentCondition].totalPrice += cleanPrice(listOfSales[index].children[2].innerText);
                salesByCondition[currentCondition].totalQty += 1;
                Object.assign(salesByCondition[currentCondition], checkSaleDate(salesByCondition[currentCondition], listOfSales[index].children[0].innerText, cleanPrice(listOfSales[index].children[2].innerText)));
            }
        });
        console.table(salesByCondition);
        return salesByCondition;
    }

    const createSalesToggle = () => {
        const div = document.createElement('div');
        div.innerHTML = ('<button class="salesDataToggle" style="position:fixed;top:0;left:0;z-index:9999;width:auto;height:20px;padding:0 5px 0 0;background:#0b0;color:#fff;font-weight:bold;" onclick="toggleSalesData()">Toggle Sales Data Display</button>');
        document.body.prepend(div);
    }

    const adjustHeight = (div) => (parseInt(div.style.height.replace(/[a-zA-Z]/g,'')) + 100) + "px";

    const writeSalesDataContainer = () => {
        const div = document.createElement('div');
        const setBottom = document.getElementsByClassName("_hj_feedback_container") ? 'bottom:100px' : 'bottom:0';
        div.innerHTML = (`<div class="salesDataDisplay" style="position:fixed;${setBottom};left:0;z-index:9999;width:auto;height:0;padding:0 5px 0 0;border:1px solid #d00;background:#999;color:#fff;line-height:normal"></div>`);
        document.body.prepend(div);
    }

    const displaySalesData = (salesByCondition) => {
        const div = document.getElementsByClassName('salesDataDisplay')[0];
        salesByCondition.forEach(condition => {
            const displayString = `<div class="displayContainer"><strong>${condition[0]}</strong><br />
            <span id="conditionData" style="margin-left: 40px;">Total Qty Sold: ${condition[1].totalQty} - Total Price: ${condition[1].totalPrice.toFixed(2)} - Market Price: ${condition[1].marketPrice()}</span><br />
            <span id="minData" style="margin-left: 40px;">Min Sale Date: ${condition[1]?.min?.date} - Min Sale Price ${condition[1]?.min?.price}</span><br />
            <span id="maxData" style="margin-left: 40px;">Max Sale Date: ${condition[1]?.max?.date} - Max Sale Price: ${condition[1]?.max?.price}</span></div>`;
            div.innerHTML += displayString + "<br />";
            div.style.height = adjustHeight(div);
        });
    }

    window.toggleSalesData = function() {
        const display = document.getElementsByClassName('salesDataDisplay')[0].style.display;
        document.getElementsByClassName('salesDataDisplay')[0].style.display = display === 'none' ? 'inline' : 'none';
    }

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

    let intervalId = setInterval(displayStatus, 500);

    async function beginDisplay() {
        document.getElementsByClassName("price-guide__latest-sales__more")[0].children[0].click();
        await sleep(500);
        const salesByCondition = getPriceData();
        document.getElementsByClassName("modal__overlay")[0].click();
        writeSalesDataContainer();
        displaySalesData(Object.entries(salesByCondition).sort((elementOne, elementTwo) => elementOne[1].totalQty - elementTwo[1].totalQty ).reverse());
        createSalesToggle();
    }

    function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

})();
