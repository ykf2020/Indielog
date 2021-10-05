import styled from 'styled-components'
import { green1, black1, MEDIA_QUERY_768, MEDIA_QUERY_568 } from '../../utils/constants.js'
export const PostContainer = styled.div`
  height: 130px;
  width: 660px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 40px;

  ${MEDIA_QUERY_768} {
    width:500px;
  }

  ${MEDIA_QUERY_568} {
    width: 100vw;
    padding: 0 6px;

  }
`

export const PicWrap = styled.div`
  height:100%;
  width:240px;
  overflow: hidden;

  ${MEDIA_QUERY_568} {
    width: 100%;
    margin: auto 0;
  }
`

export const PostPic = styled.img`
  width: 100%;
  object-fit: cover
`

export const PostMain = styled.div`
  width:380px;
  margin-left: 20px;
  padding-right: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  word-wrap: break-word;
  padding-top: 10px;

  ${MEDIA_QUERY_568} {
    width: 280px;
    padding-top:0px;
  }
`

export const PostInfo = styled.p`
  color: ${green1};
  font-size: 0.7rem;

  ${MEDIA_QUERY_568} {
    margin: 0;
    font-size: 8px;
  }

`

export const PostTitle = styled.h2`
  color: ${black1};
  font-weight: bold;
  font-size: 1.2rem;

  ${MEDIA_QUERY_568} {
    font-size: 0.9rem;;
  }
`
