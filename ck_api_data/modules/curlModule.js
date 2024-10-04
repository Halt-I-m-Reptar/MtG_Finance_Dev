const jsonGetWorker = (listToPull, buylistClick) => {
    displayLoadIcon();
    /*
        We pull the buylist data, first thing, then run the selected data pull.
        If we have already pulled the buylist, then we just run the selected data pull.
     */

    if ( !ckCardDataFromSlug.buylist ) { fetchBuylist(listToPull, buylistClick); }
    else { listToPull(); }
}

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const fetchBuylist = ( listToPull, buylistClick = false) => {
    disableCKDataPull('getPrices', true);
    setListDomInnerHTML('listDisplay',`<strong>Gathering and collating all inventory from CK.</strong>`);

    const buylistUrl = getCheckedValue('whichSlug') ? "https://api.cardkingdom.com/api/pricelist" :
        "https://raw.githubusercontent.com/Halt-I-m-Reptar/MtG_Finance_Dev/master/ck_api_data/ck_slug/pricelist.json";

    fetch(buylistUrl, requestOptions)
        .then(response => response.json())
        .then(result => verifyAndShapeCKDataSet(result.data, result.meta, 'buylist', buylistClick))
        .then( () => { if ( !buylistClick ) { listToPull(); } })
        .catch(error => {
                disableCKDataPull('getPrices', false);
                writeError(error);
                setListDomInnerHTML('listDisplay', `<div class="warningText">There was an error:<br />${error}</div>`);
            }
        );
}

const fetchHotlist = () => {
    setListDomInnerHTML('listDisplay',`<strong>Gathering and collating the CK Hostlist.</strong>`);
    const hostListUrl = getCheckedValue('whichSlug') ? "https://api.cardkingdom.com/api/product/list/hotbuy" :
        "https://raw.githubusercontent.com/Halt-I-m-Reptar/MtG_Finance_Dev/master/ck_api_data/ck_slug/hotbuy.json";

    fetch(hostListUrl, requestOptions)
        .then(response => response.json())
        .then(result => verifyAndShapeCKDataSet(result.list, null, 'hotlist'))
        .catch(error => {
                displayLoadIcon();
                writeError(error);
                setListDomInnerHTML('listDisplay', `<div class="warningText">There was an error:<br />${error}</div>`);
            }
        );
}
