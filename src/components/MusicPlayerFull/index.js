import { useState, useMemo, useRef, useEffect } from 'react'
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
  ButtonGroup,
  LibrarySongDiv,
  LibrarySongDesc,
  LibrarySongName,
  LibrarySongAuthorName,
  LibraryImgDiv,
  LoopButton,
  VolumeDiv,
  VolumeButtonDiv,
  VolumeInputRange,
  VolumeTrack,
  VolumeAnimateTrack
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
  faToggleOn,
  faCompressAlt,
  faVolumeMute
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../../redux/reducers/songReducer";
import { setSound, setIsPlaying, setMode, setSongPlayingInfo, setLoop } from "../../redux/reducers/playerControlReducer"


const MusicPlayerFull = ({ audioRef }) => {
  const dispatch = useDispatch()
  const volumeBarRef = useRef(null)
  const [volumeBarIsShown, setVolumeBarIsShown] = useState(false)
  const mode = useSelector((store) => store.playerControl.mode)
  const isPlaying = useSelector((store) => store.playerControl.isPlaying)
  const songs = useSelector((store) => store.song.songs)
  const currentSong = useSelector((store) => store.song.currentSong)
  const songPlayingInfo = useSelector((store) => store.playerControl.songPlayingInfo)
  const sound = useSelector((store) => store.playerControl.sound)
  const loop = useSelector((store) => store.playerControl.loop)

  const bgImg = useMemo(() => {
    return currentSong.cover
  },[currentSong])

  const getTime = (time) => {
    return(
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }

  const playSongHandler = () => {
    dispatch(setIsPlaying(!isPlaying))
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    dispatch(setSongPlayingInfo({...songPlayingInfo, currentTime: e.target.value}))
  }

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    if(direction === 'skip-forward'){
      await dispatch(setCurrentSong(songs[(currentIndex + 1) % songs.length]))
    }
    if(direction === 'skip-back'){
      if((currentIndex - 1) % songs.length === -1){
        dispatch(setCurrentSong(songs[songs.length-1]))
        return
      }
        dispatch(setCurrentSong(songs[(currentIndex - 1) % songs.length]))
    }
  }

  const volumeHandler = (e) => {
    if(e.target.value == 0) {
      dispatch(setSound({ ...sound, mute:true, volume: e.target.value}))
    } else {
      dispatch(setSound({ ...sound, mute:false, volume: e.target.value, prevVolume: e.target.value}))
    }
    audioRef.current.volume = e.target.value
  }

  const songSelectHandler = async (song) => {
      dispatch(setCurrentSong(song))
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (volumeBarRef.current && !volumeBarRef.current.contains(event.target)) {
        setVolumeBarIsShown(false);
      }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [volumeBarRef]);

  return (
    <>
      <Container bgImg={bgImg}>
        <Nav>
          <NavLogo to='/'>Indielog</NavLogo>
          <ButtonGroup>
            <FontAwesome onClick={() => dispatch(setMode(1))} size='2x' icon={faCompressAlt}/>
            <FontAwesome onClick={() => dispatch(setMode(0))} size='2x' icon={faTimes} />
          </ButtonGroup>
          <ToggleButton size='2x' icon={(mode===3) ? faToggleOn : faToggleOff } onClick={() => dispatch(setMode((mode === 3) ? 2 : 3))}/>
        </Nav>
        <BodyContainer>
          <Library mode={mode}>
            {songs.map(song => {
              return (
                <LibrarySongDiv onClick={() => songSelectHandler(song)} active={song.id === currentSong.id}>
                  <LibraryImgDiv>
                    <img src={song.cover}/>
                  </LibraryImgDiv>
                  <LibrarySongDesc>
                    <LibrarySongName>{song.name}</LibrarySongName>
                    <LibrarySongAuthorName>{song.artist}</LibrarySongAuthorName>
                  </LibrarySongDesc>
                </LibrarySongDiv>
              )
            })}
          </Library>
          <Song mode={mode}>
            <SongInfo>
              <ImgDiv mode={mode}><img src={currentSong.cover}/></ImgDiv>
              <SongName>{currentSong.name}</SongName>
              <AuthorName>{currentSong.artist}</AuthorName>
            </SongInfo>
            <ControlPanel>
              <Slider>
                <SongCurrentTime>{getTime(songPlayingInfo.currentTime)}</SongCurrentTime>
                <Track>
                  <InputRange min={0}
                    min={0}
                    max={songPlayingInfo.duration}
                    value={songPlayingInfo.currentTime}
                    onChange={dragHandler}
                    type="range"
                  />
                  <AnimateTrack animationPercentage={songPlayingInfo.animationPercentage} />
                </Track>
                <SongFullTime>{getTime(songPlayingInfo.duration || 0)}</SongFullTime>
              </Slider>
              <Buttons>
                <LoopButton onClick={() => dispatch(setLoop(!loop)) } active={loop} size='1x' icon={faUndo} />
                <FontAwesomeControl onClick={() => {skipTrackHandler('skip-back')}} size='1x' icon={faChevronLeft} />
                <FontAwesomeControl onClick={playSongHandler} size='2x' icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeControl onClick={() => {skipTrackHandler('skip-forward')}} size='1x' icon={faChevronRight} />
                <VolumeButtonDiv>
                  <FontAwesomeControl size='1x' icon={sound.mute ? faVolumeMute : faVolumeUp} onClick={() => setVolumeBarIsShown(!volumeBarIsShown)}/>
                  {volumeBarIsShown && (
                    <VolumeDiv ref={volumeBarRef}>
                      <VolumeTrack>
                        <VolumeInputRange
                          min={0}
                          step={0.01}
                          max={1}
                          value={sound.volume}
                          onChange={volumeHandler}
                          type="range"
                        />
                        <VolumeAnimateTrack volume={sound.volume} />
                      </VolumeTrack>
                    </VolumeDiv>
                  )}
                </VolumeButtonDiv>
              </Buttons>
            </ControlPanel>
          </Song>
        </BodyContainer>
      </Container>
    </>
  )
}

export default MusicPlayerFull
