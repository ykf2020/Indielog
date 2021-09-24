import { useState, useEffect } from 'react'
import styled from 'styled-components'
import firebase from '../../utils/firebase'
import "firebase/compat/firestore"
import { useParams } from 'react-router-dom'

const BlogPostPageContainer = styled.div`
  border: 1px solid green;
  width: 80%;
  margin: 100px auto 20px;
  max-width: 860px;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PostContainer = styled.div`
  border: 1px solid blue;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PostPic = styled.img`
  width: 120%;
  margin-bottom: 20px;
`

const PostDesc = styled.p`
  font-size: 0.7rem;
  color: #bbb
`

const PostTitle = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  margin: 0 80px 40px;
`

const PostContentWrapper = styled.div`
  width:100%;
  margin-top: 40px;
  color: #666;

  p {
    margin: 20px 0;
  }

  img {
    margin: 20px 0;
    height: auto;
    max-width: 100%;
  }

`

const AuthorContainer = styled.div`
  margin: 20px 0;
  border: 1px solid #aaa;
  border-radius: 30px 6px 30px 6px;
  width: 86%;
  height: 200px;
  display: flex;
`

const BlogPost = () => {
  const { postId } = useParams()
  const[post, setPost] = useState({})
  useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((docSnapShot) => {
        const data = docSnapShot.data()
        setPost(data)
      })
  },[])
  return (
    <>
    <BlogPostPageContainer>
      <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostPic src={post.imageUrl}></PostPic>
      <PostDesc>{post.createdAt?.toDate().toLocaleString()} | {post.topic}</PostDesc>
      <PostContentWrapper>{post.content}</PostContentWrapper>
      </PostContainer>
      <AuthorContainer />
    </BlogPostPageContainer>
    </>
  )
}

export default BlogPost
