const resetDisplay = () => document.getElementById("displayTopCards").innerHTML = '';

const writeError = (err) => console.log("There was an error: "+err);

const writeContentToDisplay = (msg) => document.getElementById("displayStatus").innerHTML = "<strong>"+msg+"</strong>";

const displayLoadIcon = () => document.getElementById("loader").style.display = (document.getElementById("loader").style.display === "none" || document.getElementById("loader").style.display === "") ? "inherit" : "none";
