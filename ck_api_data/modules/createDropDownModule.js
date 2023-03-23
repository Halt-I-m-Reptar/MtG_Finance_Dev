(function() {

    const createbuyPricePercentDropDown = () => {
        const cardTypeMap = {
            50: '50',
            55: '55',
            60: '60',
            65: '65',
            70: '70',
            75: '75',
        }

        appendItemsToSelect(getElementById("buylistPercentDiff"), cardTypeMap);
    }

    const appendItemsToSelect = (targetSelect, optionMap) => {
        Object.keys(optionMap).forEach( selector => {
            const createOption = document.createElement('option');
            createOption.value = selector;
            createOption.innerHTML = optionMap[selector];
            targetSelect.appendChild(createOption);
        }) ;
    }

    createbuyPricePercentDropDown();
})();
