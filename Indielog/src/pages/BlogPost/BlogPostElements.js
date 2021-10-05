import styled from 'styled-components'
import { gray1, gray2, gray3, green1, green2, peach1, MEDIA_QUERY_768, MEDIA_QUERY_568 } from '../../utils/constants.js'
export const BlogPostPageContainer = styled.div`
  width: 80%;
  margin: 0 auto 20px;
  max-width: 860px;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
  background: ${gray1}
  position: relative;
`

export const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${gray1};
  position: relative;
`

export const PostPic = styled.img`
  width: 120%;
  margin-bottom: 20px;
`

export const PostDesc = styled.p`
  font-size: 0.7rem;
  color: #bbb
`

export const PostTitle = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  margin: 0 80px 40px;

  ${MEDIA_QUERY_568} {
    width: 100%;
    font-size: 1.2rem;
    margin: 0 14px 40px;
  }
`

export const PostContentWrapper = styled.div`
  width:100%;
  margin-top: 40px;
  color: #666;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  p {
    margin: 20px 0;
  }

  img {
    margin: 20px 0;
    height: auto;
    max-width: 100%;
  }

  a {
    color: ${green2};
    text-decoration: none;
  }

  a:hover {
    color: ${green1}
  }

  blockQuote {
    border-left: 10px solid ${green1};
    text-align: center;
    color: ${gray3};
    max-width: 100%;
    padding-left: 10px;
  }

  iframe {
    max-width: 100%;
  }
`

export const AuthorContainer = styled.div`
  margin: 60px 0;
  border: 1px solid ${gray3};
  border-radius: 30px 6px 30px 6px;
  width: 86%;
  height: 200px;
  display: flex;
  padding: 10px 28px;
  justify-content: space-between;
  align-items: center;
  position: relative;

  ${MEDIA_QUERY_768} {
    padding: 10px 10px;
  }

  ${MEDIA_QUERY_568} {
    width: 100%;
    padding: 0 10px;
  }

`

export const AuthorContainerTitle = styled.h4`
  font-size: 14px;
  color: ${gray3};
  width:100px;
  height:20px;
  position: absolute;
  left:32px;
  top:-18px;
  z-index:3;

`

export const AuthorImg = styled.div`
  width:  130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;

  ${MEDIA_QUERY_768} {
    width: 90px;
    height: 90px;
  }

  ${MEDIA_QUERY_568} {
    width: 60px;
    height: 60px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const AuthorInfo = styled.div`
  height: 100%;
  width: 72%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  word-wrap: break-word;

  ${MEDIA_QUERY_768} {
    padding-top: 40px;
  }

`

export const AuthorName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 12px;

  ${MEDIA_QUERY_768} {
    font-size: 1.3rem;
  }
`


export const AuthorDesc = styled.h4`
  font-size: 1rem;
  color: ${gray3};

  ${MEDIA_QUERY_768} {
    font-size: 0.8rem;
  }
`

export const LikeButtonDiv = styled.div`
  min-width: 80px;
  height: 30px;
  background: ${gray2};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  cursor: pointer;
  color: ${gray3};

  ${({isLiked}) => isLiked && `
    background: ${peach1};
    color: white;
  `}
`

export const LikeNumber = styled.div`
  font-size: 1rem;
  height: 100%;
  margin: 3px 0 0 6px;
`

export const LikePush = styled.div`
  font-size: 0.8rem;
  color: ${gray3};
  margin-bottom: 10px;
`
