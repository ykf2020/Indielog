import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartBorder } from '@fortawesome/free-regular-svg-icons'
import firebase from '../../utils/firebase'
import "firebase/compat/firestore"
import { useSelector } from "react-redux";
import {
  MemberPageContainer,
  TitleButtonsGroup,
  TitleNormalButton,
  TitleActiveButton,
  LinkWithoutDecoration,
  Song,
  SongInfo,
  SongName,
  AuthorName,
  SongButtons,
  NumberDiv,
  Number,
  ImgDiv,
  SongDesc,
} from './CollectionSongsElements.js'

const CollectionSongs = () => {
  const user = useSelector((store) => store.user.currentUser)
  const [likedSongs, setLikedSongs] = useState([])
  useEffect(() => {
    firebase
      .firestore()
      .collection('songs')
      .where('likedBy', 'array-contains', user.uid)
      .get()
      .then((collectionSnapShot) => {
        const data = collectionSnapShot.docs.map((doc) => {
          const id = doc.id
          return {...doc.data(),id}
        })
        setLikedSongs(data)
      })
  },[])
  return (
    <MemberPageContainer>
    <TitleButtonsGroup>
      <TitleActiveButton>說讚的音樂</TitleActiveButton>
      <TitleNormalButton to='/member/collections/posts'>說讚的文章</TitleNormalButton>
    </TitleButtonsGroup>
    {likedSongs.map((song,index) => {
      return (
        <Song>
          <SongInfo to={`/songs/${song.id}`}>
            <NumberDiv>
              <Number>{index + 1}</Number>
            </NumberDiv>
            <ImgDiv>
              <img src={song.cover}/>
            </ImgDiv>
            <SongDesc>
              <SongName>{song?.name}</SongName>
              <AuthorName>{song?.artist}</AuthorName>
            </SongDesc>
          </SongInfo>
        </Song>
      )
    })}
    </MemberPageContainer>
  )
}

export default CollectionSongs
