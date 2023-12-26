const CitationInViewDisplay = (props) => {
  function deleteCitation() {
    const accountObject = props.accounts.filter((account) => {
      return account.username === props.loggedInAccountUsername;
    })[0];
    accountObject.quotes.forEach((quote, i) => {
      if (quote.citation == props.citationInPreview.citation) {
        accountObject.quotes.splice(i, 1);
      }
    });
    props.setAccounts((account) => {
      return account.username != props.loggedInAccountUsername;
    });
    props.setAccounts([...props.accounts, accountObject]);
    props.setCitationInPreview(undefined);
  }
  function favouriteCitation() {
    const accountObject = props.accounts.filter((account) => {
      return account.username === props.loggedInAccountUsername;
    })[0];
    accountObject.quotes.forEach((quote, i) => {
      if (quote.citation == props.citationInPreview.citation) {
        quote.favourite = !quote.favourite;
      }
    });
    props.setAccounts((account) => {
      return account.username != props.loggedInAccountUsername;
    });
    props.setAccounts([...props.accounts, accountObject]);
  }

  return props.citationInPreview != undefined ? (
    <div className="citationViewContainer">
      {" "}
      <div className="citationViewFavouriteButton" onClick={favouriteCitation}>
        {props.citationInPreview.favourite === true ? "★" : "☆"}
      </div>
      <p
        style={{
          fontSize:
            props.citationInPreview.citation.length < 93 ? null : "16px",
        }}
        className="citationInPreviewCitation"
      >
        {props.citationInPreview.citation}
      </p>
      <h4 className="citationInPreviewReference">
        {props.citationInPreview.reference}
      </h4>
      <h6 className="citationInPreviewReference">
        {props.citationInPreview.date}
      </h6>
      <button
        onClick={deleteCitation}
        className="citationInPreviewDeleteButton"
      >
        Delete Citation
      </button>
    </div>
  ) : null;
};

export default CitationInViewDisplay;
