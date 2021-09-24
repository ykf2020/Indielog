import { useState, useEffect } from 'react'
import Post from '../../components/Post'
import styled from 'styled-components'
import firebase from '../../utils/firebase'
import "firebase/compat/firestore"
import { Link } from 'react-router-dom'

const BlogPageContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding-left: 60px;
`

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopicsContainer = styled.div`
  max-height:300px;
  border-radius: 6px;
  border: 1px solid grey;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  padding-left: 8px;
`

const Title = styled.h3`
  font-size: 20px;
  color: #010606;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10px;
`

const TopicsWrap = styled.div`
  display:flex;
  flex-wrap: wrap;
  width: 100%:
`

const Topic = styled.button`
  border: 1px solid grey;
  border-radius: 26px;
  height: 26px;
  min-width: 40px;
  background: none;
  padding: 0 10px;
  margin: 6px 4px;
  font-size: 0.8rem;
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
