import { useRef, useEffect } from 'react'
import MusicPlayerSmall from '../MusicPlayerSmall'
import MusicPlayerFull from '../MusicPlayerFull'
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../../redux/reducers/songReducer";
import { setSongPlayingInfo, setIsPlaying, setMainGetIn } from "../../redux/reducers/playerControlReducer"

const MusicPlayer = () => {
  const audioRef = useRef(null)
  const dispatch = useDispatch()
  const isPlaying = useSelector((store) => store.playerControl.isPlaying)
  const sound = useSelector((store) => store.playerControl.sound)
  const songPlayingInfo = useSelector((store) => store.playerControl.songPlayingInfo)
  const songs = useSelector((store) => store.song.songs)
  const currentSong = useSelector((store) => store.song.currentSong)
  const mode = useSelector((store) => store.playerControl.mode)
  const loop = useSelector((store) => store.playerControl.loop)
  const mainGetIn = useSelector((store) => store.playerControl.mainGetIn)
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100 )
    dispatch(setSongPlayingInfo({
      ...songPlayingInfo,
      currentTime: current,
      duration,
      animationPercentage,
    }))
  }

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    await dispatch(setCurrentSong(songs[(currentIndex + 1) % songs.length]))
    if (isPlaying) dispatch(setIsPlaying(true))
  }

  useEffect(() => {
    if(mode === 0) dispatch(setIsPlaying(false))
  },[mode])

  useEffect(() => {
    console.log(loop)
  },[loop])

  useEffect(() => {
    if(isPlaying) {
      audioRef.current.play()
    } else if (!isPlaying) {
      audioRef.current.pause()
    }
  }, [isPlaying, currentSong, mode])
  return (
    <>
      {(mode === 1 ) && <MusicPlayerSmall audioRef={audioRef} />}
      {(mode === 2 || mode === 3) && <MusicPlayerFull audioRef={audioRef} />}
      <audio
        volume={sound.volume}
        muted={sound.mute}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
        loop={loop}
      ></audio>
    </>
  )
}

export default MusicPlayer
