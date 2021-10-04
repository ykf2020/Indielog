import { Link } from 'react-router-dom'
import { gray1, gray2, gray3, gray4, green1, green2, black1, MEDIA_QUERY_568, MEDIA_QUERY_768 } from '../../constants.js'
import styled from 'styled-components'

export const MemberPageContainer = styled.div`
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

export const TitleButtonsGroup = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0 20px;
  border-bottom: 1px solid ${gray2};
`

export const TitleNormalButton = styled(Link)`
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

export const TitleActiveButton = styled.button`
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

export const TitleDiv = styled.div`
  display: flex;
  align-items:center;
  width: 200px;
`

export const PersonalInfoContainer = styled.div`
  width: 94%;
  background: white;
  margin: 30px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 6px rgba(33, 33, 33, 0.2);
  padding: 16px 18px;
`

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

export const InfoTitle = styled.h3`
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

export const InfoElementTitle = styled.h4`
  color: ${gray4};
  font-weight: normal;
`
export const InfoElementMainDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
`
export const ImgDiv = styled.div`
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

export const EditButton = styled.div`
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

export const Input = styled.input`
  width: 300px;
  padding: 4px 10px;
  height: 40px;
  border: 1px solid ${gray2};
  border-radius: 12px;
  outline: none;
  color: ${gray3};
`

export const IntroductionArea = styled.div`
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

export const IntroductionDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ModalBackground = styled.div`
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100vh;
  background: rgba(33, 33, 33, 0.8);
  z-index: 1010;
`

export const ModalPanel = styled.div`
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

export const ModalInnerTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 80%;
`

export const ModalInnerDiv = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;
`

export const ModalInnerBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
`

export const ModalButton = styled.div`
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

export const ModalImgDiv = styled(ImgDiv)`
  margin-top: 30px;
`

export const ModalUploadButton = styled.label`
  margin-top: 30px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 2px solid ${green1};
  &: hover {
    transform: translateY(-3px);
    border-bottom: 2px solid ${green2};
  }
`

export const ModalTextArea = styled.textarea`
  width: 90%;
  min-height: 300px;
  color: ${gray4};
  padding: 10px;
  font-size: 0.8rem;
  outline: none;
  border-radius: 10px;
  border: 1px solid ${gray3};
`
