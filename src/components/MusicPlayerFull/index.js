import { useState } from 'react'
import {
  Container,
  Nav,
  NavLogo,
  BodyContainer,
  Library,
  Song,
  SongInfo,
  ControlPanel,
  FontAwesome,
  SongName,
  AuthorName,
  ImgDiv,
  Slider,
  Buttons,
  Track,
  AnimateTrack,
  InputRange,
  SongCurrentTime,
  SongFullTime,
  FontAwesomeControl,
  ToggleButton,
  BgFilter,
} from './MusicPlayerFullElements.js'
import {
  faPause,
  faPlay,
  faTimes,
  faVolumeUp,
  faChevronRight,
  faChevronLeft,
  faUndo,
  faToggleOff,
  faToggleOn
} from '@fortawesome/free-solid-svg-icons'

const MusicPlayerFull = () => {
  const [libraryStatus, setLibraryStatus] = useState(true)
  const [animationPercentage, setAnimationPercentage] = useState(50)
  return (
    <>
      <Container>
        <Nav>
          <NavLogo to='/'>Indielog</NavLogo>
          <FontAwesome size='2x' icon={faTimes}/>
          <ToggleButton size='2x' icon={libraryStatus ? faToggleOn : faToggleOff } onClick={() => setLibraryStatus(!libraryStatus)}/>
        </Nav>
        <BodyContainer>
          <Library libraryStatus={libraryStatus}>
          </Library>
          <Song libraryStatus={libraryStatus}>
            <SongInfo>
              <ImgDiv><img src={'https://i.imgur.com/Ti5yQhBh.jpg'}/></ImgDiv>
              <SongName>SuckDIDI</SongName>
              <AuthorName>SUCKDIDILONG</AuthorName>
            </SongInfo>
            <ControlPanel>
              <Slider>
                <SongCurrentTime>0:00</SongCurrentTime>
                <Track>
                  <InputRange min={0} type="range" />
                  <AnimateTrack animationPercentage={animationPercentage} />
                </Track>
                <SongFullTime>3:00</SongFullTime>
              </Slider>
              <Buttons>
                <FontAwesomeControl size='1x' icon={faUndo} />
                <FontAwesomeControl size='1x' icon={faChevronLeft} />
                <FontAwesomeControl size='2x' icon={faPlay} />
                <FontAwesomeControl size='1x' icon={faChevronRight} />
                <FontAwesomeControl size='1x' icon={faVolumeUp} />
              </Buttons>
            </ControlPanel>
          </Song>
        </BodyContainer>
      </Container>
    </>
  )
}

export default MusicPlayerFull
