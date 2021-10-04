import { Comment as CommentDiv, CommentInfo, CommentorImgDiv, CommentorName, CommentorDate, CommentContent, CommentButtons } from './CommentElement.js'
import { useState, useEffect } from 'react'
import { getAuthorInfo } from '../../utils/firebase.js'

const Comment = ({ currentComment }) => {
  const [authorInfo, setAuthorInfo] = useState({})

  useEffect(() => {
    getAuthorInfo(currentComment.authorUid, setAuthorInfo)
  },[currentComment])
  
  return (
    <CommentDiv>
      <CommentInfo>
        <CommentorImgDiv><img src={authorInfo.photoURL ? authorInfo.photoURL : '/default-user-image.png'}/></CommentorImgDiv>
        <CommentorName>{authorInfo.displayName}</CommentorName>
        <CommentorDate>{currentComment.createdAt.toDate().toLocaleString()}</CommentorDate>
      </CommentInfo>
      <CommentContent>
        {currentComment.content}
      </CommentContent>
      <CommentButtons>
      </CommentButtons>
    </CommentDiv>
  )
}

export default Comment
