import { useState, useEffect } from 'react'
import Post from '../../components/Post'
import firebase from '../../utils/firebase'
import "firebase/compat/firestore"
import { useLocation } from 'react-router-dom'
import {
  BlogPageContainer,
  PostsContainer,
  TopicsContainer,
  Title,
  TopicsWrap,
  Topic,
  PostLink
} from './BlogElements.js'



const Blog = () => {
  const [topics, setTopics] = useState([])
  const [posts, setPosts] = useState([])
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const currentTopic = urlSearchParams.get('topic')
  useEffect(() => {
    firebase
      .firestore()
      .collection('topics')
      .get()
      .then((collectionSnapShot) => {
        const data = collectionSnapShot.docs.map((doc) => {
          const id = doc.id
          return {...doc.data(),id}
        })
        setTopics(data)
      })
  },[])
  useEffect(() => {
    if(!currentTopic) {
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
    } else {
      firebase
        .firestore()
        .collection('posts')
        .where('topic','==',currentTopic)
        .get()
        .then((collectionSnapShot) => {
          const data = collectionSnapShot.docs.map((doc) => {
            const id = doc.id
            return {...doc.data(),id}
          })
          setPosts(data)
        })
    }
  },[currentTopic])

  return (
    <BlogPageContainer>
      <TopicsContainer>
        <Title>分類</Title>
        <TopicsWrap>
        <Topic
         to='/blog'
         active={!currentTopic}
        >全部文章</Topic>
        {topics.map(topic => {
          return <Topic
                    key={topic.id}
                    to={`/blog?topic=${topic.name}`}
                    active={currentTopic === topic.name}
                  >
                    {topic.name}
                  </Topic>
        })}
        </TopicsWrap>
      </TopicsContainer>
      <PostsContainer>
        {posts.map((post) => {
          return <PostLink to={`/blogpost/${post.id}`}>
                    <Post key={post.id}
                          createdAt={post.createdAt.toDate().toLocaleString([],{year: 'numeric', month: 'numeric', day: 'numeric'})}
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
