import { useState, useEffect } from 'react'
import firebase from '../../utils/firebase'
import "firebase/compat/firestore"
import "firebase/compat/storage"
import { useHistory } from 'react-router-dom'
import CKE from '../../components/CKEditor'
import {
  BlogPostPageContainer,
  Title,
  Form,
  InputSection,
  SectionTitle,
  Input,
  Select,
  ImgSection,
  ImageDiv,
  UploadButton,
  SubmitButton
} from './NewPostElements.js'


const NewPost = () => {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [topicName, setTopicName] = useState('')
  const [file, setFile] = useState(null)
  const [topics, setTopics] = useState([])
  const previewUrl = file ? URL.createObjectURL(file) : '/image.png'

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

  function handleCkeditorContent(e, editor){
    const data = editor.getData()
    setContent(data)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const documentRef = firebase.firestore().collection('posts').doc()
    const fileRef = firebase.storage().ref('post-images/' + documentRef.id)
    const metadata = {
      contentType: file.type
    }

    fileRef.put(file, metadata).then(() => {
      fileRef.getDownloadURL().then((imageUrl) => {
        documentRef.set({
          title,
          content,
          topic: topicName,
          createdAt: firebase.firestore.Timestamp.now(),
          author: {
            uid: firebase.auth().currentUser.uid,
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
      <Form onSubmit={(e) => handleSubmit(e)}>
        <ImgSection>
          <ImageDiv><img src={previewUrl}/></ImageDiv>
          <UploadButton htmlFor='post-image'>上傳文章封面</UploadButton>
          <Input
            type="file"
            id='post-image'
            style={{display: 'none'}}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </ImgSection>
        <InputSection>
          <SectionTitle>選擇主題：</SectionTitle>
          <Select value={topicName} onChange={(e) => setTopicName(e.target.value)}>
            {topics.map((topic) => {
              return <option value={topic.name}>{topic.name}</option>
            })}
          </Select>
        </InputSection>
        <InputSection>
          <SectionTitle>文章標題：</SectionTitle>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='請輸入文章標題'/>
        </InputSection>
        <InputSection>
          <SectionTitle>文章內容：</SectionTitle>
          <CKE
            handleCkeditorContent={handleCkeditorContent}
          />
        </InputSection>
        <SubmitButton>送出</SubmitButton>
      </Form>
    </BlogPostPageContainer>
  )
}

export default NewPost
