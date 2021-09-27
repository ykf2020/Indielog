import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { gray1, gray2, gray3, gray4, green1, MEDIA_QUERY_768, MEDIA_QUERY_568} from '../../constants.js'
export const Container = styled.div`
  position: fixed;
  display: flex;
  width: 330px;
  height: 70px;
  background: white;
  bottom: 0;
  right: 20px;
  align-items: center;
  z-index: 99;

  ${MEDIA_QUERY_768} {
    width: 100%;
    right: 0;
    height: 50px;
    justify-content: space-between;
  }
`

export const ImgDiv = styled.div`
  margin-left: 10px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${MEDIA_QUERY_768} {
    height: 38px;
    width: 38px;
  }

  ${MEDIA_QUERY_568} {
    height: 30px;
    width: 30px;
  }
`

export const InfoContainer = styled.div`
  height: 100%;
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;

  ${MEDIA_QUERY_768} {
    width: 70%;
  }
`

export const SongName = styled.h2`
  font-size: 16px;
  font-weight: bold;

  ${MEDIA_QUERY_568} {
    font-size: 12px;
  }
`

export const AuthorName = styled.p`
  font-size: 12px;
  color: ${gray3};

  ${MEDIA_QUERY_568} {
    font-size: 8px;
    margin-bottom: 0;
  }
`

export const IconContainer = styled.div`
  height: 100%;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 10px;

  ${MEDIA_QUERY_768} {
    align-self: end;
  }
`
export const FontAwesome = styled(FontAwesomeIcon)`
  color: ${gray3};
  cursor: pointer;
  transition: 0.3s all ease;

  &:hover {
    transform: scale(1.2);
    color: ${gray4};
  }
`

export const Track = styled.div`
  background: linear-gradient(45deg, ${green1}, lightblue);
  width: 100%;
  height: 8px;
  position: absolute;
  overflow: hidden;
  top: -8px;
  border-radius: 4px 4px 0 0 ;

  ${MEDIA_QUERY_768} {
    height: 6px;
    top: -6px;
  }
`

export const AnimateTrack = styled.div`
  background: ${gray2};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  ${({animationPercentage}) => animationPercentage && `
    transform: translateX(${animationPercentage}%)
  `}
`

export const InputRange = styled.input`
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;

  &:focus{
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
  }
`
