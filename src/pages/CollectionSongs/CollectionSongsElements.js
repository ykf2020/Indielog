import styled from 'styled-components'
import { gray2, gray3, gray4, green1, black1, MEDIA_QUERY_568, MEDIA_QUERY_768 } from '../../constants.js'
import { Link } from 'react-router-dom'
export const MemberPageContainer = styled.div`
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

export const TitleButtonsGroup = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0 20px;
  border-bottom: 1px solid ${gray2};
`

export const TitleNormalButton = styled(Link)`
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

export const TitleActiveButton = styled.button`
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

export const LinkWithoutDecoration = styled(Link)`
  text-decoration: none;
`

export const Song = styled.div`
  /* border: 1px solid yellow; */
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  border-bottom: 1px solid ${gray2};
  padding: 0 20px;

  &:hover {
    background: white;
  }

  ${MEDIA_QUERY_568} {
    padding: 0 0;
    width: 86%;
  }
`
export const SongInfo = styled(Link)`
  text-decoration: none;
  color: none;
  width: 86%;
  height: 100%;
  /* border: 1px solid orange; */
  display: flex;
  align-items: center;
`
export const SongName = styled.h3`
  color: ${black1};
  font-size: 1.2rem;
  font-weight: bold;

  ${MEDIA_QUERY_768} {
    font-size: 1rem;
  }

  ${MEDIA_QUERY_568} {
    font-size: 0.8rem;
  }
`
export const AuthorName = styled.p`
  color: ${gray4};
  font-size: 0.8rem;
  color: ${gray3}

  ${MEDIA_QUERY_768} {
    font-size: 0.6rem;
  }

  ${MEDIA_QUERY_568} {
    font-size: 0.5rem;
  }
`
export const SongButtons = styled.div`
  width: 14%;
  height: 100%;
  /* border: 1px solid orange; */
  display: flex;
  justify-content: end;
  align-items: center;
`

export const NumberDiv = styled.div`
  width: 36px;
  /* border: 1px solid blue; */
`

export const Number = styled.h4`
  font-size:1rem;
  color: ${black1};
`

export const ImgDiv = styled.div`
  height: 80px;
  width: 80px;
  /* border: 1px solid black; */
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  cursor:pointer;
  z-index:1;

  ${MEDIA_QUERY_568} {
    height: 50px;
    width: 50px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 2;
  }
`


export const SongDesc = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 40px;
  padding-top: 10px;

  ${MEDIA_QUERY_768} {
    margin-left: 16px;
  }

  ${MEDIA_QUERY_568} {
    margin-left: 10px;
  }
`
