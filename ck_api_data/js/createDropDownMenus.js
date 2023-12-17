(function() {

    const createBuyPricePercentDropDown = () => {
        const cardTypeMap = {
            50: ['50', ''],
            55: ['55', ''],
            60: ['60', 'selected'],
            65: ['65', ''],
            70: ['70', ''],
            75: ['75', ''],
        }

        appendItemsToSelect(getElementById("buylistPercentDiff"), cardTypeMap);
    }

    const createBuyPricePercentSortOptions = () => {
        const sortOptionsMap = {
            'retailBuyPricePercent': ['Buy Price Percent', ''],
            'price_retail': ['Retail Price', ''],
            'price_buy': ['Buy Price', ''],
            'qty_buying': ['Buy Quantity', 'selected'],
            'qty_retail': ['Retail Quantity', ''],
        }

        appendItemsToSelect(getElementById("buylistPercentDiffSort"), sortOptionsMap);
    }

    const appendItemsToSelect = (targetSelect, optionMap) => {
        Object.keys(optionMap).forEach( selectorOptions => {
            const createOption = document.createElement('option');
            createOption.value = selectorOptions ;
            createOption.innerHTML = optionMap[ selectorOptions ][0] ;
            createOption.selected = optionMap[ selectorOptions ][1];
            targetSelect.appendChild(createOption);
        }) ;
    }

    createBuyPricePercentDropDown();
    createBuyPricePercentSortOptions();
})();
