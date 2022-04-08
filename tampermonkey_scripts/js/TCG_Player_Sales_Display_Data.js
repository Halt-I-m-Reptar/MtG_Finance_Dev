// ==UserScript==
// @name         TCG Player Sales Display Data
// @namespace    https://www.tcgplayer.com/
// @version      0.13
// @description  Remove obfuscation around TCG Player Sales Data
// @author       Peter Creutzberger
// @match        https://www.tcgplayer.com/product/*
// @icon         https://www.tcgplayer.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    createDataRequestButton();

    const fetchPriceData = () => {
        const salesByCondition = {};
        const modalDisplayLength = Array.from(document.getElementsByClassName("is-modal")).length -= 1;
        Array.from(document.getElementsByClassName("is-modal")[modalDisplayLength].children).forEach( (children, index) => {
            const listOfSales = Array.from(document.getElementsByClassName("is-modal")[modalDisplayLength].children);
            if (listOfSales[index]?.children[1]) {
                const reshapedSalesData = shapeSalesData( Array.from(listOfSales[index].children) );
                const currentCondition = reshapedSalesData.condition;
                if ( !Object.keys(salesByCondition).includes(currentCondition) ) {
                    salesByCondition[currentCondition] = addConditionToArray();
                }
                const cleanPrice = cleanPriceValue(reshapedSalesData.price);
                salesByCondition[currentCondition].totalPrice += cleanPrice;
                salesByCondition[currentCondition].totalQtySold += strToInt(reshapedSalesData.quantity);
                salesByCondition[currentCondition].totalOrders += 1;
                Object.assign(salesByCondition[currentCondition], checkSaleDate(salesByCondition[currentCondition], reshapedSalesData.date, cleanPrice));
            }
        });
        return salesByCondition;
    }

    const shapeSalesData = (salesData) => salesData.length === 4 ? {date: salesData[0].innerText, condition: salesData[1].innerText, quantity: salesData[2].innerText, price: salesData[3].innerText} :
        {date: salesData[0].innerText, condition: `${salesData[2].innerText} with Photo`, quantity: salesData[3].innerText, price: salesData[4].innerText};

    const addConditionToArray = () => ({
        totalPrice: 0,
        totalQtySold: 0,
        totalOrders:0,
        avgMarketPriceByQty: function() {
            return (this.totalPrice / this.totalQtySold).toFixed(2);
        },
        marketPriceByOrder: function() {
            return (this.totalPrice / this.totalOrders).toFixed(2);
        }
    });

    const checkSaleDate = (salesArray, saleDate, price) => {
        if (!salesArray.earliestSaleDateData || !salesArray.latestSaleDateData) {
            return {earliestSaleDateData: {date: saleDate, price: price}, latestSaleDateData: {date: saleDate, price: price}};
        }
        if (new Date(saleDate).getTime() < new Date(salesArray?.earliestSaleDateData?.date).getTime() || new Date(saleDate).getTime() === new Date(salesArray?.earliestSaleDateData?.date).getTime()) {
            return Object.assign(salesArray, {earliestSaleDateData: {date: saleDate,price: price}});
        }
        if (new Date(saleDate).getTime() > new Date(salesArray?.latestSaleDateData?.date).getTime() || new Date(saleDate).getTime() === new Date(salesArray?.latestSaleDateData?.date).getTime()) {
            return Object.assign(salesArray, {latestSaleDateData: {date: saleDate,price: price}});
        }
    }

    const cleanPriceValue = (price) => +price.substring(1);

    const strToInt = (str) => +str;

    const displaySalesData = (salesByCondition) => {
        const div = document.getElementsByClassName('salesDataDisplay')[0];
        salesByCondition.forEach(condition => {
            const displayString = `<div class="displayContainer"><strong>${condition[0]}</strong><br />
                <span id="conditionData" style="margin-left: 40px;">Total Sold: ${condition[1].totalQtySold} - Total Orders: ${condition[1].totalOrders} - Total Price: ${condition[1].totalPrice.toFixed(2)}</span><br />
                <span id="conditionData" style="margin-left: 40px;">Avg Qty Per Order: ${(condition[1].totalQtySold / condition[1].totalOrders).toFixed(2)}</span><br />
                <span id="conditionData" style="margin-left: 40px;">Market Price By Qty (Avg): ${condition[1].avgMarketPriceByQty()} - Market Price By Order: ${condition[1].marketPriceByOrder()}</span><br />
                <span id="earliestSaleDateDataData" style="margin-left: 40px;">Earliest Sale Date: ${condition[1]?.earliestSaleDateData?.date} - Sale Price ${condition[1]?.earliestSaleDateData?.price}</span><br />
                <span id="maxData" style="margin-left: 40px;">Latest Sale Date: ${condition[1]?.latestSaleDateData?.date} - Sale Price: ${condition[1]?.latestSaleDateData?.price}</span></div>`;
            div.innerHTML += displayString + "<br />";
            div.style.height = adjustHeight(div);
        });
    }

    const adjustHeight = (div) => (parseInt(div.style.height.replace(/[a-zA-Z]/g,'')) + 115) + "px";

    const checkForSalesData = () => {
        if (document.getElementsByClassName("price-guide__latest-sales__more")[0]?.children[0]) { beginSalesDataDisplay(); }
        else { console.warn('Sales History was inaccessible.'); }
    }

    async function beginSalesDataDisplay() {
        document.getElementsByClassName("price-guide__latest-sales__more")[0].children[0].click();
        await sleep(500);
        loadMoreSalesData();
        await sleep(1000);
        document.getElementsByClassName("modal__overlay")[0].click();
        writeSalesData();
    }

    const loadMoreSalesData = () => {
        const max = 50;
        for (let i = 0; i < max; i++) {
            if (!document.getElementsByClassName('price-guide-modal__load-more')[0]) { i = max; }
            else { document.getElementsByClassName('price-guide-modal__load-more')[0].click(); }
        }
    }

    const writeSalesData = () => {
        writeSalesDataContainer();
        displaySalesData(Object.entries(fetchPriceData()).sort((elementOne, elementTwo) => elementOne[1].totalQtySold - elementTwo[1].totalQtySold ).reverse());
        createSalesToggle();
    }

    const clearHtmlElements = () => {
        const htmlElementsToClear = ['salesDataDisplay', 'salesDataToggle'];
        htmlElementsToClear.forEach( selector => {
            if ( document.getElementsByClassName(selector)[0] ) { document.getElementsByClassName(selector)[0].remove(); }
        });
    }

    const createSalesToggle = () => {
        const div = document.createElement('div');
        div.innerHTML = ('<button class="salesDataToggle" style="position:fixed;top:20px;left:0;z-index:9999;width:auto;height:20px;padding:0 5px 0 0;background:#0b0;color:#fff;font-weight:bold;" onclick="toggleSalesData()">Toggle Sales Data Display</button>');
        document.body.prepend(div);
    }

    const writeSalesDataContainer = () => {
        const div = document.createElement('div');
        const setBottom = document.getElementsByClassName("_hj_feedback_container") ? 'bottom:100px' : 'bottom:0';
        div.innerHTML = (`<div class="salesDataDisplay" style="position:fixed;${setBottom};left:0;z-index:8888;width:auto;height:0;max-height:300px;overflow-y:scroll;padding:0 5px 0 0;border:1px solid #d00;background:#999;color:#fff;line-height:normal"></div>`);
        document.body.prepend(div);
    }

    window.toggleSalesData = function() {
        const display = document.getElementsByClassName('salesDataDisplay')[0].style.display;
        document.getElementsByClassName('salesDataDisplay')[0].style.display = display === 'none' ? 'inline' : 'none';
    }

    window.startDataRequest = function() {
        clearHtmlElements();
        checkForSalesData();
    }

    function createDataRequestButton() {
        const div = document.createElement('div');
        div.innerHTML = ('<button class="dataRequestButton" style="position:fixed;top:0;left:0;z-index:9999;width:auto;height:20px;padding:0 5px 0 0;background:#00b;color:#fff;font-weight:bold;" onclick="startDataRequest()">Gather Sales Data</button>');
        document.body.prepend(div);
    }

    function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

})();

