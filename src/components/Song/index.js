

const Song = (song ,index) => {
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
}
