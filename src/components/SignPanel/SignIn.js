import { useState } from 'react'
import {
  SignPanelTitle,
  SignPanelTitleDesc,
  SignPanelButton,
  SignPanelInput,
  LinkGroups,
  SignPanelChange,
  Warning
} from './SignPanelElements.js'
import { signIn } from '../../utils/firebase.js'

const SignIn = ({ setPanelStatus, toggleSignPanel }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  function signInSucceed(){
    toggleSignPanel()
    setEmail('')
    setPassword('')
  }
  function handleSubmit(){
    signIn(email, password, signInSucceed, setErrorMessage)
  }
  return (
    <>
      <SignPanelTitle>登入</SignPanelTitle>
      {errorMessage && <Warning>{errorMessage}</Warning>}
      <SignPanelTitleDesc>帳號</SignPanelTitleDesc>
      <SignPanelInput type='email' value={email} onChange={(e) => {setEmail(e.target.value)}}></SignPanelInput>
      <SignPanelTitleDesc>密碼</SignPanelTitleDesc>
      <SignPanelInput type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}></SignPanelInput>
      <SignPanelButton onClick={(e) => {handleSubmit(e)}}>送出</SignPanelButton>
      <LinkGroups>
        <SignPanelChange onClick={() => {setPanelStatus('signup')}}>註冊帳號</SignPanelChange>
        <SignPanelChange onClick={() => {setPanelStatus('forget');console.log('yoyo')}}>忘記密碼</SignPanelChange>
      </LinkGroups>
    </>
  )
}

export default SignIn
