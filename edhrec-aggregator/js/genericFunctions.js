async function getTopCards() {
    resetDisplay();
    window.isDebug = checkForDebug();
    outputTopCards( await getTopCardJson(document.querySelector('input[class="recSelection"]:checked').value) );
}

const checkForDebug = () => window.location.search.includes("_debug=true");

const debugOutput = (debugInfo) => {
    console.log("element: " + debugInfo.name);
    console.log(debugInfo.data);
}

function toggleVisibility() {
    ['pastweek', 'pastmonth', 'past2years'].forEach(dateRange => {
        $("." + dateRange + "").click(function (e) {
            $("#" + dateRange + "-table").toggle("fold");
        });
    });
}

const resetDisplay = () => document.getElementById("displayTopCards").innerHTML = '';
