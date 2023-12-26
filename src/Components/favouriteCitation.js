const FavouriteCitationBar = (props) => {
  return (
    <div className="favouritsContainer">
      <h1 className="favouriteTitle">Favourites</h1>
      <div className="favouriteCitationLargeContainer">
        {props.loggedInAccountObject.quotes
          .filter((quote) => quote.favourite == true)
          .map((quote) => {
            return (
              <div
                onClick={() => {
                  props.setInsideContainer(quote.container);
                  props.setCitationInPreview(quote);
                }}
                className="favouriteCitationIndividualContainer"
                id={quote.reference}
              >
                {" "}
                <p
                  className="favouriteCitationCitation"
                  style={{
                    fontSize: quote.citation.length < 3 ? "25px" : "12px",
                  }}
                >
                  {quote.citation}
                </p>
                <h4 className="favouriteCitationReference">
                  {quote.reference}
                </h4>{" "}
                <h6 className="favouriteCitationDate">{quote.date}</h6>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FavouriteCitationBar;
