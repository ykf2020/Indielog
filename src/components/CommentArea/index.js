import { useState, useEffect } from 'react'
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
  CommentContent,
  SubmitButton,
} from './CommentAreaElements.js'
import Comment from '../Comment'
import firebase from '../../utils/firebase.js'
import 'firebase/compat/auth';
import "firebase/compat/firestore"

const CommentArea = ({ postId }) => {
  const user = firebase.auth().currentUser
  const [commentInput, setCommentInput] = useState('')
  const [comments, setComments] = useState([])
  const handleCommentInputSubmit = () => {
    firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .doc()
      .set({
        content: commentInput,
        createdAt: firebase.firestore.Timestamp.now(),
        authorUid: user.uid,
      }).then(() => {
        setCommentInput('')
      })
  }
  useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .onSnapshot((collectionSnapShot) => {
         const data = collectionSnapShot.docs.map((doc) => {
           return {
             authorUid: doc.data().authorUid,
             content: doc.data().content,
             createdAt: doc.data().createdAt
           }
         })
         setComments(data)
      })
  },[])
  return (
    <CommentsContainer>
      <CommentAddSection>
        <h3>留言</h3>
        {user ?
          <CommentAddArea>
            <CommentInfo>
              <CommentorImgDiv><img src={user.photoURL ? user.photoURL : '/default-user-image.png'}/></CommentorImgDiv>
              <CommentorName>{user.displayName}</CommentorName>
            </CommentInfo>
            <CommentTextArea placeholder='點此輸入留言...' value={commentInput} onChange={(e)=> setCommentInput(e.target.value)}>
            </CommentTextArea>
            <CommentButtons>
              <SubmitButton onClick={handleCommentInputSubmit}>送出留言</SubmitButton>
            </CommentButtons>
          </CommentAddArea>
          :
          <Notice>請先<span>登入</span>以留言</Notice>
        }
      </CommentAddSection>
      {comments.map(comment => {
        return (
          <Comment currentComment={comment}>
          </Comment>
        )
      })}

    </CommentsContainer>
  )
}

export default CommentArea
