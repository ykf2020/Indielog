import { Comment as CommentDiv, CommentInfo, CommentorImgDiv, CommentorName, CommentorDate, CommentContent, CommentButtons } from './CommentElement.js'
import { useState, useEffect } from 'react'
import firebase from '../../utils/firebase.js'
import "firebase/compat/firestore"

const Comment = ({ currentComment }) => {
  const [authorInfo, setAuthorInfo] = useState({})
  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(currentComment.authorUid)
      .get()
      .then((userSnapShot) => {
        setAuthorInfo(userSnapShot.data())
      })
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
