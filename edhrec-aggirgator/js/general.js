async function getTopCards() {
    resetDisplay();

    window.isDebug = checkForDebug();

    outputTopCards( await getTopCardJson(document.querySelector('input[class="recSelection"]:checked').value) );
}

function checkForDebug() {
    return window.location.search.includes("_debug=true");
}

function debugOutput(debugInfo) {
    console.log("element: " + debugInfo.name);
    console.log(debugInfo.data);
}