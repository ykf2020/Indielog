import Post from '../../components/Post'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { gray1, gray2, gray3, gray4, green1, green2, black1, MEDIA_QUERY_568, MEDIA_QUERY_768 } from '../../constants.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import firebase from '../../utils/firebase'
import "firebase/compat/firestore"
import "firebase/compat/auth"

const MemberPageContainer = styled.div`
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

const TitleButtonsGroup = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0 20px;
  border-bottom: 1px solid ${gray2};
`

const TitleNormalButton = styled(Link)`
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

const TitleActiveButton = styled.button`
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

const LinkWithoutDecoration = styled(Link)`
  text-decoration: none;
`
const PostDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ButtonsGroup = styled.div`
  margin-top: 30px;
  width: 180px;
  height: 40px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${gray2};
`

const Button = styled.div`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background: ${green1};
  color: white;
  cursor:pointer;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${green2};
  }
`

const data = {
  imageUrl:'https://firebasestorage.googleapis.com/v0/b/indielog-172c8.appspot.com/o/post-images%2F50GAuhHpeorMaut9My07?alt=media&token=e2cd01f8-f4a7-49d1-aae4-fe9b67f78ed5',
  title:'【吹專訪】18歲的迷因饒舌少年家——潮州土狗：我本來要叫哈士奇但已經有人用了！',
  createdAt:'2021/9/28 下午12:11:11',
  topic:'音樂雜談'
}

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
