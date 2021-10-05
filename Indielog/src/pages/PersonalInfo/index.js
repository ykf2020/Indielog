import { useState, useEffect } from 'react'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { getUserInfoOnSnapshot, updatePassword, updateDisplayName, updateIntroduction, updateImage } from '../../utils/firebase.js'
import {
  MemberPageContainer,
  TitleButtonsGroup,
  TitleNormalButton,
  TitleActiveButton,
  TitleDiv,
  PersonalInfoContainer,
  InfoSection,
  InfoTitle,
  InfoElementTitle,
  InfoElementMainDiv,
  ImgDiv,
  EditButton,
  Input,
  IntroductionArea,
  IntroductionDiv,
  ModalBackground,
  ModalPanel,
  ModalInnerTop,
  ModalInnerDiv,
  ModalInnerBottom,
  ModalButton,
  ModalImgDiv,
  ModalUploadButton,
  ModalTextArea,
  Warning,
} from './PersonalInfoElements.js'
import Loading from '../../components/Loading'

const PersonalInfo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [mode, setMode] = useState(0)
  const [introduction, setIntroduction] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [file, setFile] = useState(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  const [shownInfo, setShownInfo] = useState({})
  const previewUrl = file ? URL.createObjectURL(file) : '/image.png'
  const user = useSelector((store) => store.user.currentUser)

  function handleUpdateAvatar() {
    function handleUpdateSucceed(){
      setModalIsOpen(false)
      setFile(null)
      setIsLoading(false)
    }
    setIsLoading(true)
    updateImage(user.uid, file, handleUpdateSucceed, setErrorMessage)
  }

  function handleEditIntroduction() {
    if(introduction === '') {
      setErrorMessage('請填入欄位')
      return
    }
    function handleUpdateSucceed(){
      setModalIsOpen(false)
      setIntroduction(null)
      setIsLoading(false)
    }
    setIsLoading(true)
    updateIntroduction(user.uid, introduction, handleUpdateSucceed, setErrorMessage)
  }

  function handleEditDisplayName() {
    if(displayName === '') {
      setErrorMessage('請填入欄位')
      return
    }
    function handleUpdateSucceed(){
      setModalIsOpen(false)
      setDisplayName(null)
      setIsLoading(false)
    }
    setIsLoading(true)
    updateDisplayName(user.uid, displayName, handleUpdateSucceed, setErrorMessage)
  }

  function handleChangePssword(){
    if(!newPassword || !newPasswordConfirm || !currentPassword){
      setErrorMessage('請填入所有欄位')
      return
    }
    if(newPassword !== newPasswordConfirm) {
      setErrorMessage('請確認新密碼輸入正確')
      return
    }

    function handleUpdateSucceed(){
      setModalIsOpen(false)
      setIsLoading(false)
      setCurrentPassword('')
      setNewPassword('')
      setNewPasswordConfirm('')
      alert('修改密碼成功')
    }
    setIsLoading(true)
    updatePassword(user.email, currentPassword, newPassword, handleUpdateSucceed, setErrorMessage)
  }

  useEffect(() => {
    getUserInfoOnSnapshot(user.uid, setShownInfo)
  },[])

  return (
      <MemberPageContainer>
        {isLoading && <Loading />}
        <TitleButtonsGroup>
          <TitleActiveButton>會員資料</TitleActiveButton>
          <TitleNormalButton to='/member/myposts'>我的文章</TitleNormalButton>
        </TitleButtonsGroup>
        <PersonalInfoContainer>
          <TitleDiv><InfoTitle>基本資料</InfoTitle></TitleDiv>
          <InfoSection>
            <InfoElementTitle>頭像</InfoElementTitle>
            <InfoElementMainDiv>
              <ImgDiv><img alt='' src={shownInfo.photoURL ? shownInfo.photoURL : '/default-user-image.png'}/></ImgDiv>
              <EditButton
                onClick={() => {setModalIsOpen(!modalIsOpen);setMode(1)}}>
                <FontAwesomeIcon size='1x' icon={faPen}/>
              </EditButton>
            </InfoElementMainDiv>
          </InfoSection>
          <InfoSection>
            <InfoElementTitle>帳號</InfoElementTitle>
            <InfoElementMainDiv>
              <Input disabled value={shownInfo.email}/>
            </InfoElementMainDiv>
          </InfoSection>
          <InfoSection>
            <InfoElementTitle>密碼</InfoElementTitle>
            <InfoElementMainDiv>
              <Input disabled value={'******'}/>
              <EditButton onClick={() => {setModalIsOpen(!modalIsOpen);setMode(2)}}><FontAwesomeIcon size='1x' icon={faPen}/></EditButton>
            </InfoElementMainDiv>
          </InfoSection>
          <InfoSection>
            <InfoElementTitle>暱稱</InfoElementTitle>
            <InfoElementMainDiv>
              <Input disabled value={shownInfo.displayName}/>
              <EditButton onClick={() => {setModalIsOpen(!modalIsOpen);setMode(3)}}><FontAwesomeIcon size='1x' icon={faPen}/></EditButton>
            </InfoElementMainDiv>
          </InfoSection>
          <InfoSection>
            <InfoElementTitle>自我介紹</InfoElementTitle>
            <IntroductionDiv>
              <IntroductionArea>{shownInfo.introduction ? shownInfo.introduction : '尚未新增自我介紹'}</IntroductionArea>
              <EditButton onClick={() => {setModalIsOpen(!modalIsOpen);setMode(4)}}><FontAwesomeIcon size='1x' icon={faPen}/></EditButton>
            </IntroductionDiv>
          </InfoSection>
          {modalIsOpen &&
            <ModalBackground>
              {mode === 1 &&
                <ModalPanel>
                  <InfoTitle>修改頭像</InfoTitle>
                  <ModalInnerTop>
                    <ModalImgDiv><img alt='' src={previewUrl}/></ModalImgDiv>
                    <ModalUploadButton htmlFor='post-image'>上傳圖片</ModalUploadButton>
                    <input
                    type="file"
                    id='post-image'
                    style={{display: 'none'}}
                    onChange={(e) => setFile(e.target.files[0])}/>
                  </ModalInnerTop>
                  <ModalInnerBottom>
                    <ModalButton onClick={() => {handleUpdateAvatar()}}>送出</ModalButton>
                    <ModalButton onClick={() => {setModalIsOpen(!modalIsOpen);setMode(0)}}>取消</ModalButton>
                  </ModalInnerBottom>
                </ModalPanel>
              }
              {mode === 2 &&
                <ModalPanel>
                  <InfoTitle>修改密碼</InfoTitle>
                  <ModalInnerTop>
                  {errorMessage && <Warning>{errorMessage}</Warning>}
                  <ModalInnerDiv>
                    <InfoElementTitle>輸入目前密碼</InfoElementTitle>
                    <Input type='password'value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
                  </ModalInnerDiv>
                    <ModalInnerDiv>
                      <InfoElementTitle>輸入新密碼</InfoElementTitle>
                      <Input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                    </ModalInnerDiv>
                    <ModalInnerDiv>
                      <InfoElementTitle>再次輸入新密碼</InfoElementTitle>
                      <Input type='password' value={newPasswordConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)}/>
                    </ModalInnerDiv>
                  </ModalInnerTop>
                  <ModalInnerBottom>
                    <ModalButton onClick={handleChangePssword}>送出</ModalButton>
                    <ModalButton onClick={() => {setModalIsOpen(!modalIsOpen);setMode(0)}}>取消</ModalButton>
                  </ModalInnerBottom>
                </ModalPanel>
              }
              {mode === 3 &&
                <ModalPanel>
                  <InfoTitle>修改暱稱</InfoTitle>
                  {errorMessage && <Warning>{errorMessage}</Warning>}
                  <ModalInnerTop>
                    <ModalInnerDiv>
                      <InfoElementTitle>輸入新暱稱</InfoElementTitle>
                      <Input placeholder='限八個字元以內' value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
                    </ModalInnerDiv>
                  </ModalInnerTop>
                  <ModalInnerBottom>
                    <ModalButton onClick={handleEditDisplayName}>送出</ModalButton>
                    <ModalButton onClick={() => {setModalIsOpen(!modalIsOpen);setMode(0)}}>取消</ModalButton>
                  </ModalInnerBottom>
                </ModalPanel>
              }
              {mode === 4 &&
                <ModalPanel>
                  <InfoTitle>修改自我介紹</InfoTitle>
                  {errorMessage && <Warning>{errorMessage}</Warning>}
                  <ModalInnerTop>
                    <ModalInnerDiv>
                      <InfoElementTitle>輸入自我介紹</InfoElementTitle>
                      <ModalTextArea value={introduction} onChange={(e) => {setIntroduction(e.target.value)}}/>
                    </ModalInnerDiv>
                  </ModalInnerTop>
                  <ModalInnerBottom>
                    <ModalButton onClick={handleEditIntroduction}>送出</ModalButton>
                    <ModalButton onClick={() => {setModalIsOpen(!modalIsOpen);setMode(0)}}>取消</ModalButton>
                  </ModalInnerBottom>
                </ModalPanel>
              }
            </ModalBackground>
          }
        </PersonalInfoContainer>
      </MemberPageContainer>
  )
}

export default PersonalInfo
