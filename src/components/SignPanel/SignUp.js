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
const SignUp = ({ setPanelStatus, toggleSignPanel }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    if(passwordConfirm !== password) {
      setErrorMessage('密碼輸入錯誤')
      return
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        toggleSignPanel()
        console.log('sign up!')
        setEmail('')
        setPassword('')
      })
      .catch((error) => {
        switch(error.code) {
          case "auth/email-already-in-use":
            setErrorMessage('信箱已存在')
            break
          case "auth/invalid-email":
            setErrorMessage('信箱格式錯誤')
            break
          case "auth/weak-password":
            setErrorMessage('密碼強度不足')
            break
          default:
            setErrorMessage(error.code)
        }
      })
  }


  return (
    <>
      <SignPanelTitle>註冊</SignPanelTitle>
      <SignPanelTitleDesc>帳號</SignPanelTitleDesc>
      <SignPanelInput type='email' value={email} onChange={(e) => {setEmail(e.target.value)}}></SignPanelInput>
      <SignPanelTitleDesc>密碼</SignPanelTitleDesc>
      <SignPanelInput type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}></SignPanelInput>
      <SignPanelTitleDesc>確認密碼</SignPanelTitleDesc>
      <SignPanelInput type='password' value={passwordConfirm} onChange={(e) => {setPasswordConfirm(e.target.value)}}></SignPanelInput>
      <SignPanelButton onClick={handleSubmit}>送出</SignPanelButton>
      <LinkGroups>
        <SignPanelChange onClick={() => {setPanelStatus('signin')}}>登入</SignPanelChange>
      </LinkGroups>
      {errorMessage && <h1 style={{color:'red'}}>{errorMessage}</h1>}
    </>
  )
}

export default SignUp
