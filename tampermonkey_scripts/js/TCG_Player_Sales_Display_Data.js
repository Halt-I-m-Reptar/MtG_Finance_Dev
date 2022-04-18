// ==UserScript==
// @name         TCG Player Sales Display Data
// @namespace    https://www.tcgplayer.com/
// @version      0.20
// @description  Remove obfuscation around TCG Player Sales Data
// @author       Peter Creutzberger
// @match        https://www.tcgplayer.com/product/*
// @icon         https://www.tcgplayer.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    writeDataRequestButton();

    const addCondition = () => ({
        totalSpend: 0,
        totalQtySold: 0,
        totalOrders:0,
        historicSalesData: {daysAgo:{}},
        avgQtyPerOrder: function(totalQtySold,totalOrders ) {
            return (totalQtySold / totalOrders).toFixed(2);
        },
        marketPriceByOrder: function(totalSpend, totalOrders) {
            return (totalSpend / totalOrders).toFixed(2);
        }
    });

    const cleanPriceValue = (price) => +price.replace(/[^0-9.]/g,'');

    const strToInt = (str) => +str;

    const shapeSalesData = (salesData) => salesData.length === 4 ? {date: salesData[0].innerText, condition: salesData[1].innerText, quantity: salesData[2].innerText, price: salesData[3].innerText} :
        {date: salesData[0].innerText, condition: `${salesData[2].innerText} with Photo`, quantity: salesData[3].innerText, price: salesData[4].innerText};

    const checkSaleDate = (salesArray, saleDate, price) => {
        if (!salesArray.earliestSaleDateData || !salesArray.latestSaleDateData) { return {earliestSaleDateData: {date: saleDate, price: price}, latestSaleDateData: {date: saleDate, price: price}}; }
        const dateFromSaleDate = new Date(saleDate).getTime();
        const dateFromEarliestSaleDate =  new Date(salesArray.earliestSaleDateData.date).getTime();
        if (dateFromSaleDate < dateFromEarliestSaleDate || dateFromSaleDate === dateFromEarliestSaleDate) { return Object.assign(salesArray, {earliestSaleDateData: {date: saleDate, price: price}}); }
        const dateFromLatestSaleDate = new Date(salesArray.latestSaleDateData.date).getTime();
        if (dateFromSaleDate > dateFromLatestSaleDate || dateFromSaleDate === dateFromLatestSaleDate) { return Object.assign(salesArray, {latestSaleDateData: {date: saleDate, price: price}}); }
    }

    const checkOrderQty = (salesArray, date, qty, price) => { if ( !salesArray.largestQtySold || salesArray.largestQtySold.qty < qty) { return {largestQtySold: {date: date, qty: qty, price: price}}; } }

    const historicDataSetting = (salesArray, saleDate, dateDiff, price, qty) => {
        if (!salesArray.historicSalesData.daysAgo || !salesArray.historicSalesData.daysAgo[dateDiff]) { return {totalSpend: price, totalQtySold: qty, totalOrders: 1, saleDate: saleDate}; }
        const historicSalesDataStatus = salesArray.historicSalesData.daysAgo[dateDiff];
        return {totalSpend: historicSalesDataStatus.totalSpend += price, totalQtySold: historicSalesDataStatus.totalQtySold += qty, totalOrders: historicSalesDataStatus.totalOrders += 1, saleDate: saleDate};
    }

    const gatherSalesData = () => {
        const salesByCondition = {};
        const modalDisplayLength = Array.from(document.getElementsByClassName("is-modal")).length -= 1;
        const historicDateArr = setHistoricDateArr(daysToLookBack());
        Array.from(document.getElementsByClassName("is-modal")[modalDisplayLength].children).forEach( (children, index) => {
            const listOfSales = Array.from(document.getElementsByClassName("is-modal")[modalDisplayLength].children);
            if (listOfSales[index]?.children[1]) {
                const reshapedSalesData = shapeSalesData( Array.from(listOfSales[index].children) );
                const currentCondition = reshapedSalesData.condition;
                if ( !Object.keys(salesByCondition).includes(currentCondition) ) { salesByCondition[currentCondition] = addCondition(); }
                const cleanPrice = cleanPriceValue(reshapedSalesData.price);
                salesByCondition[currentCondition].totalSpend += cleanPrice;
                salesByCondition[currentCondition].totalQtySold += strToInt(reshapedSalesData.quantity);
                salesByCondition[currentCondition].totalOrders += 1;
                Object.assign(salesByCondition[currentCondition],
                    checkOrderQty(salesByCondition[currentCondition], reshapedSalesData.date, strToInt(reshapedSalesData.quantity), cleanPrice),
                    checkSaleDate(salesByCondition[currentCondition], reshapedSalesData.date, cleanPrice)
                );
                const saleDateDiff = historicDateArr.includes(reshapedSalesData.date) ? getSaleDateDiff(todaysDate, reshapedSalesData.date) : -1;
                if ( saleDateDiff > -1 ) { salesByCondition[currentCondition].historicSalesData.daysAgo[saleDateDiff] = historicDataSetting(salesByCondition[currentCondition], reshapedSalesData.date, saleDateDiff, cleanPrice, strToInt(reshapedSalesData.quantity)); }
            }
        });
        return salesByCondition;
    }

    const adjustHeight = (div) => (parseInt(div.style.height.replace(/[a-zA-Z]/g,'')) + 115) + "px";

    const writeSalesDataContainer = () => {
        const div = document.createElement('div');
        const setBottom = document.getElementsByClassName("_hj_feedback_container")[0] ? 'bottom:100px' : 'bottom:0';
        div.innerHTML = (`<div class="salesDataDisplay" style="position:fixed;${setBottom};left:0;z-index:8888;width:auto;height:0;max-height:600px;overflow-y:scroll;padding:0 5px 0 0;border:1px solid #d00;background:#999;color:#fff;line-height:normal"></div>`);
        document.body.prepend(div);
    }

    const displaySalesData = (salesByCondition) => {
        const div = document.getElementsByClassName('salesDataDisplay')[0];
        salesByCondition.forEach(cardConditionData => {
            let displayString = buildSalesDataDisplay(cardConditionData[0], cardConditionData[1]);
            div.innerHTML += displayString;
            div.style.height = adjustHeight(div);
        });
    }

    const buildSalesDataDisplay = (cardCondition, cardConditionData) => {
        let displayString = `<div class="displayContainer"><strong>${cardCondition}</strong><br />
                <span id="totalSold" style="margin-left: 40px;">Total Sold: ${cardConditionData.totalQtySold} - Total Orders: ${cardConditionData.totalOrders} - Total Spend: ${cardConditionData.totalSpend.toFixed(2)}</span><br />
                <span id="avgQtyPerOrder" style="margin-left: 40px;">Avg Qty Per Order: ${ cardConditionData.avgQtyPerOrder(cardConditionData.totalQtySold,cardConditionData.totalOrders)}</span><br />
                <span id="earliestSaleDate" style="margin-left: 40px;">Earliest Sale Date: ${cardConditionData.earliestSaleDateData.date} - Sale Price ${cardConditionData.earliestSaleDateData?.price}</span><br />
                <span id="latestSaleData" style="margin-left: 40px;">Latest Sale Date: ${cardConditionData.latestSaleDateData.date} - Sale Price: ${cardConditionData.latestSaleDateData?.price}</span><br />
                <span id="largestOrderInfo" style="margin-left: 40px;">Largest Order... Date: ${cardConditionData.largestQtySold.date} - Qty: ${cardConditionData.largestQtySold.qty} - Price Per: ${cardConditionData.largestQtySold.price}</span>`;
        if ( Object.keys(cardConditionData.historicSalesData.daysAgo).length ) {
            displayString += `<br /><span id="historicSalesHeader" style="margin-left: 20px;"><strong>Historic Sales Data</strong></span><br />`;
            const historicSalesData = cardConditionData.historicSalesData;
            Object.keys(historicSalesData.daysAgo).forEach( daysAgo =>
                displayString += `<span id="${daysAgo}-daysAgoMarker" style="margin-left: 30px;"><strong>Days Ago: ${daysAgo} - ${historicSalesData.daysAgo[daysAgo].saleDate}</strong></span><br />
                        <span id="${daysAgo}-dayAgo-TotalSold" style="margin-left: 40px;">Total Orders: ${historicSalesData.daysAgo[daysAgo].totalOrders} - Total Spend: ${historicSalesData.daysAgo[daysAgo].totalSpend.toFixed(2)} - Total Qty Sold: ${historicSalesData.daysAgo[daysAgo].totalQtySold}</span><br />
                        <span id="${daysAgo}-dayAgo-AvgQtyPerOrder" style="margin-left: 40px;">Avg Qty Per Order: ${cardConditionData.avgQtyPerOrder(historicSalesData.daysAgo[daysAgo].totalQtySold, historicSalesData.daysAgo[daysAgo].totalOrders)}</span><br />
                        <span id="${daysAgo}-dayAgo-MarketPrice" style="margin-left: 40px;">Market Price: ${cardConditionData.marketPriceByOrder( historicSalesData.daysAgo[daysAgo].totalSpend, historicSalesData.daysAgo[daysAgo].totalOrders ) }</span><br />`
            );
        }
        displayString += '</div><br />';
        return displayString;
    }

    const decorateSalesHistoryHeader = () => {
        const fontColor = '#fa7ad0';
        const backgroundColor = '#7afaa4';
        document.getElementsByClassName('modal__title')[0].children[0].innerHTML = `<div style="color:${fontColor};background:${backgroundColor}">GATHERING SALES DATA</span>`;
    }

    const toggleGatherDataButton = () => { document.getElementsByClassName('dataRequestButton')[0].disabled = !document.getElementsByClassName('dataRequestButton')[0].disabled; }

    async function loadSalesDataSplash() {
        document.getElementsByClassName("price-guide__latest-sales__more")[0].children[0].click();
        await loadMoreSalesData();
        return gatherSalesData();
    }

    const beginSalesDataDisplay = (salesByCondition) => {
        document.getElementsByClassName("modal__overlay")[0].click();
        writeSalesDataContainer();
        displaySalesData(Object.entries(salesByCondition).sort((conditionOne, conditionTwo) => conditionOne[1].totalQtySold - conditionTwo[1].totalQtySold ).reverse());
    }

    async function loadMoreSalesData() {
        const max = 50;
        await sleep(500);
        decorateSalesHistoryHeader();
        for (let i = 0; i < max; i++) {
            await sleep(300);
            if (!document.getElementsByClassName('price-guide-modal__load-more')[0]) { i = max; }
            else { document.getElementsByClassName('price-guide-modal__load-more')[0].click(); }
        }
    }

    const sleep = (milliseconds) => { return new Promise(resolve => setTimeout(resolve, milliseconds)); }

    window.startDataRequest = function() {
        clearHtmlElements();
        if (!document.getElementsByClassName("price-guide__latest-sales__more")[0]?.children[0]) { alert('Please wait for the "View Sales History" link to load then click the button again.'); }
        else {
            toggleGatherDataButton();
            loadSalesDataSplash()
                .then(result => beginSalesDataDisplay(result))
                .then(() => writeSalesToggle())
                .finally(() => toggleGatherDataButton())
        }
    }

    /********************
     HTML element interaction
     ********************/

    const clearHtmlElements = () => {
        ['salesDataDisplay', 'salesDataToggle'].forEach( selector => {
            if ( document.getElementsByClassName(selector)[0] ) { document.getElementsByClassName(selector)[0].remove(); }
        });
    }

    window.toggleSalesData = function() {
        const display = document.getElementsByClassName('salesDataDisplay')[0].style.display;
        document.getElementsByClassName('salesDataDisplay')[0].style.display = display === 'none' ? 'inline' : 'none';
    }

    /********************
     Write interactive HTML elements
     ********************/

    const writeSalesToggle = () => {
        const div = document.createElement('div');
        div.innerHTML = ('<button class="salesDataToggle" style="position:fixed;top:45px;left:0;z-index:9999;width:auto;height:20px;padding:0 5px 0 0;background:#0b0;color:#fff;font-weight:bold;" onclick="toggleSalesData()">Toggle Sales Data Display</button>');
        document.body.prepend(div);
    }

    function writeDaysToLookBackSpinner() {
        const div = document.createElement('div');
        div.style = "position:fixed;top:0;left:0;z-index:9999;width:auto;height:27px;padding:0 5px 0 0;background:#a00;color:#fff;font-size:10pt;font-weight:bold;"
        div.innerHTML = ('Days to Look Back <input type="number" class="daysToLookBack" id="daysToLookBack" min="2" max="7" step="1" value="2" />');
        document.body.prepend(div);
    }

    function writeDataRequestButton() {
        writeDaysToLookBackSpinner();
        const div = document.createElement('div');
        div.innerHTML = ('<button class="dataRequestButton" style="position:fixed;top:25px;left:0;z-index:9999;width:auto;height:20px;padding:0 5px 0 0;background:#00b;color:#fff;font-weight:bold;" onclick="startDataRequest()">Gather Sales Data</button>');
        document.body.prepend(div);
    }

    /********************
     Re-inventing the wheel of time because we are not importing the moment library.
     ********************/

    const setHistoricDateArr = (daysToLookBack) => {
        let historicDatesArr = [];
        for (let dayCount = 0; dayCount <= daysToLookBack; dayCount++) {
            historicDatesArr.push( formatDateToTCG( new Date(Date.now() - (daysInMilliseconds(dayCount) ))) );
        }
        return historicDatesArr;
    }

    const formatDateToTCG = (date) => (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear().toString().slice(2);

    const parseStrDate = (stringDate) => {
        const dateArr = stringDate.split('/');
        return new Date(dateArr[2], dateArr[0] - 1, dateArr[1]);
    }

    const getSaleDateDiff = (firstDate, secondDate) => (parseStrDate(firstDate) - parseStrDate(secondDate)) / daysInMilliseconds(1);

    const daysInMilliseconds = (days = 1) => 1000 * 60 * 60 * (24 * days);

    const daysToLookBack = () => +document.getElementsByClassName('daysToLookBack')[0].value || 2;

    const todaysDate = formatDateToTCG(new Date());
})();
