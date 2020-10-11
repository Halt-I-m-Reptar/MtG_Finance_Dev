async function getTopCards() {

    var topcardArr = await getTopCardJson();
    console.log(topcardArr)
    outputTopCards(topcardArr);

}
