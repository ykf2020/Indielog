import Post from '../../components/Post'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import firebase from '../../utils/firebase'
import "firebase/compat/firestore"
import "firebase/compat/auth"
import {
  MemberPageContainer,
  TitleButtonsGroup,
  TitleNormalButton,
  TitleActiveButton,
  LinkWithoutDecoration,
  ButtonsGroup,
  Button,
  PostDiv
} from './MyPostsElements.js'

const MyPosts = () => {
  const user = firebase.auth().currentUser
  const [posts, setPosts] = useState([])

  useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .where('author.uid','==', user.uid)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          const id = doc.id
          return { ...doc.data(), id }
        })
        setPosts(data)
      })
  },[])
  return (
    <MemberPageContainer>
      <TitleButtonsGroup>
        <TitleActiveButton>我的文章</TitleActiveButton>
        <TitleNormalButton to='/member/personal-info'>會員資料</TitleNormalButton>
      </TitleButtonsGroup>
      {posts.map(post => {
        return (
          <PostDiv key={post.id}>
            <LinkWithoutDecoration to={`/blogpost/${post.id}`}>
              <Post imageUrl={post.imageUrl} title={post.title} createdAt={post.createdAt.toDate().toLocaleString()} topic={post.topic}/>
            </LinkWithoutDecoration>
            <ButtonsGroup>
              <LinkWithoutDecoration to={`/editpost/${post.id}`}><Button><FontAwesomeIcon icon={faPen}/></Button></LinkWithoutDecoration>
              <Button><FontAwesomeIcon icon={faTrash}/></Button>
            </ButtonsGroup>
          </PostDiv>
        )
      })}
    </MemberPageContainer>
  )
}

export default MyPosts
