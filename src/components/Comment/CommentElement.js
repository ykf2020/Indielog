import { gray3, gray4, MEDIA_QUERY_568 } from '../../constants.js'
import styled from 'styled-components'

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

export const CommentContent = styled.div`
  min-height: 114px;
  width: 100%;
  padding: 0 40px;
  color: ${gray4};
  word-wrap: break-word;
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
