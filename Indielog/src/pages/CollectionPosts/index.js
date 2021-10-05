import { useState, useEffect } from 'react'
import Post from '../../components/Post'
import { getLikedPosts } from '../../utils/firebase'
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
    getLikedPosts(user.uid, setLikedPosts)
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
