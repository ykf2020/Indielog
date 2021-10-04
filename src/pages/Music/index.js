import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons'
import { setCurrentSong } from "../../redux/reducers/songReducer";
import { setMode, setIsPlaying } from "../../redux/reducers/playerControlReducer"
import Carou from '../../components/Carousel/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toggleSongLiked } from '../../utils/firebase'
import {
  Container,
  SongsList,
  Title,
  Song,
  SongInfo,
  SongName,
  AuthorName,
  SongButtons,
  NumberDiv,
  Number,
  ImgDiv,
  SongDesc,
  LikeButtonDiv,
  ImgContainer,
  LikeNumber,
  HoverPlayButton,
} from './MusicElements.js'


const Music = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user.currentUser)
  const songs = useSelector((store) => store.song.songs)
  async function playSong(song){
    await dispatch(setIsPlaying(true))
    await dispatch(setCurrentSong(song))
    await dispatch(setMode(2))
  }

  function toggleLiked(isLiked, songId) {
    if(!user) {
      alert('請先登入會員才能按讚～')
      return
    }
    toggleSongLiked(isLiked, songId, user.uid)
  }
  return (
    <Container >
      <Carou />
      <SongsList>
        <Title>熱門排行</Title>
        {songs.map((song,index) => {
          const isLiked = song?.likedBy.includes(user?.uid)
          return (
            <Song>
              <SongInfo>
                <NumberDiv>
                  <Number>{index + 1}</Number>
                </NumberDiv>
                <ImgContainer>
                  <ImgDiv>
                    <img alt='' src={song?.cover}/>
                  </ImgDiv>
                  <HoverPlayButton onClick={() => playSong(song)}>
                    <FontAwesomeIcon size="2x" icon={faPlay} />
                  </HoverPlayButton>
                </ImgContainer>
                <SongDesc to={`/songs/${song?.id}`}>
                  <SongName>{song?.name}</SongName>
                  <AuthorName>{song?.artist}</AuthorName>
                </SongDesc>
              </SongInfo>
              <SongButtons>
                <LikeButtonDiv isLiked={isLiked} onClick={() => toggleLiked(isLiked, song.id)}>
                  <FontAwesomeIcon size='1x' icon={faHeart}/>
                  <LikeNumber>{song?.likedBy.length}</LikeNumber>
                </LikeButtonDiv>
              </SongButtons>
            </Song>
          )
        })}
      </SongsList>
    </Container>
  )
}

export default Music
