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
import firebase from '../../utils/firebase.js'
import "firebase/compat/firestore"
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
      .then((signUpResult) => {
        firebase
          .firestore()
          .collection('users')
          .doc(signUpResult.user.uid)
          .set({
            email,
            photoURL: '',
            displayName: '',
            introduction: '',
            createdAt: firebase.firestore.Timestamp.now()
          }).then(() => {
            toggleSignPanel()
            setEmail('')
            setPassword('')
          })
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
      {errorMessage && <Warning>{errorMessage}</Warning>}
      <SignPanelTitleDesc>帳號</SignPanelTitleDesc>
      <SignPanelInput type='email' placeholder='請輸入 email' value={email} onChange={(e) => {setEmail(e.target.value)}}></SignPanelInput>
      <SignPanelTitleDesc>密碼</SignPanelTitleDesc>
      <SignPanelInput type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}></SignPanelInput>
      <SignPanelTitleDesc>確認密碼</SignPanelTitleDesc>
      <SignPanelInput type='password' value={passwordConfirm} onChange={(e) => {setPasswordConfirm(e.target.value)}}></SignPanelInput>
      <SignPanelButton onClick={handleSubmit}>送出</SignPanelButton>
      <LinkGroups>
        <SignPanelChange onClick={() => {setPanelStatus('signin')}}>登入</SignPanelChange>
      </LinkGroups>
    </>
  )
}

export default SignUp
