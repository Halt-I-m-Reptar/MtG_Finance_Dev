// ==UserScript==
// @name         Card_Kingdom_Hotlist_Display
// @namespace    https://www.cardkingdom.com/
// @version      0.1
// @description  Security through obfuscation is bad, m'kay.
// @author       Halt-I-Am-Reptar (MtG Cabal Cast)
// @match        https://www.cardkingdom.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var div = document.createElement('div');
    div.innerHTML = ('<div class="hotList" style="position:fixed;bottom:0;left:0;z-index:999;width:auto;height:0px;padding:0 5px 0 0;border:1px solid #d00;background:#fff"></div>');
    document.body.prepend(div);

    beginDisplay();

    async function beginDisplay() {
        await sleep(1000);
        var hotListMap = mapCards(getSlideContent());
        var div = document.getElementsByClassName('hotList')[0];
        hotListMap.forEach( itemInfo => {
            div.style.height = adjustHeight(div);
            div.innerText += itemInfo;
        }
                          );
    }

    function sleep (milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    function getSlideContent() {
        return Array.from(document.getElementsByClassName("sliderDescription"));
    }

    function mapCards(slideArr) {
        return slideArr.map(elem => elem.innerText.replace(/[\n\r]+/g,' - ') + "\n\t").sort();
    }

    function adjustHeight(div) {
        return (parseInt(div.style.height.replace(/[a-zA-Z]/g,'')) + 20) + "px";
    }

})();