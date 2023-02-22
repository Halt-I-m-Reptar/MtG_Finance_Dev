const jsonGetWorker = () => {
    disableCKDataPull();
    writeContentToDisplay(`Gathering and collating all inventory from CK.`);
    displayLoadIcon();
    curlRequest();
}

const curlRequest = () => {
    //const url = slugChoice() ? "https://api.cardkingdom.com/api/pricelist" : "https://raw.githubusercontent.com/Halt-I-m-Reptar/MtG_Finance_Dev/master/ck_api_data/ck_slug/pricelist.json";
    //card results
    const url = "https://json.edhrec.com/pages/commanders/sliver-queen.json";
    //top cards per year
    //https://json.edhrec.com/pages/top/year.json
    // top commanders per year
    // https://json.edhrec.com/pages/commanders/year.json
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => createCKDataSet(result))
        .catch(error => writeError(error));
}

const createCKDataSet = (result) => console.table(result);

/*
URL Shapes
Individual Card
https://json.edhrec.com/pages/commanders/sliver-queen.json

top cards per year
https://json.edhrec.com/pages/top/year.json


top commanders per 2 years
https://json.edhrec.com/pages/commanders/year.json
https://json.edhrec.com/pages/commanders/month.json
https://json.edhrec.com/pages/commanders/week.json

commanders by color
https://json.edhrec.com/pages/commanders/w.json

https://json.edhrec.com/pages/commanders/wu.json
https://json.edhrec.com/pages/commanders/gwu.json
https://json.edhrec.com/pages/commanders/gwub.json
https://json.edhrec.com/pages/commanders/wubrg.json
 */
