const writeInformation = (productArr) => createRows(productArr);

const createTable = () => document.getElementById("listDisplay").innerHTML = '<table id="displayData" ><thead><tr><th>Name</th><th>Foil</th><th>Category</th><th>Condition</th><th>Buy Qty</th><th>Buy Price</th><th>Sell Qty</th><th>Hot Buy</th></tr></thead><tbody id="cardDisplayTable"></tbody></table>';

function createRows(productArr) {
    const table = document.getElementById("displayData");
    let cell;
    let row;
    productArr.forEach((productList) => {
        row = table.insertRow();
        Object.keys(productList).forEach((productInfo, index) => {
            cell = row.insertCell(index);
            cell.innerHTML = productList[productInfo];
            switch (index) {
                case 0:
                    cell.className = "cardName";
                    break;
                case 1:
                    cell.innerHTML = productList[productInfo] ? "&#10003;" : "";
                    cell.className = productList[productInfo] ? "foil" : "";
                    break;
                case 5:
                    cell.className = "buyPrice";
                    break;
                default:
                    cell.className = "";
            }
        });
    });
}
