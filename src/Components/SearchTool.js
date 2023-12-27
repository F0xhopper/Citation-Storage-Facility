import { useEffect, useState } from "react";
import CitationCreationTool from "./citationCreator";

const SearchBar = (props) => {
  const [displayedCitations, setdisplayedCitations] = useState([]);
  const [searchInput, setsearchInput] = useState();

  function Search() {
    setdisplayedCitations([]);
    let displayQuotes = [];
    if (searchInput != "" || undefined) {
      props.loggedInAccountObject.quotes.forEach((quote) => {
        if (displayQuotes.includes(quote)) {
        } else if (
          quote.citation.toUpperCase().includes(searchInput.toUpperCase()) ||
          quote.reference.toUpperCase().includes(searchInput.toUpperCase())
        ) {
          displayQuotes.push(quote);
        }
      });

      setdisplayedCitations(displayQuotes);
    }
  }
  function setSearchedToPreview(citationSelected) {
    props.setInsideContainer(citationSelected.container);
    props.setCitationInPreview(citationSelected);
    setsearchInput("");
  }
  useEffect(() => {
    console.log(displayedCitations);
    Search();
  }, [searchInput]);
  return (
    <div className="SearchBarContainer">
      <input
        className="SearchBar"
        placeholder="Search"
        onChange={(e) => {
          setsearchInput(e.target.value);
        }}
        onClick={Search}
        value={searchInput}
      ></input>
      <div className="searchBarButton" onClick={Search}>
        <h5 className="searchBarIcon">🔎︎</h5>
      </div>
      {displayedCitations.length !== 0 ? (
        <div className="searchResultsContainer">
          <table className="searchResultsTable">
            {displayedCitations.map((citation) => (
              <tr
                className="searchResultsRow"
                onClick={() => {
                  setSearchedToPreview(citation);
                }}
              >
                <td>{citation.reference}</td>
                <td
                  style={{
                    fontSize: citation.citation.length < 20 ? null : "11px",
                  }}
                >
                  {citation.citation.slice(0, 140)}
                </td>{" "}
                <td>{citation.date}</td>
              </tr>
            ))}
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
