import CreateContainerTool from ".//containerCreator";

const ContainerPreview = (props) => {
  function calculateAmountFavourited(containerName) {
    let amountOfFavourited = 0;
    props.loggedInAccountObject.quotes
      .filter((quote) => quote.container == containerName)
      .map((val, key) => {
        if (val.favourite == true) {
          amountOfFavourited++;
        }
      });
    return amountOfFavourited;
  }
  function calculateAmountOfCitations(containerName) {
    let amountOfCitations = 0;
    props.loggedInAccountObject.quotes
      .filter((quote) => quote.container == containerName)
      .map((val, key) => {
        amountOfCitations++;
      });
    return amountOfCitations;
  }
  return (
    <div className="ContainerPreviewContainer">
      <CreateContainerTool
        loggedInAccountObject={props.loggedInAccountObject}
        accounts={props.accounts}
        setAccounts={props.setAccounts}
        loggedInAccountUsername={props.loggedInAccountUsername}
      />
      {props.loggedInAccountObject.containers.map((container) => {
        return (
          <div
            className="containerButtonSelectContainer"
            id={container}
            onClick={(e) => {
              props.setInsideContainer(container);
            }}
          >
            <h1 className="containerButtonTitle">{container}</h1>
            <p className="amountOfCitations">
              Total citation: {calculateAmountOfCitations(container)}
            </p>
            <p className="amountOfFavourites">
              Total Favourites: {calculateAmountFavourited(container)}
            </p>{" "}
          </div>
        );
      })}
      <img
        style={{
          display:
            props.loggedInAccountObject.containers.length < 1 ? null : "none",
        }}
        className="introImage"
        src={require("../Images/New Project (6).png")}
      ></img>
    </div>
  );
};

export default ContainerPreview;
