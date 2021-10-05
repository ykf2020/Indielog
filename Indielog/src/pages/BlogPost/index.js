import { useState, useEffect } from 'react'
import { getPostWithAuthorInfo, togglePostLiked } from '../../utils/firebase'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'
import CommentArea from '../../components/CommentArea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {
  BlogPostPageContainer,
  PostContainer,
  PostPic,
  PostDesc,
  PostTitle,
  PostContentWrapper,
  AuthorContainer,
  AuthorContainerTitle,
  AuthorImg,
  AuthorInfo,
  AuthorName,
  AuthorDesc,
  LikeButtonDiv,
  LikePush,
  LikeNumber
} from './BlogPostElements.js'
import { setCurrentTitle } from "../../redux/reducers/pageTitleReducer"


const BlogPost = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user.currentUser)
  const { postId } = useParams()
  const [post, setPost] = useState({})
  const [authorInfo, setAuthorInfo] = useState({})
  const isLiked = post.likedBy?.includes(user?.uid)

  useEffect(() => {
    getPostWithAuthorInfo(postId, setPost, setAuthorInfo)
  },[])

  useEffect(() => {
    if(!post) return
    dispatch(setCurrentTitle(post.title))

    return () => {
      dispatch(setCurrentTitle('Indielog'))
    }
  },[post])

  function toggleLiked() {
    if(!user) {
      alert('請先登入會員才能按讚～')
      return
    }
    togglePostLiked(isLiked, postId, user.uid)
  }

  return (
    <>
    <BlogPostPageContainer>
      <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostPic src={post.imageUrl}></PostPic>
      <PostDesc>{post.createdAt?.toDate().toLocaleString([],{year: 'numeric', month: 'numeric', day: 'numeric'})} | {post.topic}</PostDesc>
      <PostContentWrapper dangerouslySetInnerHTML={{__html: post.content}}/>
      </PostContainer>
      <LikePush>覺得文章不錯嗎？按個讚吧！</LikePush>
      <LikeButtonDiv isLiked={isLiked} onClick={toggleLiked}>
        <FontAwesomeIcon icon={faHeart} />
        <LikeNumber>{post.likedBy?.length}</LikeNumber>
      </LikeButtonDiv>
      <AuthorContainer>
        <AuthorContainerTitle>關於作者</AuthorContainerTitle>
        <AuthorImg><img alt='' src={authorInfo?.photoURL ? authorInfo?.photoURL : '/default-user-image.png'}/></AuthorImg>
        <AuthorInfo>
          <AuthorName>{authorInfo?.displayName}</AuthorName>
          <AuthorDesc>{authorInfo?.introduction}</AuthorDesc>
        </AuthorInfo>
      </AuthorContainer>
      <CommentArea area={'posts'} id={postId} />
    </BlogPostPageContainer>
    </>
  )
}

export default BlogPost
