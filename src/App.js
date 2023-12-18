import { useEffect, useState } from "react";
import Login from "./Components/login";
import CitationCreationTool from "./Components/citationCreator";
import CreateContainerTool from "./Components/containerCreator";
import ContainerPreview from "./Components/containersPreview";
import CitationSelector from "./Components/citationSelector";
import CitationInViewDisplay from "./Components/CitationInView";
import FavouriteCitationBar from "./Components/favouriteCitation";
import SearchBar from "./Components/SearchTool";
import DeleteContainer from "./Components/deleteContainer";
function App() {
  const [accounts, setAccounts] = useState([
    { username: "2", password: "3", containers: ["b"] },
    { username: "3", password: "4" },
    { username: "4", password: "5" },
  ]);
  const [loggedInAccountUsername, setloggedInAccountUsername] = useState();
  const [insideContainer, setInsideContainer] = useState();
  const [loggedInAccountObject, setLoggedInAccountObject] = useState();
  const [citationInPreview, setCitationInPreview] = useState(undefined);
  useEffect(() => {
    const object = accounts.filter((account) => {
      return account.username === loggedInAccountUsername;
    })[0];
    setLoggedInAccountObject(object);
  });
  function favouriteQuote(quote) {
    const object = accounts.filter((account) => {
      return account.username === loggedInAccountUsername;
    })[0];
    let newQuote = quote;
    newQuote.favourite = true;
    object.quotes = object.quotes.filter(
      (quoteObj) => quoteObj.reference != quote.reference
    );
    object.quotes = [...object.quotes, newQuote];

    setAccounts((account) => {
      return account.username != loggedInAccountUsername;
    });
    setAccounts([...accounts, object]);
  }
  return (
    <div className="App">
      <div className="titleCon">
        <h1 className="title">Citation Storage Facility</h1>
      </div>
      {loggedInAccountObject != undefined ? (
        <div className="dashboardContainer">
          <div className="accountBar">
            <button
              className="logOutButton"
              onClick={() => {
                setloggedInAccountUsername(undefined);
              }}
            >
              Log Out
            </button>
            <div className="accountInfoContainer">
              <h1>User: {loggedInAccountUsername}</h1>
            </div>
            <SearchBar
              loggedInAccountObject={loggedInAccountObject}
              setInsideContainer={setInsideContainer}
              setCitationInPreview={setCitationInPreview}
            />
          </div>
          <div className="userInteratingContainer">
            {insideContainer === undefined ? (
              <div className="containerDashboardContainer">
                {" "}
                <CreateContainerTool
                  loggedInAccountObject={loggedInAccountObject}
                  accounts={accounts}
                  setAccounts={setAccounts}
                  loggedInAccountUsername={loggedInAccountUsername}
                />
                <ContainerPreview
                  loggedInAccountObject={loggedInAccountObject}
                  setInsideContainer={setInsideContainer}
                  insideContainer={insideContainer}
                />
              </div>
            ) : (
              <div className="dashboardCitationViewContainer">
                <div className="citationLeftSideContainer">
                  <div className="backButtonAndContainerNameContainer">
                    <button
                      className="backButton"
                      onClick={() => {
                        setInsideContainer(undefined);
                      }}
                    >
                      Back
                    </button>
                    <h4 className="citationViewContainerTitle">
                      {" "}
                      {insideContainer}
                    </h4>
                  </div>
                  <div
                    className="createCitationViewButton"
                    onClick={() => {
                      setCitationInPreview(undefined);
                    }}
                  >
                    <h4 className="createCitationViewVButtonTitle">
                      Create Citation
                    </h4>
                  </div>
                  <CitationSelector
                    loggedInAccountObject={loggedInAccountObject}
                    insideContainer={insideContainer}
                    setCitationInPreview={setCitationInPreview}
                    accounts={accounts}
                    setAccounts={setAccounts}
                    loggedInAccountUsername={loggedInAccountUsername}
                  />
                  <DeleteContainer
                    loggedInAccountUsername={loggedInAccountUsername}
                    insideContainer={insideContainer}
                    setInsideContainer={setInsideContainer}
                    setAccounts={setAccounts}
                    accounts={accounts}
                  />
                </div>
                <div className="citationRightSideContainer">
                  {citationInPreview === undefined ? (
                    <CitationCreationTool
                      insideContainer={insideContainer}
                      accounts={accounts}
                      setAccounts={setAccounts}
                      loggedInAccountUsername={loggedInAccountUsername}
                    />
                  ) : (
                    <CitationInViewDisplay
                      loggedInAccountUsername={loggedInAccountUsername}
                      setAccounts={setAccounts}
                      accounts={accounts}
                      citationInPreview={citationInPreview}
                      setCitationInPreview={setCitationInPreview}
                    />
                  )}
                </div>
              </div>
            )}
          </div>{" "}
          <FavouriteCitationBar
            loggedInAccountObject={loggedInAccountObject}
            setInsideContainer={setInsideContainer}
            setCitationInPreview={setCitationInPreview}
          />
        </div>
      ) : (
        <Login
          loggedInAccountObject={loggedInAccountObject}
          setLoggedInAccountObject={setLoggedInAccountObject}
          accounts={accounts}
          setAccounts={setAccounts}
          setloggedInAccountUsername={setloggedInAccountUsername}
        />
      )}
    </div>
  );
}

export default App;
