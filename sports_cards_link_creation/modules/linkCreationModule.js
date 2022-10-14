const linkWorker = () => {
    createTable();
    writeLinks(readTextArea());
}

const readTextArea = () => document.getElementById("productNames").value.split("\n");

const createTable = () => document.getElementById("listDisplay").innerHTML = '<table id="displayData" class="displayData"><thead><tr><th>Store Name</th><th>Product Name</th><th>Product URL</th></tr></thead><tbody id="productDisplayTable"></tbody></table>';

const createLinkForDisplay = url  => `<a href="${url}" target="_blank">${url}</a>`;

function writeLinks(productArr) {
    const storeListObj = getStoreList();
    const table = document.getElementById("displayData");
    let cell;
    let row;
    Object.keys( storeListObj ).forEach( storeKey => {
        productArr.forEach( productName => {
            row = table.insertRow();
            cell = row.insertCell(0);
            cell.innerHTML = `${storeKey}`;
            cell = row.insertCell(1);
            cell.innerHTML = `${productName}`;
            cell = row.insertCell(2);
            cell.innerHTML = createLinkForDisplay(`${storeListObj[storeKey].url}${productName}` );
        });
    });
}
