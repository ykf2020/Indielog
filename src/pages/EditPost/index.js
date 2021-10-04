import { useState, useEffect } from 'react'
import { getTopics, getPost, updatePost, updatePostWithNewPic } from '../../utils/firebase'
import { useHistory, useParams } from 'react-router-dom'
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
} from './EditPostElements.js'

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
  const user = useSelector((store) => store.user.currentUser)
  function handleGetPageData(data){
    setTitle(data.title)
    setContent(data.content)
    setTopicName(data.topic)
    setOldImageURL(data.imageUrl)
  }

  function handleCkeditorContent(e, editor){
    const data = editor.getData()
    setContent(data)
  }

  function handleEditPostSucceed(postId){
    history.push(`/blogpost/${postId}`)
  }

  useEffect(() => {
    getTopics(setTopics)
    getPost(postId, handleGetPageData)
  },[])



  function handleSubmit(e) {
    e.preventDefault()
    const postInfo = {
      title,
      content,
      topic: topicName,
      userId: user.uid,
    }
    if(file) {
      updatePostWithNewPic(postId, postInfo, handleEditPostSucceed)
    } else {
      updatePost(postId, postInfo, handleEditPostSucceed)
    }
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
            data={content}
            handleCkeditorContent={handleCkeditorContent}
          />
        </InputSection>
        <SubmitButton>送出</SubmitButton>
      </Form>
    </BlogPostPageContainer>
  )
}

export default EditPost
