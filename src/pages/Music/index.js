import styled from 'styled-components'
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle, faHeart as faHeartBorder } from '@fortawesome/free-regular-svg-icons'
import { setCurrentSong } from "../../redux/reducers/songReducer";
import { setMode, setIsPlaying } from "../../redux/reducers/playerControlReducer"
import { gray1, gray2, gray3, gray4, black1, MEDIA_QUERY_1024, MEDIA_QUERY_768, MEDIA_QUERY_568 } from '../../constants.js'
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const Carousellll = styled(Carousel)`
  width: 100%;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  width:100%;
  padding-top: 80px;
  positon: relative;
  z-index:1;
  background: ${gray1};
  /* border: 1px solid blue; */
`
const SongsList = styled.section`
  /* border: 1px solid pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  padding: 0 30px;

  ${MEDIA_QUERY_1024} {
    width: 90%;
  }

  ${MEDIA_QUERY_768} {
    width: 100%;
  }
`
const Title = styled.h2`
  width:100%;
  border-bottom: 4px solid ${gray2};
  border-radius: 2px;
  padding: 30px 10px;
  margin: 20px 0 0 0;
`
const Song = styled.div`
  /* border: 1px solid yellow; */
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  border-bottom: 1px solid ${gray2};
  padding: 0 20px;

  &:hover {
    background: white;
  }

  ${MEDIA_QUERY_568} {
    padding: 0 0;
  }
`
const SongInfo = styled(Link)`
  text-decoration: none;
  color: none;
  width: 86%;
  height: 100%;
  /* border: 1px solid orange; */
  display: flex;
  align-items: center;
`
const SongName = styled.h3`
  color: ${black1};
  font-size: 1.2rem;
  font-weight: bold;

  ${MEDIA_QUERY_768} {
    font-size: 1rem;
  }

  ${MEDIA_QUERY_568} {
    font-size: 0.8rem;
  }
`
const AuthorName = styled.p`
  color: ${gray4};
  font-size: 0.8rem;
  color: ${gray3}

  ${MEDIA_QUERY_768} {
    font-size: 0.6rem;
  }

  ${MEDIA_QUERY_568} {
    font-size: 0.5rem;
  }
`
const SongButtons = styled.div`
  width: 14%;
  height: 100%;
  /* border: 1px solid orange; */
  display: flex;
  justify-content: end;
  align-items: center;
`

const NumberDiv = styled.div`
  width: 36px;
  /* border: 1px solid blue; */
`

const Number = styled.h4`
  font-size:1rem;
  color: ${black1};
`

const ImgDiv = styled.div`
  height: 80px;
  width: 80px;
  /* border: 1px solid black; */
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  cursor:pointer;
  z-index:1;

  ${MEDIA_QUERY_568} {
    height: 50px;
    width: 50px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 2;
  }
`


const SongDesc = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 40px;
  padding-top: 10px;

  ${MEDIA_QUERY_768} {
    margin-left: 16px;
  }

  ${MEDIA_QUERY_568} {
    margin-left: 10px;
  }
`

const Music = () => {
  const dispatch = useDispatch()
  const songs = useSelector((store) => store.song.songs)
  const playSong = async (e, song) => {
    e.preventDefault();
    await dispatch(setIsPlaying(true))
    await dispatch(setCurrentSong(song))
    await dispatch(setMode(2))
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
          return (
            <Song>
              <SongInfo to={`/songs/${song.id}`}>
                <NumberDiv>
                  <Number>{index + 1}</Number>
                </NumberDiv>
                <ImgDiv onClick={(e) => playSong(e, song)}>
                  <img src={song.cover}/>
                </ImgDiv>
                <SongDesc>
                  <SongName>{song?.name}</SongName>
                  <AuthorName>{song?.artist}</AuthorName>
                </SongDesc>
              </SongInfo>
              <SongButtons>
                <FontAwesomeIcon size='1x' icon={faHeartBorder}/>
              </SongButtons>
            </Song>
          )
        })}
      </SongsList>
    </Container>
  )
}

export default Music
