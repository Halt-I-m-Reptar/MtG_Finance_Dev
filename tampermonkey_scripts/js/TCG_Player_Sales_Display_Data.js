// ==UserScript==
// @name         TCG Player Sales Display Data
// @namespace    https://www.tcgplayer.com/
// @version      0.1
// @description  Unobfuscate TCG Player Sales Data
// @author       Peter Creutzberger
// @match        https://www.tcgplayer.com/product/*
// @icon         https://www.tcgplayer.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', (event) => {
        beginDisplay();
    });

    async function beginDisplay() {
        await sleep(5000);
        console.log('done napping');
        console.log(document.readyState);
        document.getElementsByClassName("price-guide__latest-sales__more")[0].children[0].click();

        const salesByCondition = getPriceData();

        document.getElementsByClassName("modal__overlay")[0].click();

        writeHotlist(salesByCondition);
        displayHostlist(salesByCondition);
    }

    function sleep() {
        (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    const getPriceData = () => {
        const salesByCondition = {};

        Array.from(document.getElementsByClassName("is-modal")[0].children).forEach( (children, index) => {
            let listOfSales = Array.from(document.getElementsByClassName("is-modal")[0].children);
            if (listOfSales[index].children[1]) {
                let currentCondition = listOfSales[index].children[1].innerText;
                if ( !Object.keys(salesByCondition).includes(currentCondition) ) {
                    salesByCondition[currentCondition] = addCondition();
                }
                salesByCondition[currentCondition].totalPrice += cleanPrice(listOfSales[index].children[2].innerText);
                salesByCondition[currentCondition].totalQty += 1;
            }
        });

        return salesByCondition;
    }

    const addCondition = (condition) => ({
        totalPrice: 0,
        totalQty: 0,
        averagePrice: 0
    });

    const cleanPrice = (price) => +price.substring(1);

    const adjustHeight = (div) => (parseInt(div.style.height.replace(/[a-zA-Z]/g,'')) + 25) + "px";

    const writeHotlist = (salesByCondition) => {
        const div = document.createElement('div');
        div.innerHTML = ('<div class="pricesList" style="position:fixed;bottom:0;left:0;z-index:9999;width:auto;height:0px;padding:0 5px 0 0;border:1px solid #d00;background:#fff"></div>');
        document.body.prepend(div);
    }

    const displayHostlist = (salesByCondition) => {
        //display the hotlist
        const div = document.getElementsByClassName('pricesList')[0];

        Object.keys(salesByCondition).forEach(condition => {
            const totalPrice = salesByCondition[condition].totalPrice.toFixed(2);
            const totalQty = salesByCondition[condition].totalQty;
            const priceAverage = (totalPrice / totalQty).toFixed(2);
            const displayString = `<strong>${condition}</strong> - Total Price: ${totalPrice} - Total Qty: ${totalQty} - Average Price: ${priceAverage}`;
            div.innerHTML += displayString + "<br />";
            div.style.height = adjustHeight(div);
        });
    }

})();