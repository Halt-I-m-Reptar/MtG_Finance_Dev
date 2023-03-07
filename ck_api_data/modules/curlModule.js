const jsonGetWorker = () => {
    disableCKDataPull('getPrices');
    setListDomInnerHTML('listDisplay',"<strong>Gathering and collating all inventory from CK.</strong>");
    displayLoadIcon();
    curlRequest();
}

const curlRequest = () => {
    const url = getCheckedValue('whichSlug') ? "https://api.cardkingdom.com/api/pricelist" : "https://raw.githubusercontent.com/Halt-I-m-Reptar/MtG_Finance_Dev/master/ck_api_data/ck_slug/pricelist.json";

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => verifyAndShapeCKDataSet(result))
        .catch(error => {
                writeError(error);
                setListDomInnerHTML('listDisplay', `<div class="warningText">There was an error:<br />${error}</div>`);
            }
        );
}
