import { useState, useEffect } from 'react'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import firebase from '../../utils/firebase.js'
import 'firebase/compat/auth'
import "firebase/compat/firestore"
import "firebase/compat/storage"
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
} from './PersonalInfoElements.js'


const PersonalInfo = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [mode, setMode] = useState(0)
  const [introduction, setIntroduction] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [file, setFile] = useState(null)
  const [shownInfo, setShownInfo] = useState({})
  const previewUrl = file ? URL.createObjectURL(file) : '/image.png'
  const user = useSelector((store) => store.user.currentUser)

  function handleUpdateAvatar(e) {
    const userRef = firebase.firestore().collection('users').doc(user.uid)
    const fileRef = firebase.storage().ref('user-avatars/' + user.uid)
    const metadata = {
      contentType: file.type
    }

    fileRef.put(file, metadata).then(() => {
      fileRef.getDownloadURL().then((imageUrl) => {
        user.updateProfile({
          photoURL:imageUrl
        }).then(() => {
          userRef.update({
            photoURL:imageUrl,
          })
          .then(() => {
            setModalIsOpen(false)
            setFile(null)
          })
        })
      })
    })
  }

  function handleEditIntroduction() {
    if(introduction === '') return
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        introduction,
      }).then(() => {
        setModalIsOpen(false)
        setIntroduction(null)
      })
  }

  function handleEditDisplayName() {
    if(displayName === '') return
    user.updateProfile({
      displayName,
    }).then(() => {
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          displayName,
        }).then(() => {
          setModalIsOpen(false)
          setDisplayName(null)
        })
    })
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot((userSnapshot) => {
        setShownInfo(userSnapshot.data())
      })
  },[])

  return (
      <MemberPageContainer>
        <TitleButtonsGroup>
          <TitleActiveButton>會員資料</TitleActiveButton>
          <TitleNormalButton to='/member/myposts'>我的文章</TitleNormalButton>
        </TitleButtonsGroup>
        <PersonalInfoContainer>
          <TitleDiv><InfoTitle>基本資料</InfoTitle></TitleDiv>
          <InfoSection>
            <InfoElementTitle>頭像</InfoElementTitle>
            <InfoElementMainDiv>
              <ImgDiv><img src={shownInfo.photoURL ? shownInfo.photoURL : '/default-user-image.png'}/></ImgDiv>
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
                    <ModalImgDiv><img src={previewUrl}/></ModalImgDiv>
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
                  <ModalInnerDiv>
                    <InfoElementTitle>輸入目前密碼</InfoElementTitle>
                    <Input />
                  </ModalInnerDiv>
                    <ModalInnerDiv>
                      <InfoElementTitle>輸入新密碼</InfoElementTitle>
                      <Input />
                    </ModalInnerDiv>
                    <ModalInnerDiv>
                      <InfoElementTitle>再次輸入新密碼</InfoElementTitle>
                      <Input />
                    </ModalInnerDiv>
                  </ModalInnerTop>
                  <ModalInnerBottom>
                    <ModalButton>送出</ModalButton>
                    <ModalButton onClick={() => {setModalIsOpen(!modalIsOpen);setMode(0)}}>取消</ModalButton>
                  </ModalInnerBottom>
                </ModalPanel>
              }
              {mode === 3 &&
                <ModalPanel>
                  <InfoTitle>修改暱稱</InfoTitle>
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
