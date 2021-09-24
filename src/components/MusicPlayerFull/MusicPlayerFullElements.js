import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { gray1, gray2, gray3, gray4, black1, MEDIA_QUERY_768, MEDIA_QUERY_1024, MEDIA_QUERY_1400 } from '../../constants.js'
export const Container = styled.div`
  background-image: url('https://akstatic.streetvoice.com/song_covers/br/in/bringmesomesoup/eLgqpgYWGVawffdNWb8gYC.jpg?x-oss-process=image/resize,m_fill,h_610,w_610,limit_0/interlace,1/quality,q_95/sharpen,80/format,jpg');
  background-size: 180%;
  background-position: center;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 50;
  overflow: hidden;

  &:before {
    content: '';
    position: fixed;
    z-index: -2;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(30px) brightness(40%);
    -webkit-backdrop-filter: blur(30px) brightness(40%);

  }
`

export const BgFilter = styled.div`
  background: ${black1};
  positon: absolute;
  opacity: 0.7;
  width: 100%;
  height: 100%;
  z-index: -5;
`

export const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 16%;
  padding: 0 10%;
  positon: relative;
`

export const NavLogo = styled(Link)`
  color: white;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 12px;
  font-weight: bold;
  text-decoration: none;
`

export const FontAwesome = styled(FontAwesomeIcon)`
  color: ${gray3};
  cursor: pointer;
  transition: 0.3s all ease;

  &:hover {
    color: white;
  }
`

export const BodyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`

export const Library = styled.div`
  display: flex;
  opacity: 0;
  width: 0;
  height: 100%;
  border: 1px solid green;
  transition: 0.5s all ease;
  transform: translateX(-100%);

  ${({libraryStatus}) => libraryStatus && `
    width: 40%;
    opacity:1;
    transform: translateX(0%);
  `}

  ${MEDIA_QUERY_768} {
    position: absolute;
    z-index: 5;
    ${({libraryStatus}) => libraryStatus && `
      width: 100%;
      opacity:1;
      transform: translateX(0%);
    `}
  }
`

export const Song = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  transition: 0.5s all ease;

  ${MEDIA_QUERY_768} {
    position: absolute;
    z-index: 3;
  }
`

export const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  height: 60%;
  width: 50%;
  text-align: center;



  ${MEDIA_QUERY_1400} {
    width:80%;
    padding: 0 40px;
  }

  ${MEDIA_QUERY_1024} {
    width:100%;
    padding: 0 50px;
  }
`
export const ImgDiv = styled.div`
  width:  500px;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
export const SongName = styled.h1`
  font-size: 26px;
  font-weight: bold;
  color: white;
  margin-top: 20px;
`

export const AuthorName = styled.p`
  font-size: 18px;
  color: white;
`

export const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 30%;
  position: relative;

  ${MEDIA_QUERY_1024} {
    width:70%;
    padding: 0 40px;
  }

  ${MEDIA_QUERY_1024} {
    width:80%;
    padding: 0 40px;
  }
`

export const Slider = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items:center;
  margin-top: 60px;
  width: 100%;
`

export const Track = styled.div`
  background: linear-gradient(to right, lightgreen, white);
  width: 86%;
  height: 10px;
  overflow: hidden;
  position: relative;
  margin: 0 6px;
`

export const AnimateTrack = styled.div`
  background: black;
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

  &::focus{
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
  }
`
export const SongCurrentTime = styled.p`
  color: white;
  font-size: 14px;
`

export const SongFullTime = styled.p`
  color: white;
  font-size: 14px;
`

export const FontAwesomeControl = styled(FontAwesomeIcon)`
  color: ${gray3};
  cursor: pointer;
  transition: 0.3s all ease;

  &:hover {
    color: white
  }
`

export const ToggleButton = styled(FontAwesomeIcon)`
  color: ${gray3};
  position:absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.3s all ease;
  cursor: pointer;

  &:hover {
    color: white;
  }
`
