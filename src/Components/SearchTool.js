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
          quote.citation.includes(searchInput) ||
          quote.reference.includes(searchInput)
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
        placeholder="SeachBar"
        onChange={(e) => {
          setsearchInput(e.target.value);
        }}
        onClick={Search}
        value={searchInput}
      ></input>

      {displayedCitations.length !== 0 ? (
        <div className="searchResultsContainer">
          <table>
            {displayedCitations.map((citation) => (
              <tr
                onClick={() => {
                  setSearchedToPreview(citation);
                }}
              >
                <td>{citation.reference}</td>
                <td>{citation.citation}</td> <td>{citation.date}</td>
              </tr>
            ))}
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
