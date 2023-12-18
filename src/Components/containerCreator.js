import { useState } from "react";

const CreateContainerTool = (props) => {
  const [containerNameInput, setContainerNameInput] = useState("");
  function createContainerFunction() {
    const accountObject = props.accounts.filter((account) => {
      return account.username === props.loggedInAccountUsername;
    })[0];
    accountObject.containers.push(containerNameInput);
    props.setAccounts((account) => {
      return account.username != props.loggedInAccountUsername;
    });
    props.setAccounts([...props.accounts, accountObject]);
    setContainerNameInput("");
  }
  return (
    <div className="createContainerContainer">
      <input
        className="createContainerInput"
        onChange={(e) => setContainerNameInput(e.target.value)}
        placeholder="Container Name"
        value={containerNameInput}
      ></input>
      <button
        className="createContainerButton"
        onClick={createContainerFunction}
      >
        Create Container
      </button>
    </div>
  );
};

export default CreateContainerTool;
