import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { gray1, gray3, green1, black1, MEDIA_QUERY_568, MEDIA_QUERY_768, MEDIA_QUERY_1024, MEDIA_QUERY_1400 } from '../../constants.js'

export const Container = styled.div`
  display: block;
  background-size: 180%;
  background-position: center;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1002;
  overflow: hidden;
  
  ${({bgImg}) => bgImg && `
    background-image: url(${bgImg});
  `}

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

export const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 16%;
  padding: 0 10%;
  positon: fixed;
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
  font-family: 'Dancing Script', cursive;
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
  flex-direction: column;
  opacity: 0;
  width: 0;
  height: 84%;
  padding: 1rem 0;
  transition: 0.3s all ease;
  transform: translateX(-100%);
  overflow-Y: scroll;

  ${({mode}) => (mode===3) && `
    width: 40%;
    opacity:1;
    transform: translateX(0%);

  `}

  ${MEDIA_QUERY_1400} {
    ${({mode}) => (mode===3) && `
      width: 50%;
      opacity:1;
      transform: translateX(0%);
    `}
  }
  ${MEDIA_QUERY_768} {
    position: absolute;
    z-index: 5;
    ${({mode}) => (mode===3) && `
      width: 100%;
      opacity:1;
      transform: translateX(0%);
    `}
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${green1};
    border-radius: 20px;
    border: transparent;
  }

`

export const LibrarySongDiv = styled.div`
    color: white;
    display: flex;
    align-items: center;
    padding: 1rem 2rem 1rem 3rem;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: ${green1}
    }

    ${({ active }) => active && `
      background: ${green1};
    `}
`

export const LibrarySongDesc = styled.div`
  padding-left: 1rem;
  width: calc(100% - 100px);
`

export const LibrarySongName = styled.div`
  width:100%;
  font-size: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const LibrarySongAuthorName = styled.div`
  width:100%;
  font-size: 0.7rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const LibraryImgDiv = styled.div`
  width:  100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Song = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  transition: 0.3s all ease;

  ${({mode}) => (mode===3) && `
    width: 70%;
    opacity:1;
    transform: translateX(0%);
  `}

  ${MEDIA_QUERY_1400} {
    ${({mode}) => (mode===3) && `
      width: 50%;
      opacity:1;
      transform: translateX(0%);
    `}
  }

  ${MEDIA_QUERY_768} {
    position: absolute;
    z-index: 3;
    ${({mode}) => (mode===3) && `
      opacity:0;
    `}
  }
`

export const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  height: 60%;
  width: 70%;
  text-align: center;

  ${MEDIA_QUERY_1400} {
    ${({mode}) => (mode===3) && `
      width: 90%;
    `}
  }

  ${MEDIA_QUERY_1024} {
    ${({mode}) => (mode===3) && `
      width: 95%;
    `}
  }

  ${MEDIA_QUERY_768} {
    width: 100%;
  }

  ${MEDIA_QUERY_568} {
    padding: 0 20px;
    height: 56%;
  }
`
export const ImgDiv = styled.div`
  width:  330px;
  height: 330px;
  border-radius: 20px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${MEDIA_QUERY_1024} {
    ${({mode}) => (mode===3) && `
      width:  300px;
      height: 300px;
      border-radius: 16px;
    `}
  }

  ${MEDIA_QUERY_568} {
    width:  260px;
    height: 260px;
    border-radius: 16px;
    margin-bottom: 40px
  }
`
export const SongName = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: white;
  margin-top: 20px;

  ${MEDIA_QUERY_1024} {
    ${({mode}) => (mode===3) && `
      font-size: 16px;
    `}
  }

  ${MEDIA_QUERY_568} {
    font-size: 18px;
    width:100%;
    margin-top: 0px;
  }
`

export const AuthorName = styled.div`
  font-size: 18px;
  color: white;

  ${MEDIA_QUERY_568} {
    font-size: 12px;
    width:100%;
    margin-bottom: 0;
  }
`

export const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 30%;
  position: relative;

  ${MEDIA_QUERY_1400} {
    width:70%;
    padding: 0 40px;
  }

  ${MEDIA_QUERY_1024} {
    width:80%;
    padding: 0 20px;
  }

  ${MEDIA_QUERY_768} {
    width: 100%;
    padding: 0 20px;
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
  background: linear-gradient(45deg, ${green1}, lightblue);
  width: 86%;
  height: 10px;
  overflow: hidden;
  position: relative;
  margin: 0 6px;
  border-radius: 20px;
`

export const AnimateTrack = styled.div`
  background: ${black1};
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
  margin:0;
`

export const SongFullTime = styled.p`
  color: white;
  font-size: 14px;
  margin:0;
`

export const FontAwesomeControl = styled(FontAwesomeIcon)`
  color: ${gray3};
  cursor: pointer;
  transition: 0.3s all ease;

  &:hover {
    color: white
  }
`

export const MainFontAwesomeControl = styled(FontAwesomeControl)`
  margin-left: 4px;
`

export const LoopButton = styled(FontAwesomeIcon)`
  color: ${gray3};
  cursor: pointer;
  transition: 0.3s all ease;
  transform: rotate(0.25turn);
  &:hover {
    color: white
  }

  ${({ active }) => active && `
    color: white;
  `}
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

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
`

export const VolumeButtonDiv = styled.div`
  positon: relative;
`

export const VolumeDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100px;
  height: 26px;
  background: ${gray1};
  transform: rotate(0.75turn) translate(90%, -160%);
  border-radius: 8px;
`

export const VolumeInputRange = styled.input`
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;

  &::focus{
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
  }
`

export const VolumeTrack = styled.div`
  background: linear-gradient(45deg, ${green1}, lightblue);
  width: 86%;
  height: 40%;
  overflow: hidden;
  position: relative;
  border-radius: 4px;
`

export const VolumeAnimateTrack = styled.div`
  background: ${gray3};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  ${({volume}) => volume && `
    transform: translateX(${volume*100}%)
  `}
`
export const InnerButoons = styled.div`
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
