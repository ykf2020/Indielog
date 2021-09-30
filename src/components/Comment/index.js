import { Comment as CommentDiv, CommentInfo, CommentorImgDiv, CommentorName, CommentorDate, CommentContent, CommentButtons } from './CommentElement.js'
import { useState, useEffect } from 'react'
import firebase from '../../utils/firebase.js'
import "firebase/compat/firestore"

const Comment = ({ currentComment }) => {
  const [comment, setComment] = useState(currentComment)
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
  },[])
  return (
    <CommentDiv>
      <CommentInfo>
        <CommentorImgDiv><img src={authorInfo.photoURL ? authorInfo.photoURL : 'https://assets.juksy.com/files/articles/108444/800x_100_w-60934d08db2e1.jpg'}/></CommentorImgDiv>
        <CommentorName>{authorInfo.displayName}</CommentorName>
        <CommentorDate>{comment.createdAt.toDate().toLocaleString()}</CommentorDate>
      </CommentInfo>
      <CommentContent>
        {comment.content}
      </CommentContent>
      <CommentButtons>
        <p>（1）</p>
        <p>（2）</p>
        <p>（3）</p>
      </CommentButtons>
    </CommentDiv>
  )
}

export default Comment
