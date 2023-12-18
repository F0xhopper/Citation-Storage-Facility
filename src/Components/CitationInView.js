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
  return props.citationInPreview != undefined ? (
    <div className="citationViewContainer">
      {" "}
      <p className="citationInPreviewCitation">
        {props.citationInPreview.citation}
      </p>
      <h4 className="citationInPreviewReference">
        {props.citationInPreview.reference}
      </h4>
      <h5 className="citationInPreviewReference">
        {props.citationInPreview.date}
      </h5>
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
