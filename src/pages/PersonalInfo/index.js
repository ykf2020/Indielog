import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { gray1, gray2, gray3, gray4, green1, green2, black1, MEDIA_QUERY_568, MEDIA_QUERY_768 } from '../../constants.js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import firebase from '../../utils/firebase.js'
import 'firebase/compat/auth'
import "firebase/compat/firestore"
import "firebase/compat/storage"

const MemberPageContainer = styled.div`
  width: 80%;
  margin: 0 auto 20px;
  max-width: 860px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;

  ${MEDIA_QUERY_568} {
    width: 100%;
  }
`

const TitleButtonsGroup = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0 20px;
  border-bottom: 1px solid ${gray2};
`

const TitleNormalButton = styled(Link)`
  text-decoration: none;
  line-height: 2.2rem;
  font-size: 0.9rem;
  color: ${gray3};
  background: none;
  border: none;
  margin: 10px 20px;
  transition: all 0.3s ease;
  &:hover {
    color: ${black1};
    transform: translateY(-10%);
  }
  ${MEDIA_QUERY_568} {
    font-size: 0.6rem;
    margin: 10px 12px;
  }
`

const TitleActiveButton = styled.button`
  border-radius: 30px;
  color: white;
  background: ${green1};
  width: 120px;
  border: none;
  padding: 6px 10px;
  margin: 10px 20px;

  ${MEDIA_QUERY_568} {
    font-size: 0.6rem;
    padding: 6px 4px;
  }
`

const PersonalInfoContainer = styled.div`
  width: 94%;
  background: white;
  margin: 30px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 6px rgba(33, 33, 33, 0.2);
  padding: 16px 18px;
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

const InfoTitle = styled.h3`
  position: relative;
  &:before {
    position: absolute;
    content:'';
    background: ${green1};
    width: 100%;
    height: 4px;
    border: none;
    bottom: -6px;
  }
`

const InfoElementTitle = styled.h4`
  color: ${gray4};
  font-weight: normal;
`
const InfoElementMainDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
`
const ImgDiv = styled.div`
  width:  200px;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const EditButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.8rem;
  color: white;
  background: ${green1};
  height: 30px;
  width: 30px;
  border: none;
  padding: 6px 10px;
  margin: 0 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background: ${green2}
  }
`

const Input = styled.input`
  width: 300px;
  padding: 4px 10px;
  height: 40px;
  border: 1px solid ${gray2};
  border-radius: 12px;
  outline: none;
  color: ${gray3};
`

const IntroductionArea = styled.div`
  width:100%;
  min-height: 200px;
  font-size: 1rem;
  color: ${gray3};
  padding: 10px;
  margin-bottom: 12px;
  word-wrap: break-word;
  border: 1px solid ${gray2};
  border-radius: 12px;
`

const IntroductionDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ModalBackground = styled.div`
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100vh;
  background: rgba(33, 33, 33, 0.8);
  z-index: 1010;
`

const ModalPanel = styled.div`
  position: absolute;
  width: 80%;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  justify-content: space-between;
  padding: 20px 10px;
`

const ModalInnerTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 80%;
`

const ModalInnerDiv = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
`

const ModalInnerBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
`

const ModalButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 1rem;
  color: white;
  background: ${green1};
  height: 30px;
  width: 80px;
  border: none;
  padding: 6px 10px;
  margin: 0 10px;
  transition: all 0.3s ease;

  cursor: pointer;
  &:hover {
    background: ${green2}
  }
`

const ModalImgDiv = styled(ImgDiv)`
  margin-top: 30px;
`

const ModalUploadButton = styled.label`
  margin-top: 30px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 2px solid ${green1};
  &: hover {
    transform: translateY(-3px);
    border-bottom: 2px solid ${green2};
  }
`

const ModalTextArea = styled.textarea`
  width: 90%;
  min-height: 300px;
  color: ${gray4};
  padding: 10px;
  font-size: 0.8rem;
  outline: none;
  border-radius: 10px;
  border: 1px solid ${gray3};
`

const orders = ['會員資料','說讚的音樂','說讚的文章']

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
          <InfoTitle>基本資料</InfoTitle>
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
