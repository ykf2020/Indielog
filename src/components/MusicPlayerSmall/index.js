import { useState } from 'react'
import {
  Container,
  ImgDiv,
  InfoContainer,
  SongName,
  AuthorName,
  IconContainer,
  FontAwesome,
  Track,
  AnimateTrack,
  InputRange
 } from './MusicPlayerSmallElements.js'
import {
  faSlidersH,
  faPlay
} from '@fortawesome/free-solid-svg-icons'

const MusicPlayerSmall = () => {
  const [animationPercentage, setAnimationPercentage] = useState(50)
  return (
    <>
      <Container>
        <Track>
          <InputRange min={0} type="range"/>
          <AnimateTrack animationPercentage={animationPercentage}/>
        </Track>
        <ImgDiv>
          <img src={'https://i.imgur.com/Ti5yQhBh.jpg'}/>
        </ImgDiv>
        <InfoContainer>
          <SongName>甘蔗</SongName>
          <AuthorName>夜貓組</AuthorName>
        </InfoContainer>
        <IconContainer>
          <FontAwesome size="1x" icon={faPlay}/>
          <FontAwesome size="1x" icon={faSlidersH}/>
        </IconContainer>
      </Container>
    </>
  )
}

export default MusicPlayerSmall
