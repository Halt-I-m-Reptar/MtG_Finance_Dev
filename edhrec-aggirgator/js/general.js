async function getTopCards() {

    window.isDebug = checkForDebug();

    var topcardArr = await getTopCardJson();
    outputTopCards(topcardArr);

}
function checkForDebug() {
    return window.location.search.includes("_debug=true");
}

function debugOutput(debugInfo) {
    console.log("element: " + debugInfo.name);
    console.log(debugInfo.data);
}