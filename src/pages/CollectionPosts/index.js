import Post from '../../components/Post'
import styled from 'styled-components'
import { gray1, gray2, gray3, gray4, green1, green2, black1, MEDIA_QUERY_568, MEDIA_QUERY_768 } from '../../constants.js'
import { Link } from 'react-router-dom'

const MemberPageContainer = styled.div`
  width: 80%;
  margin: 0 auto 20px;
  max-width: 860px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;

  ${MEDIA_QUERY_568} {
    width: 100%;
  }
`

const TitleButtonsGroup = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0 20px;
  border-bottom: 1px solid ${gray2};
`

const TitleNormalButton = styled(Link)`
  text-decoration: none;
  line-height: 2.2rem;
  font-size: 0.9rem;
  color: ${gray3};
  background: none;
  border: none;
  margin: 10px 20px;
  transition: all 0.3s ease;
  &:hover {
    color: ${black1};
    transform: translateY(-10%);
  }
  ${MEDIA_QUERY_568} {
    font-size: 0.6rem;
    margin: 10px 12px;
  }
`

const TitleActiveButton = styled.button`
  border-radius: 30px;
  color: white;
  background: ${green1};
  width: 120px;
  border: none;
  padding: 6px 10px;
  margin: 10px 20px;
  ${MEDIA_QUERY_568} {
    font-size: 0.6rem;
    padding: 6px 4px;
  }
`

const LinkWithoutDecoration = styled(Link)`
  text-decoration: none;
`

const data = {
  imageUrl:'https://firebasestorage.googleapis.com/v0/b/indielog-172c8.appspot.com/o/post-images%2F50GAuhHpeorMaut9My07?alt=media&token=e2cd01f8-f4a7-49d1-aae4-fe9b67f78ed5',
  title:'【吹專訪】18歲的迷因饒舌少年家——潮州土狗：我本來要叫哈士奇但已經有人用了！',
  createdAt:'2021/9/28 下午12:11:11',
  topic:'音樂雜談'
}

const CollectionPosts = () => {
  return (
    <MemberPageContainer>
      <TitleButtonsGroup>
        <TitleActiveButton>說讚的文章</TitleActiveButton>
        <TitleNormalButton to='/member/collections/songs'>說讚的音樂</TitleNormalButton>
        <TitleNormalButton to='/member/personal-info'>會員資料</TitleNormalButton>
      </TitleButtonsGroup>
      <LinkWithoutDecoration>
        <Post imageUrl={data.imageUrl} title={data.title} createdAt={data.createdAt} topic={data.topic}/>
      </LinkWithoutDecoration>
      <LinkWithoutDecoration>
        <Post imageUrl={data.imageUrl} title={data.title} createdAt={data.createdAt} topic={data.topic}/>
      </LinkWithoutDecoration>
      <LinkWithoutDecoration>
        <Post imageUrl={data.imageUrl} title={data.title} createdAt={data.createdAt} topic={data.topic}/>
      </LinkWithoutDecoration>
    </MemberPageContainer>
  )
}

export default CollectionPosts
