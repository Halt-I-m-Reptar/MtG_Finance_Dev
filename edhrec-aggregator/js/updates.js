function resetDisplay() {
    document.getElementById("displayTopCards").innerHTML = '';
}

function updateStatus(displayData) {
    document.getElementById("displayStatus").innerText = displayData.statusMsg;
}