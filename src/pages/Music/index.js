import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons'
import { setCurrentSong } from "../../redux/reducers/songReducer";
import { setMode, setIsPlaying } from "../../redux/reducers/playerControlReducer"
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../../utils/firebase'
import "firebase/compat/firestore"
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

import styled from 'styled-components'
const Carousellll = styled(Carousel)`
  width: 100%;
`


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
    console.log(songId)
    if(!user) {
      alert('請先登入會員才能按讚～')
      return
    }
    if(isLiked) {
      firebase.firestore().collection('songs').doc(songId).update({
        likedBy: firebase.firestore.FieldValue.arrayRemove(user.uid)
      })
    } else {
      firebase.firestore().collection('songs').doc(songId).update({
        likedBy: firebase.firestore.FieldValue.arrayUnion(user.uid)
      })
    }
  }
  return (
    <Container >
      <Carousellll>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="https://akstatic.streetvoice.com/features/2021/09/22/63715e5bfb7b4b7389fa753481358595.png?x-oss-process=image/resize,m_fill,h_480,w_1250,limit_0/interlace,1/quality,q_95/sharpen,80/format,jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="https://akstatic.streetvoice.com/features/2021/09/22/2488e888be394ad7b49571a8f2869bc0.png?x-oss-process=image/resize,m_fill,h_480,w_1250,limit_0/interlace,1/quality,q_95/sharpen,80/format,jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="https://akstatic.streetvoice.com/features/2021/09/20/32cf86ea6f5740d0abdfad037bdcc232.png?x-oss-process=image/resize,m_fill,h_480,w_1250,limit_0/interlace,1/quality,q_95/sharpen,80/format,jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousellll>
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
                    <img src={song?.cover}/>
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
