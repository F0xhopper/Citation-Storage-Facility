import { useState } from "react";
const Login = (props) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordInputConfirm, setPasswordConfirmInput] = useState("");
  const [loginState, setLoginState] = useState("Login");
  const [errorMessage, setErrorMessage] = useState("");
  class Account {
    constructor(username, password) {
      this.username = username;
      this.password = password;
      this.containers = [];
      this.quotes = [];
    }
  }
  function loginFunction() {
    const user = props.accounts.find(
      (account) =>
        account.username === usernameInput && account.password === passwordInput
    );
    if (user) {
      setErrorMessage("");

      props.setloggedInAccountUsername(usernameInput);
    } else {
      setErrorMessage("Incorrect Inputs");
    }
    setPasswordInput("");
    setUsernameInput("");
  }
  function createAccountFunction() {
    if (passwordInput === passwordInputConfirm) {
      setErrorMessage("");
      props.setAccounts([
        ...props.accounts,
        new Account(usernameInput, passwordInput),
      ]);
      setLoginState("Login");
    } else {
      setErrorMessage("Incorrect Inputs");
    }

    setPasswordInput("");
    setUsernameInput("");
    setPasswordConfirmInput("");
  }
  return (
    <div
      style={{
        height:
          loginState === "Login"
            ? errorMessage === "Incorrect Inputs"
              ? "165px"
              : "140px"
            : errorMessage === "Incorrect Inputs"
            ? "195px"
            : "171px",
      }}
      className="loginContainer"
    >
      {loginState === "Login" ? (
        <div>
          {" "}
          <div className="usernameInputContainer">
            <input
              className="usernameInput"
              placeholder="Username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            ></input>
          </div>
          <div className="passwordInputContainer">
            <input
              type="password"
              className="passwordInput"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            ></input>
          </div>
          <div className="loginButtonContainer">
            <button className="loginButton" onClick={loginFunction}>
              Log In
            </button>
          </div>
          <div className="errorContainer">
            <h1 className="errorMessageH1">{errorMessage}</h1>
          </div>
          <div className="createAccountButtonStateButtonContainer">
            <button
              className="createAccountButtonStateButton"
              onClick={() => {
                setLoginState("Create");
                setErrorMessage("");
                setPasswordInput("");
                setUsernameInput("");
                setPasswordConfirmInput("");
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <div className="usernameInputContainer">
            <input
              className="usernameInput"
              placeholder="Username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            ></input>
          </div>
          <div className="passwordInputContainer">
            <input
              className="passwordInput"
              type="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            ></input>
          </div>
          <div className="passwordConfirmInputContainer">
            <input
              className="passwordConfirmInput"
              type="password"
              value={passwordInputConfirm}
              placeholder="Confirm Password "
              onChange={(e) => setPasswordConfirmInput(e.target.value)}
            ></input>
          </div>
          <div className="createButtonContainer">
            <button className="createButton" onClick={createAccountFunction}>
              Create Account
            </button>
          </div>
          <div className="errorContainer">
            <h1 className="errorMessageH1">{errorMessage}</h1>
          </div>
          <div className="loginAccountButtonStateButton">
            <button
              className="loginAccountStateButton"
              onClick={() => {
                setLoginState("Login");
                setErrorMessage("");
              }}
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
