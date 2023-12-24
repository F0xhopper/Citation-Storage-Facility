import { useState } from "react";
import { createWorker } from "tesseract.js";

const CitationCreationTool = (props) => {
  const [citationInput, setCitationInput] = useState("");
  const [refernceInput, setRefernceInput] = useState("");
  const [fileInput, setFileInput] = useState();
  const [snanButtonText, setSnanButtonText] = useState("Scan Image");
  function createContainerFunction() {
    const accountObject = props.accounts.filter((account) => {
      return account.username === props.loggedInAccountUsername;
    })[0];
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}/${month}/${year}`;

    accountObject.quotes.push({
      citation: citationInput,
      reference: refernceInput,
      container: props.insideContainer,
      favourite: false,
      date: currentDate,
    });
    props.setAccounts((account) => {
      return account.username != props.loggedInAccountUsername;
    });
    props.setAccounts([...props.accounts, accountObject]);
    setCitationInput("");
    setRefernceInput("");
  }
  async function scanImage() {
    const beforeCitation = citationInput;
    setSnanButtonText("Loading");
    const worker = await createWorker("eng");
    const ret = await worker.recognize(fileInput);
    setCitationInput(ret.data.text);
    setSnanButtonText("Scan Item");
    await worker.terminate();
  }
  return (
    <div className="citationCreatorContainer">
      <div className="citationCreatorUpperContainer">
        <div className="citationTextAreaInputContainer">
          <textarea
            className="citationTextAreaInput"
            onChange={(e) => setCitationInput(e.target.value)}
            placeholder="Citation"
            value={citationInput}
          ></textarea>
        </div>{" "}
        <div className="scanImageToolContainer">
          <input
            className="imageInput"
            id="imageInput"
            type="file"
            onChange={(e) => {
              setFileInput(e.target.files[0]);
            }}
          ></input>
          <label htmlFor="imageInput" className="imageInputLabel">
            {fileInput == undefined ? "Select Image" : "Image Selected"}
          </label>
          <button
            className="scanImageButton"
            onClick={() => {
              scanImage();
            }}
          >
            {snanButtonText}
          </button>{" "}
          <button
            className="createCitationButton"
            onClick={createContainerFunction}
          >
            Create Citation
          </button>
        </div>
      </div>
      <input
        className="referenceInput"
        onChange={(e) => setRefernceInput(e.target.value)}
        placeholder="Reference"
        value={refernceInput}
      ></input>
    </div>
  );
};

export default CitationCreationTool;
