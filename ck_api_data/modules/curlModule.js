const jsonGetWorker = () => {
    disableCKDataPull('getPrices');
    setListDomInnerHTML('listDisplay',"<strong>Gathering and collating all inventory from CK.</strong>");
    displayLoadIcon();
    fetchBuylist();
}

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const fetchBuylist = () => {
    const buylistUrl = getCheckedValue('whichSlug') ? "https://api.cardkingdom.com/api/pricelist" : "https://raw.githubusercontent.com/Halt-I-m-Reptar/MtG_Finance_Dev/master/ck_api_data/ck_slug/pricelist.json";

    fetch(buylistUrl, requestOptions)
        .then(response => response.json())
        .then(result => verifyAndShapeCKDataSet(result))
        .catch(error => {
                writeError(error);
                setListDomInnerHTML('listDisplay', `<div class="warningText">There was an error:<br />${error}</div>`);
            }
        );
}

const fetchHotlist = () => {

    //disable button after click
    const hostListUrl = "https://api.cardkingdom.com/api/product/list/hotbuy";

    fetch(hostListUrl, requestOptions)
        .then(response => response.json())
        .then(result => verifyAndShapeCKDataSet(result))
        .catch(error => {
                writeError(error);
                setListDomInnerHTML('listDisplay', `<div class="warningText">There was an error:<br />${error}</div>`);
            }
        );
}

/*
    TODO:
        update jsonGetWorker() flow to take in a function name and run that instead of hard coding
        reshape CK object to house both the buylist and the hotlist
        disable fetchHotlist button after run
 */
