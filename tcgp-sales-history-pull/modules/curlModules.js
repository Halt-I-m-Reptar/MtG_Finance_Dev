const curlRequest = (offset, cardId) => {
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json; charset=utf-8");

    const raw = `{listingType: "All", offset: ${ offset }, limit: 100, time: ${ Date.now() } }`;

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const url = `https://mpapi.tcgplayer.com/v2/product/${ cardId }/latestsales?mpfev=1385`;

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => workData(result))
        .catch(error => writeError(error));
}
