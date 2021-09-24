import { useState, useEffect } from 'react'
import styled from 'styled-components'
import firebase from '../../utils/firebase'
import "firebase/compat/firestore"
import "firebase/compat/storage"
import { useHistory } from 'react-router-dom'
const BlogPostPageContainer = styled.div`
  border: 1px solid green;
  width: 80%;
  margin: 60px auto 20px;
  max-width: 860px;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h2`
  align-self: flex-start;
`
const Form = styled.form`

`

const Input = styled.input`

`

const TextArea = styled.textarea`

`

const Select = styled.select`

`

const Image = styled.img`

`

const UploadButton = styled.label`

`

const SubmitButton = styled.button`

`

const NewPost = () => {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [topicName, setTopicName] = useState('')
  const [file, setFile] = useState(null)
  const [topics, setTopics] = useState([])
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
        setTopicName(data[0].name)
      })
  },[])

  const previewUrl = file ? URL.createObjectURL(file) : 'https://react.semantic-ui.com/images/wireframe/image.png'

  function onSubmit(e) {
    e.preventDefault()

    const documentRef = firebase.firestore().collection('posts').doc()
    const fileRef = firebase.storage().ref('post-images/' + documentRef.id)
    const metadata = {
      contentType: file.type
    }
    fileRef.put(file, metadata).then(() =>{
      fileRef.getDownloadURL().then((imageUrl) => {
        documentRef.set({
          title,
          content,
          topic: topicName,
          createdAt: firebase.firestore.Timestamp.now(),
          author: {
            displayName: firebase.auth().currentUser.displayName || '',
            photoURL: firebase.auth().currentUser.photoURL || '',
            uid: firebase.auth().currentUser.uid,
            email: firebase.auth().currentUser.email
          },
          imageUrl
        })
        .then(() => {
          history.push('/blog')
        })
      })
    })
  }

  return (

    <BlogPostPageContainer>
      <Title>發表文章</Title>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Image  src={previewUrl}/>
        <UploadButton htmlFor='post-image'>上傳文章圖片</UploadButton>
        <Input
          type="file"
          id='post-image'
          style={{display: 'none'}}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='請輸入文章標題'/>
        <TextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder='請輸入文章內容'/>
        <Select value={topicName} onChange={(e) => setTopicName(e.target.value)}>
          {topics.map((topic) => {
            return <option value={topic.name}>{topic.name}</option>
          })}

        </Select>
        <SubmitButton>送出</SubmitButton>
      </Form>
    </BlogPostPageContainer>
  )
}

export default NewPost
