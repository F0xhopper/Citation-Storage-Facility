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
  const [accounts, setAccounts] = useState([]);
  const [loggedInAccountUsername, setloggedInAccountUsername] = useState();
  const [insideContainer, setInsideContainer] = useState();
  const [loggedInAccountObject, setLoggedInAccountObject] = useState();
  const [citationInPreview, setCitationInPreview] = useState(undefined);
  useEffect(() => {
    document.body.style.zoom = "94%";

    const object = accounts.filter((account) => {
      return account.username === loggedInAccountUsername;
    })[0];
    setLoggedInAccountObject(object);
  });

  return (
    <div className="App">
      <div className="titleCon">
        <h1 className="title">Citation Storage Facility</h1>
      </div>
      {loggedInAccountObject != undefined ? (
        <div className="dashboardContainer">
          <div className="accountBar">
            <div className="accountInfoContainer">
              <img
                className="accountInfoProfilePic"
                src={require("./Images/61205.png")}
              ></img>
              <h1 className="accountInfoUsername">{loggedInAccountUsername}</h1>
            </div>
            <SearchBar
              loggedInAccountObject={loggedInAccountObject}
              setInsideContainer={setInsideContainer}
              setCitationInPreview={setCitationInPreview}
            />{" "}
            <div
              className="logOutButton"
              onClick={() => {
                setloggedInAccountUsername(undefined);
              }}
            >
              <h5 className="logOutButtonText">Log Out →</h5>
            </div>
          </div>
          <div className="userInteratingContainer">
            {insideContainer === undefined ? (
              <div className="containerDashboardContainer">
                {" "}
                <ContainerPreview
                  loggedInAccountObject={loggedInAccountObject}
                  setInsideContainer={setInsideContainer}
                  accounts={accounts}
                  setAccounts={setAccounts}
                  loggedInAccountUsername={loggedInAccountUsername}
                  insideContainer={insideContainer}
                />
              </div>
            ) : (
              <div className="dashboardCitationViewContainer">
                <div className="citationLeftSideContainer">
                  <div className="backButtonAndContainerNameContainer">
                    <div
                      className="backButton"
                      onClick={() => {
                        setInsideContainer(undefined);
                        setCitationInPreview(undefined);
                      }}
                    >
                      <h3 className="backButtonTitle">←Back</h3>
                    </div>
                    <h4
                      className="citationViewContainerTitle"
                      style={{
                        fontSize: insideContainer.length < 15 ? "22px" : "15px",
                        marginTop:
                          insideContainer.length < 15 ? "12px" : "15px",
                      }}
                    >
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
                    <h6 className="createCitationViewVButtonTitle">
                      Create Citation
                    </h6>
                  </div>
                  <CitationSelector
                    loggedInAccountObject={loggedInAccountObject}
                    insideContainer={insideContainer}
                    setCitationInPreview={setCitationInPreview}
                    accounts={accounts}
                    setAccounts={setAccounts}
                    loggedInAccountUsername={loggedInAccountUsername}
                    citationInPreview={citationInPreview}
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
