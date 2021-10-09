import { useState } from "react";
import {
  SignPanelTitle,
  SignPanelTitleDesc,
  SignPanelButton,
  SignPanelInput,
  LinkGroups,
  SignPanelChange,
  Warning,
} from "./SignPanelElements.js";
import { signUp } from "../../utils/firebase.js";
const SignUp = ({ setPanelStatus, toggleSignPanel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSignUpSucceed() {
    toggleSignPanel();
    setEmail("");
    setPassword("");
  }
  function handleSubmit() {
    if (passwordConfirm !== password) {
      setErrorMessage("密碼輸入錯誤");
      return;
    }
    signUp(email, password, handleSignUpSucceed, setErrorMessage);
  }
  return (
    <>
      <SignPanelTitle>註冊</SignPanelTitle>
      {errorMessage && <Warning>{errorMessage}</Warning>}
      <SignPanelTitleDesc>帳號</SignPanelTitleDesc>
      <SignPanelInput
        type="email"
        placeholder="請輸入 email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></SignPanelInput>
      <SignPanelTitleDesc>密碼</SignPanelTitleDesc>
      <SignPanelInput
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></SignPanelInput>
      <SignPanelTitleDesc>確認密碼</SignPanelTitleDesc>
      <SignPanelInput
        type="password"
        value={passwordConfirm}
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
      ></SignPanelInput>
      <SignPanelButton onClick={handleSubmit}>送出</SignPanelButton>
      <LinkGroups>
        <SignPanelChange
          onClick={() => {
            setPanelStatus("signin");
          }}
        >
          登入
        </SignPanelChange>
      </LinkGroups>
    </>
  );
};

export default SignUp;
