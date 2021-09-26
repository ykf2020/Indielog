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
  faPlay,
  faPause
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { setSongPlayingInfo, setIsPlaying, setMode } from "../../redux/reducers/playerControlReducer"

const MusicPlayerSmall = ({ audioRef }) => {
  const dispatch = useDispatch()
  const isPlaying = useSelector((store) => store.playerControl.isPlaying)
  const currentSong = useSelector((store) => store.song.currentSong)
  const songPlayingInfo = useSelector((store) => store.playerControl.songPlayingInfo)
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    dispatch(setSongPlayingInfo({...songPlayingInfo, currentTime: e.target.value}))
  }
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause()
      dispatch(setIsPlaying(!isPlaying))
    } else {
      audioRef.current.play()
      dispatch(setIsPlaying(!isPlaying))
    }
  }

  return (
    <>
      <Container>
        <Track>
          <InputRange
            min={0}
            max={songPlayingInfo.duration}
            value={songPlayingInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <AnimateTrack animationPercentage={songPlayingInfo.animationPercentage}/>
        </Track>
        <ImgDiv>
          <img src={currentSong.cover}/>
        </ImgDiv>
        <InfoContainer>
          <SongName>{currentSong.name}</SongName>
          <AuthorName>{currentSong.artist}</AuthorName>
        </InfoContainer>
        <IconContainer>
          <FontAwesome onClick={playSongHandler} size="1x" icon={isPlaying ? faPause : faPlay}/>
          <FontAwesome onClick={() => dispatch(setMode(2))} size="1x" icon={faSlidersH}/>
        </IconContainer>
      </Container>
    </>
  )
}

export default MusicPlayerSmall
