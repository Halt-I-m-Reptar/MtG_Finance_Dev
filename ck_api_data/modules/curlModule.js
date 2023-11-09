const jsonGetWorker = (listToPull) => {
    displayLoadIcon();
    listToPull();
}

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const fetchBuylist = () => {
    disableCKDataPull('getPrices');
    setListDomInnerHTML('listDisplay',`<strong>Gathering and collating all inventory from CK.</strong>`);

    const buylistUrl = getCheckedValue('whichSlug') ? "https://api.cardkingdom.com/api/pricelist" : "https://raw.githubusercontent.com/Halt-I-m-Reptar/MtG_Finance_Dev/master/ck_api_data/ck_slug/pricelist.json";

    fetch(buylistUrl, requestOptions)
        .then(response => response.json())
        .then(result => verifyAndShapeCKDataSet(result.data, result.meta, 'buylist'))
        .catch(error => {
                disableCKDataPull('getPrices');
                writeError(error);
                setListDomInnerHTML('listDisplay', `<div class="warningText">There was an error:<br />${error}</div>`);
            }
        );
}

const fetchHotlist = () => {
    if ( !ckCardDataFromSlug.buylist) { fetchBuylist(); }
    setListDomInnerHTML('listDisplay',`<strong>Gathering and collating the CK Hostlist.</strong>`);

    const hostListUrl = "https://api.cardkingdom.com/api/product/list/hotbuy";

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
