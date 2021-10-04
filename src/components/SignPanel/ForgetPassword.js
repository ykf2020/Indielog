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
import { forgetPassword } from '../../utils/firebase.js'

const ForgetPassword = ({ setPanelStatus, toggleSignPanel }) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(){
    forgetPassword(email)
      .then(() => {
        setEmail('')
        setMessage('更改密碼確認信已寄至信箱，請查收')
      })
      .catch((err) => {
        setEmail('')
        setMessage('更改密碼失敗')
      })
  }
  return (
    <>
      <SignPanelTitle>忘記密碼</SignPanelTitle>
      {message && <Warning>{message}</Warning>}
      <SignPanelTitleDesc>帳號</SignPanelTitleDesc>
      <SignPanelInput placeholder='請輸入 email' type='email' value={email} onChange={(e) => {setEmail(e.target.value)}}></SignPanelInput>
      <SignPanelButton onClick={(e) => {handleSubmit(e)}}>送出</SignPanelButton>
      <LinkGroups>
        <SignPanelChange onClick={() => {setPanelStatus('signup')}}>註冊帳號</SignPanelChange>
        <SignPanelChange onClick={() => {setPanelStatus('signin')}}>登入</SignPanelChange>
      </LinkGroups>
    </>
  )
}

export default ForgetPassword
