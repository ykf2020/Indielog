import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { gray1, gray2, gray3, gray4, black1, peach1, MEDIA_QUERY_1024, MEDIA_QUERY_768, MEDIA_QUERY_568 } from '../../constants.js'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  width:100%;
  padding-top: 80px;
  positon: relative;
  z-index:1;
  background: ${gray1};
`
export const SongsList = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  padding: 0 30px;

  ${MEDIA_QUERY_1024} {
    width: 90%;
  }

  ${MEDIA_QUERY_768} {
    width: 100%;
  }
`
export const Title = styled.h2`
  width:100%;
  border-bottom: 4px solid ${gray2};
  border-radius: 2px;
  padding: 30px 10px;
  margin: 20px 0 0 0;
`
export const Song = styled.div`
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
  }
`
export const SongInfo = styled.div`
  width: 86%;
  height: 100%;
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
  display: flex;
  justify-content: end;
  align-items: center;

  ${MEDIA_QUERY_568} {
    justify-content: center;
    align-items: flex-start;
  }
`
export const NumberDiv = styled.div`
  width: 28px;
`
export const Number = styled.h4`
  font-size:1rem;
  color: ${black1};
`
export const ImgDiv = styled.div`
  width: 100%;
  height: 100%;
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
export const SongDesc = styled(Link)`
  text-decoration: none;
  color: none;
  display:flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
  padding-top: 10px;
  ${MEDIA_QUERY_768} {
    margin-left: 16px;
  }

  ${MEDIA_QUERY_568} {
    margin-left: 10px;
    width: 180px;
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
  position: relative;
  color: ${gray3};

  ${({isLiked}) => isLiked && `
    background: ${peach1};
    color: white;
  `}

  ${MEDIA_QUERY_568} {
    margin-top: 34px;
    min-width: 30px;
    width: 30px;
    height: 30px;
  }
`
export const ImgContainer = styled.div`
  height: 80px;
  width: 80px;
  position: relative;

  ${MEDIA_QUERY_568} {
    height: 50px;
    width: 50px;
  }
`
export const LikeNumber = styled.div`
  font-size: 1rem;
  height: 100%;
  margin: 3px 0 0 6px;



  ${MEDIA_QUERY_568} {
    ${({isLiked}) => isLiked && `
      color: ${peach1};
    `}
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(5px, 24px);
  }

`
export const HoverPlayButton = styled.div`
  width: 90%;
  height: 90%;
  position: absolute;
  z-index: 10;
  border-radius: 50%;
  border: 4px solid white;
  background: rgba(33, 33, 33, 0.5);
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding-left: 6px;
  opacity: 0;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`
