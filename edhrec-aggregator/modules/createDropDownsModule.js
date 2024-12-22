(function(){

    const createCardTypeDropdown = () => {
        const cardTypeMap = {
            creatures: 'Creatures',
            instants: 'Instants',
            sorceries: 'Sorceries',
            artifacts: 'Artifacts',
            enchantments: 'Enchantments',
            planeswalkers: 'Planeswalkers',
            lands: 'Lands',
        }

        appendItemsToSelect(getElementById("topCardsByType"), cardTypeMap);
    }

    const createCardColorDropdown = () => {
        const cardColorMap = {
            w: 'White',
            u: 'Blue',
            b: 'Black',
            r: 'Red',
            g: 'Green',
            colorless: 'Coloreless',
            multi: 'Multicolor'
        };

        appendItemsToSelect(getElementById("topCardsByColor"), cardColorMap);
    }

    const createCommanderColorDropdown = () => {
        const cardColorMap = {
            w: 'White',
            u: 'Blue',
            b: 'Black',
            r: 'Red',
            g: 'Green',
            colorless: 'Coloreless',
            wu: 'Azorius',
            ub: 'Dimir',
            br: 'Rakdos',
            rg: 'Gruul',
            gw: 'Selesnya',
            wb: 'Orzhov',
            ur: 'Izzet',
            bg: 'Golgari',
            rw: 'Boros',
            gu: 'Simic',
            wub: 'Esper',
            ubr: 'Grixis',
            brg: 'Jund',
            rgw: 'Naya',
            gwu: 'Bant',
            wbg: 'Abzan',
            urw: 'Jeskai',
            bgu: 'Sultai',
            rwb: 'Mardu',
            gur: 'Temur',
            wubr: 'Yore-Tiller (WUBR)',
            ubrg: 'Glint-Eye (UBRG)',
            brgw: 'Dune-Brood (BRGW)',
            rgwu: 'Ink-Treader (RGWU)',
            gwub: 'Witch-Maw (GWUB)',
            wubrg: '5 Color'
        };

        appendItemsToSelect(getElementById("topCommandersByColor"), cardColorMap);
    }

    const appendItemsToSelect = (targetSelect, optionMap) => {
        Object.keys(optionMap).forEach( selector => {
            const createOption = document.createElement('option');
            createOption.value = selector;
            createOption.innerHTML = optionMap[selector];
            targetSelect.appendChild(createOption);
        }) ;
    }

    createCardTypeDropdown();
    createCardColorDropdown();
    createCommanderColorDropdown();
})();
