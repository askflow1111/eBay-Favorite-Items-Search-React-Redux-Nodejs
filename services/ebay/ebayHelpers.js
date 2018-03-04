require('isomorphic-fetch');
require('dotenv').config();
const API_KEY = process.env.EBAY_API_SECRET_KEY;

function fetchItemsFromEbay(req, res, next) {
  let URL = `http://svcs.ebay.com/services/search/FindingService/v1?`;
  URL += `OPERATION-NAME=findItemsByKeywords`;
  URL += `&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${API_KEY}`;
  URL += `&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD`;
  URL += `&keywords=${req.body.search}`;
  URL += `&itemFilter(0).name=ListingType&itemFilter(0).value=${req.body.listingType}`;
  URL += `&itemFilter(1).name=HideDuplicateItems&itemFilter(1).value=true` ;
  (req.body.listingEndTime) && (URL += `&itemFilter(2).name=EndTimeTo&itemFilter(2).value=${req.body.listingEndTime}`);
  URL += `&outputSelector(0)=PictureURLLarge`;
  URL += `&outputSelector(1)=PictureURLSuperSize`;
  URL += `&outputSelector(2)=GalleryInfo`;
  URL += `&paginationInput.entriesPerPage=${req.body.maxResults}`;
  URL += `&sortOrder=${req.body.sortBy}`;
  fetch(URL, {
    method: 'GET'
  }).then((fetchRes) => {
    return fetchRes.json();
  }).then((jsonFetchRes) => {
    if (jsonFetchRes.findItemsByKeywordsResponse[0].ack[0] === "Failure") {
      res.locals.ebayApiData = null;
    } else {
      res.locals.ebayApiData = jsonFetchRes.findItemsByKeywordsResponse[0].searchResult[0];
    }
    next();
  }).catch((err) => {
    res.locals.ebayApiData = null;
    next();
  });
}

module.exports = {
  fetchItemsFromEbay,
};