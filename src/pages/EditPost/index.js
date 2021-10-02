import { useState, useEffect } from 'react'
import styled from 'styled-components'
import firebase from '../../utils/firebase'
import "firebase/compat/firestore"
import "firebase/compat/storage"
import { useHistory, useParams } from 'react-router-dom'
import { gray1, gray2, gray3, gray4, green1, green2 } from '../../constants.js'
import CKE from '../../components/CKEditor'

const BlogPostPageContainer = styled.div`
  width: 80%;
  margin: 0 auto 20px;
  max-width: 860px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`
const Title = styled.h2`
  align-self: flex-start;
  padding-bottom: 2px;
  border-bottom: 2px solid ${green1};
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
`

const InputSection = styled.section`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`

const SectionTitle = styled.h4`
  font-size: 1rem;
  color: ${gray4}
`

const Input = styled.input`
  height: 40px;
  outline: none;
  padding: 0 8px;
  border: 1px solid ${gray3}
`

const Select = styled.select`
  width: 200px;
  outline: none;
  border: 1px solid ${gray3};
`

const ImgSection = styled.div`
  display:flex;
  align-items: flex-end;
  margin-top: 20px;
`

const ImageDiv = styled.div`
  width:  360px;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const UploadButton = styled.label`
  font-size: 14px;
  height: 30px;
  width: 120px;
  cursor: pointer;
  background: ${green1};
  border-radius: 15px;
  line-height: 30px;
  margin-left: 20px;
  text-align: center;
  color: white;
  transition: all 0.2s ease;
  &:hover {
    background: ${green2}
  }
`

const SubmitButton = styled.button`
  border: none;
  height: 40px;
  border-radius: 10px;
  margin-top: 20px;
  border-radius: 5px;
  background: ${green1};
  text-align: center;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    background: ${green2}
  }
`

const EditPost = () => {
  const history = useHistory()
  const { postId } = useParams()
  const [oldImageURL, setOldImageURL] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [topicName, setTopicName] = useState('')
  const [file, setFile] = useState(null)
  const [topics, setTopics] = useState([])
  const previewUrl = file ? URL.createObjectURL(file) : oldImageURL

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
      firebase
        .firestore()
        .collection('posts')
        .doc(postId)
        .get()
        .then((docSnapShot) => {
          const data = docSnapShot.data()
          setTitle(data.title)
          setContent(data.content)
          setTopicName(data.topic)
          setOldImageURL(data.imageUrl)
          console.log(data.imageUrl)
        })
  },[])

  function handleCkeditorContent(e, editor){
    const data = editor.getData()
    setContent(data)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const documentRef = firebase.firestore().collection('posts').doc(postId)
    const fileRef = firebase.storage().ref('post-images/' + documentRef.id)
    const metadata = {
      contentType: file.type
    }

    fileRef.put(file, metadata).then(() => {
      fileRef.getDownloadURL().then((imageUrl) => {
        documentRef.updata({
          title,
          content,
          topic: topicName,
          updatedAt: firebase.firestore.Timestamp.now(),
          imageUrl
        })
        .then(() => {
          history.push(`/blogpost/${postId}`)
        })
      })
    })
  }

  return (
    <BlogPostPageContainer>
      <Title>修改文章</Title>
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
              return <option selected={topic.name===topicName} value={topic.name}>{topic.name}</option>
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

export default EditPost
