const CitationSelector = (props) => {
  function favouriteCitation(reference) {
    const accountObject = props.accounts.filter((account) => {
      return account.username === props.loggedInAccountUsername;
    })[0];
    accountObject.quotes.forEach((quote) => {
      if (quote.reference == reference) {
        quote.favourite = !quote.favourite;
      }
    });
    props.setAccounts((account) => {
      return account.username != props.loggedInAccountUsername;
    });
    props.setAccounts([...props.accounts, accountObject]);
  }
  return (
    <div className="quoteDisplayContainer">
      <table className="citationDisplayTable">
        <tr>
          <th>Reference</th>
          <th>Citation</th> <th>Date</th>
          <th>Favourite</th>
        </tr>
        <tbody className="citationTableScrollable">
          {props.loggedInAccountObject.quotes
            .filter((quote) => quote.container == props.insideContainer)
            .map((val, key) => {
              return (
                <tr
                  key={key}
                  onMouseEnter={() => {
                    props.setCitationInPreview(val);
                  }}
                  className="ciationSelectorRow"
                >
                  <td className="citationTableReference">{val.reference}</td>
                  <td>{val.citation.slice(0, 6)}</td>
                  <td>{val.date}</td>
                  <td>
                    {val.favourite}
                    <button
                      className="citationFavouriteButton"
                      onClick={() => favouriteCitation(val.reference)}
                    >
                      {val.favourite == true ? "★" : "☆"}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CitationSelector;
