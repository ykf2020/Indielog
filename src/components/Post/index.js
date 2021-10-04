import { PostContainer,PicWrap, PostPic, PostMain, PostInfo, PostTitle} from './PostElements.js'
const Post = ({imageUrl, title, createdAt, topic}) => {
  return (
      <PostContainer>
        <PicWrap>
          <PostPic src={imageUrl}/>
        </PicWrap>
        <PostMain>
          <PostInfo>{createdAt} | {topic}</PostInfo>
          <PostTitle>{title}</PostTitle>
        </PostMain>
      </PostContainer>
  )
}
export default Post
