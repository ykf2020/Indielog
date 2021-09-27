import { useState } from 'react'
import {
  CommentsContainer,
  CommentAddSection,
  Notice,
  CommentAddArea,
  CommentInfo,
  CommentorImgDiv,
  CommentorName,
  CommentorDate,
  CommentTextArea,
  CommentButtons,
  Comment,
  CommentContent,
} from './CommentAreaElements.js'

const CommentArea = () => {
  const [commentInput, setCommentInput] = useState('')
  const handleCommentInputSubmit = () => {
    setCommentInput('')
  }
  return (
    <CommentsContainer>
      <CommentAddSection>
        <h3>留言</h3>
        <Notice>請先<span>登入</span>以留言</Notice>
        <CommentAddArea>
          <CommentInfo>
            <CommentorImgDiv><img src={'https://assets.juksy.com/files/articles/108444/800x_100_w-60934d08db2e1.jpg'}/></CommentorImgDiv>
            <CommentorName>BB88</CommentorName>
            <CommentorDate> | 2021-05-03 12:00:00</CommentorDate>
          </CommentInfo>
          <CommentTextArea placeholder='點此輸入留言...' value={commentInput} onChange={(e)=> setCommentInput(e.target.value)}>
          </CommentTextArea>
          <CommentButtons>
            <p onClick={handleCommentInputSubmit}>送出留言</p>
          </CommentButtons>
        </CommentAddArea>
      </CommentAddSection>
      <Comment>
        <CommentInfo>
          <CommentorImgDiv><img src={'https://assets.juksy.com/files/articles/108444/800x_100_w-60934d08db2e1.jpg'}/></CommentorImgDiv>
          <CommentorName>BB88</CommentorName>
          <CommentorDate> | 2021-05-03 12:00:00</CommentorDate>
        </CommentInfo>
        <CommentContent>
          mdl 是一個平凡的計程車司機asdadasdasdasdasdasdasdasafldafljfaldldmsaldmslamdl mdl 是一個平凡的計程車司機asdadasdasdasdasdasdasdasafldafljfaldldmsaldmslamdl
        </CommentContent>
        <CommentButtons>
          <p>（1）</p>
          <p>（2）</p>
          <p>（3）</p>
        </CommentButtons>
      </Comment>
      <Comment/>
      <Comment/>
      <Comment/>
    </CommentsContainer>
  )
}

export default CommentArea
