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
/* New functions */
const resetDisplay = () => document.getElementById("displayTopCards").innerHTML = '';

const writeError = (err) => console.log("There was an error: "+err);

const writeContentToDisplay = (msg) => document.getElementById("displayStatus").innerHTML = "<strong>"+msg+"</strong>";

const displayLoadIcon = () => document.getElementById("loader").style.display = (document.getElementById("loader").style.display === "none" || document.getElementById("loader").style.display === "") ? "inherit" : "none";
