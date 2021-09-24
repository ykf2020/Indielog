import styled from 'styled-components'

export const PostContainer = styled.div`
  height: 130px;
  width: 660px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 40px;
`

export const PicWrap = styled.div`
  height:100%;
  width:240px;
  overflow: hidden;
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
  justify-content: center;
  align-items: flex-start;
  word-wrap: break-word;
`

export const PostInfo = styled.p`
  color:#01bf71;
  font-size: 0.7rem;
`

export const PostTitle = styled.h2`
  color:#000;
  font-weight: bold;
  font-size: 1.2rem;
`
