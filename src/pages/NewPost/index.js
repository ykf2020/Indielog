import { useState, useEffect } from 'react'
import { getTopicsAndSetDefaultTopic, addNewPost } from '../../utils/firebase'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
  const user = useSelector((store) => store.user.currentUser)

  function handleCkeditorContent(e, editor){
    const data = editor.getData()
    setContent(data)
  }

  function handleNewPostSucceed(postId){
    history.push(`/blogpost/${postId}`)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const postInfo = {
      title,
      content,
      topic: topicName,
      userId: user.uid,
    }
    addNewPost(file, postInfo, handleNewPostSucceed)
  }

  useEffect(() => {
    getTopicsAndSetDefaultTopic(setTopics, setTopicName)
  },[])

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
