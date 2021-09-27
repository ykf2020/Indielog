import { useState, useEffect } from 'react'
import Post from '../../components/Post'
import styled from 'styled-components'
import firebase from '../../utils/firebase'
import "firebase/compat/firestore"
import { Link } from 'react-router-dom'
import { gray3, MEDIA_QUERY_1024, MEDIA_QUERY_768, MEDIA_QUERY_568  } from '../../constants.js'

const BlogPageContainer = styled.div`
  min-height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  padding-left: 60px;
  padding-top: 80px;
  justify-content: center;

  ${MEDIA_QUERY_1024} {
    flex-direction: column;
    padding: 80px 10px 0;
    justify-content: start;
    align-items: center;
  }
`

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 40px;
`

const TopicsContainer = styled.div`
  max-height:200px;
  border-radius: 6px;
  border: 1px solid ${gray3};
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  padding: 0 8px;

  ${MEDIA_QUERY_1024} {
    width: 80%;
    padding: 6px 8px;
  }

  ${MEDIA_QUERY_768} {
    width: 90%;
  }

`

const Title = styled.h3`
  font-size: 20px;
  color: #010606;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10px;

  ${MEDIA_QUERY_568} {
    font-size: 1rem;
    margin-top: 0px;
    margin-left: 0px;
  }
`

const TopicsWrap = styled.div`
  display:flex;
  flex-wrap: wrap;
  width: 100%:
`

const Topic = styled.button`
  border: 1px solid ${gray3};
  border-radius: 26px;
  height: 26px;
  min-width: 40px;
  background: none;
  padding: 0 10px;
  margin: 6px 6px;
  font-size: 0.8rem;

  ${MEDIA_QUERY_568} {
    font-size: 0.5rem;
    margin: 2px 2px;
  }
`

const PostLink = styled(Link)`
  text-decoration: none;
`


const Blog = () => {
  const [topics, setTopics] = useState([])
  const [posts, setPosts] = useState([])
  useEffect(() => {
    firebase
      .firestore()
      .collection('topics')
      .get()
      .then((collectionSnapShot) => {
        const data = collectionSnapShot.docs.map((doc) => {
          return doc.data()
        })
        setTopics(data)
      })
      firebase
        .firestore()
        .collection('posts')
        .get()
        .then((collectionSnapShot) => {
          const data = collectionSnapShot.docs.map((doc) => {
            const id = doc.id
            return {...doc.data(),id}
          })
          setPosts(data)
        })
  },[])

  return (
    <BlogPageContainer>
      <TopicsContainer>
        <Title>分類</Title>
        <TopicsWrap>
        <Topic>全部文章</Topic>
        {topics.map(topic => {
          return <Topic key={topic.name}>{topic.name}</Topic>
        })}
        </TopicsWrap>
      </TopicsContainer>
      <PostsContainer>
        {posts.map((post) => {
          return <PostLink to={`/blogpost/${post.id}`}>
                    <Post key={post.id}
                          createdAt={post.createdAt.toDate().toLocaleString()}
                          imageUrl={post.imageUrl} topic={post.topic}
                          title={post.title}
                    />
                </PostLink>
        })}
      </PostsContainer>
    </BlogPageContainer>
  )
}

export default Blog
