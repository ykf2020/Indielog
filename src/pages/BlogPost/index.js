import { useState, useEffect } from 'react'
import styled from 'styled-components'
import firebase from '../../utils/firebase'
import "firebase/compat/firestore"
import { useParams } from 'react-router-dom'
import { gray1, gray2, gray3, gray4, black1, green1, green2, MEDIA_QUERY_768, MEDIA_QUERY_568 } from '../../constants.js'
import CommentArea from '../../components/CommentArea'
const BlogPostPageContainer = styled.div`
  width: 80%;
  margin: 0 auto 20px;
  max-width: 860px;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
  background: ${gray1}
  position: relative;
`

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${gray1};
  position: relative;
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
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  p {
    margin: 20px 0;
  }

  img {
    margin: 20px 0;
    height: auto;
    max-width: 100%;
  }

  a {
    color: ${green2}
  }

  a:hover {
    color: ${green1}
  }

  blockQuote {
    border-left: 10px solid ${green1};
    text-align: center;
    color: ${gray2};
    max-width: 100%;
    padding-left: 10px;
  }

  iframe {
    max-width: 100%;
  }
`

const AuthorContainer = styled.div`
  margin: 60px 0;
  border: 1px solid ${gray3};
  border-radius: 30px 6px 30px 6px;
  width: 86%;
  height: 200px;
  display: flex;
  padding: 10px 28px;
  justify-content: space-between;
  align-items: center;
  position: relative;

  ${MEDIA_QUERY_768} {
    padding: 10px 10px;
  }

  ${MEDIA_QUERY_568} {
    width: 100%;
    padding: 0 10px;
  }

`

const AuthorContainerTitle = styled.h4`
  font-size: 14px;
  color: ${gray3};
  width:100px;
  height:20px;
  position: absolute;
  left:32px;
  top:-18px;
  z-index:3;

`

const AuthorImg = styled.div`
  width:  130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;

  ${MEDIA_QUERY_768} {
    width: 90px;
    height: 90px;
  }

  ${MEDIA_QUERY_568} {
    width: 60px;
    height: 60px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

`

const AuthorInfo = styled.div`
  height: 100%;
  width: 72%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  word-wrap: break-word;

  ${MEDIA_QUERY_768} {
    padding-top: 40px;
  }

`

const AuthorName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 12px;

  ${MEDIA_QUERY_768} {
    font-size: 1.3rem;
  }
`


const AuthorDesc = styled.h4`
  font-size: 1rem;
  color: ${gray3};

  ${MEDIA_QUERY_768} {
    font-size: 0.8rem;
  }
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
      <PostContentWrapper dangerouslySetInnerHTML={{__html: post.content}}/>
      </PostContainer>
      <AuthorContainer>
        <AuthorContainerTitle>關於作者</AuthorContainerTitle>
        <AuthorImg><img src={'https://assets.juksy.com/files/articles/108444/800x_100_w-60934d08db2e1.jpg'}/></AuthorImg>
        <AuthorInfo>
          <AuthorName>海象</AuthorName>
          <AuthorDesc>只是一個平凡的計程車司機asdadasdasdasdasdasdasdasafldafljfaldldmsaldmslamdl</AuthorDesc>
        </AuthorInfo>
      </AuthorContainer>
      <CommentArea/>
    </BlogPostPageContainer>
    </>
  )
}

export default BlogPost
