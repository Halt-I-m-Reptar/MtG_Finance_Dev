const clearData = () => {
    document.getElementById( "listDisplay" ).innerHTML = '';
    document.getElementById( "productNames" ).value = '';
}

const errObject = () => ( { 0: "<h1>Please enter a list of products to search.</h1>"} );
