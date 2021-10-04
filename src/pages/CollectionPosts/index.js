import { useState, useEffect } from 'react'
import Post from '../../components/Post'
import firebase from '../../utils/firebase'
import "firebase/compat/firestore"
import { useSelector } from "react-redux";
import {
  MemberPageContainer,
  TitleButtonsGroup,
  TitleNormalButton,
  TitleActiveButton,
  LinkWithoutDecoration,
} from './CollectionPostsElements.js'

const CollectionPosts = () => {
  const user = useSelector((store) => store.user.currentUser)
  const [likedPosts, setLikedPosts] = useState([])
  useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .where('likedBy', 'array-contains', user.uid)
      .get()
      .then((collectionSnapShot) => {
        const data = collectionSnapShot.docs.map((doc) => {
          const id = doc.id
          return {...doc.data(),id}
        })
        setLikedPosts(data)
      })
  },[])
  return (
    <MemberPageContainer>
      <TitleButtonsGroup>
        <TitleActiveButton>說讚的文章</TitleActiveButton>
        <TitleNormalButton to='/member/collections/songs'>說讚的音樂</TitleNormalButton>
      </TitleButtonsGroup>
      {likedPosts.map((post) => {
        return (
          <LinkWithoutDecoration to={`/blogpost/${post.id}`}>
            <Post imageUrl={post.imageUrl} title={post.title} createdAt={post.createdAt.toDate().toLocaleString()} topic={post.topic}/>
          </LinkWithoutDecoration>
        )
      })}
    </MemberPageContainer>
  )
}

export default CollectionPosts
