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
            <p>Total citation: {calculateAmountOfCitations(container)}</p>
            <p>Total Favourites: {calculateAmountFavourited(container)}</p>{" "}
          </div>
        );
      })}
    </div>
  );
};

export default ContainerPreview;