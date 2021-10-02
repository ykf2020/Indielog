import { useState } from 'react'
import {
  SignPanelTitle,
  SignPanelTitleDesc,
  SignPanelButton,
  SignPanelInput,
  LinkGroups,
  SignPanelChange,
} from './SignPanelElements.js'
import firebase from '../../utils/firebase.js'
import 'firebase/compat/auth';
const SignIn = ({ setPanelStatus, toggleSignPanel }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = (e) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        toggleSignPanel()
        setEmail('')
        setPassword('')
      })
      .catch((error) => {
        switch(error.code) {
          case "auth/invalid-email":
            setErrorMessage('信箱格式錯誤')
            break
          case "auth/user-not-found":
            setErrorMessage('信箱不存在')
            break
          case "auth/wrong-password":
            setErrorMessage('密碼錯誤')
            break
          default:
            setErrorMessage(error.code)
        }
      })
  }
  return (
    <>
      <SignPanelTitle>登入</SignPanelTitle>
      <SignPanelTitleDesc>帳號</SignPanelTitleDesc>
      <SignPanelInput type='email' value={email} onChange={(e) => {setEmail(e.target.value)}}></SignPanelInput>
      <SignPanelTitleDesc>密碼</SignPanelTitleDesc>
      <SignPanelInput type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}></SignPanelInput>
      <SignPanelButton onClick={(e) => {handleSubmit(e)}}>送出</SignPanelButton>
      <LinkGroups>
        <SignPanelChange onClick={() => {setPanelStatus('signup')}}>註冊帳號</SignPanelChange>
        <SignPanelChange onClick={() => {setPanelStatus('forget')}}>忘記密碼</SignPanelChange>
      </LinkGroups>
      {errorMessage && <h1 style={{color:'red'}}>{errorMessage}</h1>}
    </>
  )
}

export default SignIn
