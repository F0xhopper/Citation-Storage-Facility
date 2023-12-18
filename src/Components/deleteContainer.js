const DeleteContainer = (props) => {
  function deleteContainer() {
    const accountObject = props.accounts.filter((account) => {
      return account.username === props.loggedInAccountUsername;
    })[0];
    accountObject.containers.forEach((element, i) => {
      console.log(element, props.insideContainer);
      if (element === props.insideContainer) {
        accountObject.containers.splice(i, 1);
      }
    });
    accountObject.quotes.forEach((quote, i) => {
      if (quote.container == props.insideContainer) {
        accountObject.quotes.splice(i, 1);
      }
    });

    props.setAccounts((account) => {
      return account.username != props.loggedInAccountUsername;
    });
    props.setAccounts([...props.accounts, accountObject]);
    props.setInsideContainer(undefined);
  }
  return (
    <div onClick={deleteContainer} className="deleteContainerButtonContainer">
      <h3 className="deleteContainerButtonTitle">Delete Container</h3>
    </div>
  );
};

export default DeleteContainer;
