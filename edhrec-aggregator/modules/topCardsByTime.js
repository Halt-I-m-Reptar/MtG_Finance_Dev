const getTopCardsByMonthWorker = () => {
    prepDisplayDuringLoad('cards');
    prepCurlRequest('top', 'month', 'topCards' );
}

const getTopCommandersByMonthWorker = () => {
    prepDisplayDuringLoad('commanders');
    prepCurlRequest( 'commanders', 'month', 'topCommanders' );
}
