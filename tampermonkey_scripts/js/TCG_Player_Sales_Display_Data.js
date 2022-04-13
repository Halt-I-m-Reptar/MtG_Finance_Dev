// ==UserScript==
// @name         TCG Player Sales Display Data
// @namespace    https://www.tcgplayer.com/
// @version      0.17
// @description  Remove obfuscation around TCG Player Sales Data
// @author       Peter Creutzberger
// @match        https://www.tcgplayer.com/product/*
// @icon         https://www.tcgplayer.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    createDataRequestButton();

    const addCondition = () => ({
        totalPrice: 0,
        totalQtySold: 0,
        totalOrders:0,
        historicSalesData: {daysAgo:{}},
        avgMarketPriceByQty: function(totalPrice,totalQtySold ) {
            return (totalPrice / totalQtySold).toFixed(2);
        },
        marketPriceByOrder: function(totalPrice, totalOrders) {
            return (totalPrice / totalOrders).toFixed(2);
        }
    });

    const cleanPriceValue = (price) => +(+(price.replace(',','').substring(1))).toFixed(2)

    const strToInt = (str) => +str;

    const shapeSalesData = (salesData) => salesData.length === 4 ? {date: salesData[0].innerText, condition: salesData[1].innerText, quantity: salesData[2].innerText, price: salesData[3].innerText} :
        {date: salesData[0].innerText, condition: `${salesData[2].innerText} with Photo`, quantity: salesData[3].innerText, price: salesData[4].innerText};

    const checkSaleDate = (salesArray, saleDate, price) => {
        if (!salesArray.earliestSaleDateData || !salesArray.latestSaleDateData) { return {earliestSaleDateData: {date: saleDate, price: price}, latestSaleDateData: {date: saleDate, price: price}}; }
        if (new Date(saleDate).getTime() < new Date(salesArray?.earliestSaleDateData?.date).getTime() || new Date(saleDate).getTime() === new Date(salesArray?.earliestSaleDateData?.date).getTime()) { return Object.assign(salesArray, {earliestSaleDateData: {date: saleDate,price: price}}); }
        if (new Date(saleDate).getTime() > new Date(salesArray?.latestSaleDateData?.date).getTime() || new Date(saleDate).getTime() === new Date(salesArray?.latestSaleDateData?.date).getTime()) { return Object.assign(salesArray, {latestSaleDateData: {date: saleDate,price: price}}); }
    }

    const checkOrderQty = (salesArray, date, qty, price) => { if ( !salesArray.largestQtySold || salesArray.largestQtySold.qty < qty) { return {largestQtySold: {date: date, qty: qty, price: price}}; } }

    const historicDataSetting = (salesArray, saleDate, dateDiff, price, qty) => {
        if (!salesArray.historicSalesData.daysAgo || !salesArray.historicSalesData.daysAgo[dateDiff]) { return {totalPrice: price, totalQtySold: qty, totalOrders: 1, saleDate: saleDate}; }
        const historicSalesDataStatus = salesArray.historicSalesData.daysAgo[dateDiff];
        return {totalPrice: historicSalesDataStatus.totalPrice += price, totalQtySold: historicSalesDataStatus.totalQtySold += qty, totalOrders: historicSalesDataStatus.totalOrders += 1, saleDate: saleDate};
    }

    const gatherSalesData = () => {
        const salesByCondition = {};
        const modalDisplayLength = Array.from(document.getElementsByClassName("is-modal")).length -= 1;
        const daysToLookBack = 2;
        const historicDateArr = getHistoricDates(daysToLookBack);
        const todaysDate = formatDateToTCG(new Date());
        Array.from(document.getElementsByClassName("is-modal")[modalDisplayLength].children).forEach( (children, index) => {
            const listOfSales = Array.from(document.getElementsByClassName("is-modal")[modalDisplayLength].children);
            if (listOfSales[index]?.children[1]) {
                const reshapedSalesData = shapeSalesData( Array.from(listOfSales[index].children) );
                const currentCondition = reshapedSalesData.condition;
                if ( !Object.keys(salesByCondition).includes(currentCondition) ) { salesByCondition[currentCondition] = addCondition(); }
                const cleanPrice = cleanPriceValue(reshapedSalesData.price);
                salesByCondition[currentCondition].totalPrice += cleanPrice;
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

    const createSalesToggle = () => {
        const div = document.createElement('div');
        div.innerHTML = ('<button class="salesDataToggle" style="position:fixed;top:20px;left:0;z-index:9999;width:auto;height:20px;padding:0 5px 0 0;background:#0b0;color:#fff;font-weight:bold;" onclick="toggleSalesData()">Toggle Sales Data Display</button>');
        document.body.prepend(div);
    }

    function createDataRequestButton() {
        const div = document.createElement('div');
        div.innerHTML = ('<button class="dataRequestButton" style="position:fixed;top:0;left:0;z-index:9999;width:auto;height:20px;padding:0 5px 0 0;background:#00b;color:#fff;font-weight:bold;" onclick="startDataRequest()">Gather Sales Data</button>');
        document.body.prepend(div);
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
        salesByCondition.forEach(condition => {
            let displayString = `<div class="displayContainer"><strong>${condition[0]}</strong><br />
                <span id="totalSold" style="margin-left: 40px;">Total Sold: ${condition[1].totalQtySold} - Total Orders: ${condition[1].totalOrders} - Total Price: ${condition[1].totalPrice}</span><br />
                <span id="avgQtyPerOrder" style="margin-left: 40px;">Avg Qty Per Order: ${(condition[1].totalQtySold / condition[1].totalOrders)}</span><br />
                <span id="earliestSaleDate" style="margin-left: 40px;">Earliest Sale Date: ${condition[1]?.earliestSaleDateData?.date} - Sale Price ${condition[1]?.earliestSaleDateData?.price}</span><br />
                <span id="latestSaleData" style="margin-left: 40px;">Latest Sale Date: ${condition[1]?.latestSaleDateData?.date} - Sale Price: ${condition[1]?.latestSaleDateData?.price}</span><br />
                <span id="largestOrderInfo" style="margin-left: 40px;">Largest Order... Date: ${condition[1].largestQtySold.date} - Qty: ${condition[1].largestQtySold.qty} - Price Per: ${condition[1].largestQtySold.price}</span>`;
            if ( Object.keys(condition[1].historicSalesData.daysAgo).length ) {
                displayString += `<br /><span id="historicSalesHeader" style="margin-left: 20px;"><strong>Historic Sales Data</strong></span><br />`;
                Object.keys(condition[1].historicSalesData.daysAgo).forEach( daysAgo =>
                    displayString += `<span id="${daysAgo}-daysAgoMarker" style="margin-left: 30px;"><strong>Days Ago: ${daysAgo} - ${condition[1].historicSalesData.daysAgo[daysAgo].saleDate}</strong></span><br />
                        <span id="${daysAgo}-dayAgo-TotalSold" style="margin-left: 40px;">Total Orders: ${condition[1].historicSalesData.daysAgo[daysAgo].totalOrders} - Total Price: ${condition[1].historicSalesData.daysAgo[daysAgo].totalPrice} - Total Qty Sold: ${condition[1].historicSalesData.daysAgo[daysAgo].totalQtySold}</span><br />
                        <span id="${daysAgo}-dayAgo-AvgQtyPerOrder" style="margin-left: 40px;">Avg Qty Per Order: ${(condition[1].historicSalesData.daysAgo[daysAgo].totalQtySold / condition[1].historicSalesData.daysAgo[daysAgo].totalOrders)}</span><br />
                        <span id="${daysAgo}-dayAgo-MarketPrice" style="margin-left: 40px;">Market Price: ${condition[1].marketPriceByOrder( condition[1].historicSalesData.daysAgo[daysAgo].totalPrice, condition[1].historicSalesData.daysAgo[daysAgo].totalOrders ) }</span><br />`
                );
            }
            displayString += '</div><br />';
            div.innerHTML += displayString;
            div.style.height = adjustHeight(div);
        });
    }

    const clearHtmlElements = () => {
        ['salesDataDisplay', 'salesDataToggle'].forEach( selector => {
            if ( document.getElementsByClassName(selector)[0] ) { document.getElementsByClassName(selector)[0].remove(); }
        });
    }

    const decorateSalesHistoryHeader = () => {
        const fontColor = '#fa7ad0';
        const backgroundColor =  '#7afaa4';
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
        displaySalesData(Object.entries(salesByCondition).sort((elementOne, elementTwo) => elementOne[1].totalQtySold - elementTwo[1].totalQtySold ).reverse());
        createSalesToggle();
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

    window.toggleSalesData = function() {
        const display = document.getElementsByClassName('salesDataDisplay')[0].style.display;
        document.getElementsByClassName('salesDataDisplay')[0].style.display = display === 'none' ? 'inline' : 'none';
    }

    window.startDataRequest = function() {
        clearHtmlElements();
        if (document.getElementsByClassName("price-guide__latest-sales__more")[0]?.children[0]) {
            toggleGatherDataButton();
            loadSalesDataSplash()
                .then(result => beginSalesDataDisplay(result))
                .finally(() => toggleGatherDataButton())
        }
        else { alert('Please wait for the "View Sales History" link to load then click the button again.'); }
    }

    /*
        Re-inventing the wheel because we are not importing the moment library.
     */
    const getHistoricDates = ( daysToLookBack ) => {
        const dayInMilliseconds = 1000 * 60 * 60 * 24;
        let historicDatesArr = [];
        for (let dayCount = 0; dayCount <= daysToLookBack; dayCount++) {
            historicDatesArr.push( formatDateToTCG( new Date(Date.now() - (dayInMilliseconds * dayCount)) ) );
        }

        return historicDatesArr;
    }

    const formatDateToTCG = (date) => {
        let curMonth = date.getMonth();
        return (curMonth + 1) + '/' + date.getDate() + '/' + date.getFullYear().toString().slice(2);
    }

    const parseStrDate = (stringDate) => {
        const dateArr = stringDate.split('/');
        return new Date(dateArr[2], dateArr[0] - 1, dateArr[1]);
    }

    const getSaleDateDiff = (firstDate, secondDate) => {
        const dayInMilliseconds = 1000 * 60 * 60 * 24;
        return (parseStrDate(firstDate) - parseStrDate(secondDate)) / dayInMilliseconds;
    }

})();
