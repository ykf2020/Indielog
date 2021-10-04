import Post from '../../components/Post'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deletePost, getMyPostsOnSnapshot } from '../../utils/firebase'
import { useSelector } from 'react-redux'
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
  const [posts, setPosts] = useState([])
  const user = useSelector((store) => store.user.currentUser)

  useEffect(() => {
    getMyPostsOnSnapshot(user.uid, setPosts)
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
              <Button onClick={() => {deletePost(post.id)}}><FontAwesomeIcon icon={faTrash}/></Button>
            </ButtonsGroup>
          </PostDiv>
        )
      })}
    </MemberPageContainer>
  )
}

export default MyPosts
