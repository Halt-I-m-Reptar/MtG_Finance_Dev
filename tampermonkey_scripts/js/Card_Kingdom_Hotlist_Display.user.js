// ==UserScript==
// @name         Card_Kingdom_Hotlist_Display
// @namespace    https://*cardkingdom.com/
// @version      0.7
// @description  Security through obfuscation is bad, m'kay.
// @author       Halt_I_m_Reptar (MtG Cabal Cast)
// @match        https://*cardkingdom.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //write toggle button
    var div = document.createElement('div');
    div.innerHTML = ('<button class="hotListTogle" style="position:fixed;top:0;left:0;z-index:999;width:120px;height:20px;padding:0 5px 0 0;background:#0b0;color:#fff;font-weight:bold;" onclick="toggleHotList()">Toggle Hotlist</button>');
    document.body.prepend(div);
    //write hotlist
    div = document.createElement('div');
    div.innerHTML = ('<div class="hotList" style="position:fixed;bottom:0;left:0;z-index:8888;width:auto;height:0px;max-height:600px;overflow-y:scroll;padding:0 5px 0 0;border:1px solid #d00;background:#fff"></div>');
    document.body.prepend(div);
    //display the hotlist
    beginDisplay();

    async function beginDisplay() {
        await sleep(1000);
        var hotListMap = readableList(mapCards(getSlideContent()));
        var div = document.getElementsByClassName('hotList')[0];
        hotListMap.forEach( itemInfo => {
            div.style.height = adjustHeight(div);
            div.innerHTML += itemInfo;
        });
    }

    window.toggleHotList = function() {
        var display = document.getElementsByClassName('hotList')[0].style.display;
        document.getElementsByClassName('hotList')[0].style.display = display === 'none' ? 'inline' : 'none';
    }

    function sleep (milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    function getSlideContent() {
        return Array.from(document.getElementsByClassName("slick-slide"));
    }

    function mapCards(slideArr) {
        return slideArr.map( (elem) => {
            if (elem.innerText.match(/:/g).length > 1) {
                return elem.innerText.replace(/[\n\r]+/g,'--').replace(/:([^:]*):\s/g,'$1--');
            }
            return elem.innerText.replace(/[\n\r]+/g,'--').replace(": ","--")
        });
    }

    function readableList(cardList) {
        return cardList.map(elem => {
            var tempName = elem.split("--");
            //return tempName[1] + ' - ' + tempName[0] + ' - ' + tempName[2];
            return '<a href="https://cardkingdom.com/purchasing/mtg_singles?filter%5Bsort%5D=price_desc&filter%5Bsearch%5D=mtg_advanced&filter%5Bname%5D=' + tempName[1] + '&filter%5Bcategory_id%5D=0&filter%5Bfoil%5D=1&filter%5Bnonfoil%5D=1&filter%5Bprice_op%5D=&filter%5Bprice%5D=" target="_blank">' + tempName[1] + ' - ' + tempName[0] + ' - ' + tempName[2] + '</a><br />';
        }).sort();
    }

    function adjustHeight(div) {
        return (parseInt(div.style.height.replace(/[a-zA-Z]/g,'')) + 20) + "px";
    }

})();
