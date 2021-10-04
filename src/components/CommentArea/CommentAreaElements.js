import { gray2, gray3, gray4, green1, green2, MEDIA_QUERY_568 } from '../../constants.js'
import styled from 'styled-components'

export const Notice = styled.p`
  span {
    cursor:pointer;
    border-bottom: 2px solid ${green1}
  }
`

export const CommentsContainer = styled.div`
  border-top: 1px solid ${gray2};
  padding-top: 20px;
  width: 100%;
`

export const Comment = styled.div`
  margin: 30px 0 ;
  min-height: 180px;
  width: 100%;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 7px rgba(33, 33, 33, 0.2);
`

export const CommentInfo = styled.div`
  display: flex;
  height: 66px;
  align-items: center;
  padding-left: 20px;

  ${MEDIA_QUERY_568} {
    padding-left: 10px
  }
`

export const CommentorImgDiv = styled.div`
width:  40px;
height: 40px;
border-radius: 50%;
overflow: hidden;

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`

export const CommentorName = styled.h4`
  font-size: 1.3rem;
  margin-left: 6px;
`

export const CommentorDate = styled.p`
  display: flexbox;
  font-size: 0.8rem;
  line-height: 0.8rem;
  margin-left: 6px;
  padding-top: 14px;
  color: ${gray3}
`

export const CommentButtons = styled.div`
  height: 36px;
  width: 100%;
  display: flex;
  justify-content: center;
  aling-items: center;
`

export const CommentAddArea = styled(Comment)`
`

export const CommentContent = styled.div`
  min-height: 114px;
  width: 100%;
  padding: 0 40px;
  color: ${gray4};
  word-wrap: break-word;
`

export const CommentTextArea = styled.textarea`
  min-height: 114px;
  width: 94%;
  padding: 8px 10px;
  color: ${gray4};
  word-wrap: break-word;
  margin: 0 auto;
  outline: none;
  border: none;

`
export const CommentAddSection = styled.div`
  width:100%;
  border-bottom: 1px solid ${gray2};
  padding-bottom: 10px;
`

export const SubmitButton = styled.button`
  height:28px;
  width:90px;
  background: ${gray2};
  color: ${gray3};
  border-radius: 15px;
  font-size: 0.8rem;
  transition: 0.3s all ease;
  border:none;

  &:hover {
    background: ${green2};
    color: white;
    font-weight: bold;
  }
`
