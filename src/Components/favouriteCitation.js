const FavouriteCitationBar = (props) => {
  return (
    <div className="favouritsContainer">
      <h1>Favourites</h1>
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
                <h1>{quote.citation}</h1>
                <h5>{quote.reference}</h5> <h5>{quote.date}</h5>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FavouriteCitationBar;
