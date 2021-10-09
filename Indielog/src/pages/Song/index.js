import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongOnSnapShot, toggleSongLiked } from "../../utils/firebase";
import CommentArea from "../../components/CommentArea";
import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setCurrentSong } from "../../redux/reducers/songReducer";
import {
  setMode,
  setIsPlaying,
} from "../../redux/reducers/playerControlReducer";
import { setCurrentTitle } from "../../redux/reducers/pageTitleReducer";
import {
  SongPageConatainer,
  SongInfoCategory,
  MainInfoBackground,
  MainInfoContainer,
  MainImgDiv,
  MainInfoDiv,
  MainInfoSongName,
  MainInfoSongInfoDiv,
  NumInfo,
  InfoDesc,
  InfoDescNum,
  BodyContainer,
  MainBodyContainer,
  FoldSection,
  FoldInfo,
  FoldingCover,
  CoverDesc,
  Content,
  ArtistContainer,
  ArtistInfo,
  ArtistInfoLeftDiv,
  ArtistInfoNames,
  ArtistName,
  AuthorizedDesc,
  ArtistImgDiv,
  ArtistButton,
  SongUpdate,
  ButtonsGroup,
  LikedButtonDiv,
} from "./SongElements.js";

const Song = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const [foldSection1, setFoldSection1] = useState(false);
  const [foldSection2, setFoldSection2] = useState(false);
  const [pageData, setPageData] = useState({});
  const user = useSelector((store) => store.user.currentUser);
  const isLiked = pageData.likedBy?.includes(user?.uid);

  async function playSong(song) {
    await dispatch(setIsPlaying(true));
    await dispatch(setCurrentSong(song));
    await dispatch(setMode(2));
  }

  function toggleLiked() {
    if (!user) {
      alert("請先登入會員才能按讚～");
      return;
    }
    toggleSongLiked(isLiked, songId, user.uid);
  }

  useEffect(() => {
    getSongOnSnapShot(songId, setPageData);
  }, [songId]);

  useEffect(() => {
    if (!pageData) return;
    dispatch(setCurrentTitle(pageData.name));
    return () => {
      dispatch(setCurrentTitle("Indielog"));
    };
  }, [pageData]);

  return (
    <SongPageConatainer>
      <MainInfoBackground bgImg={pageData.cover}>
        <MainInfoContainer>
          <MainImgDiv>
            <img alt="" src={pageData.cover} />
          </MainImgDiv>
          <MainInfoDiv>
            <MainInfoSongName>{pageData.name}</MainInfoSongName>
            <SongInfoCategory>Experimental</SongInfoCategory>
            <MainInfoSongInfoDiv>
              <NumInfo>
                <InfoDesc>播放次數</InfoDesc>
                <InfoDescNum>10,000</InfoDescNum>
              </NumInfo>
              <NumInfo>
                <InfoDesc>喜歡</InfoDesc>
                <InfoDescNum>{pageData.likedBy?.length}</InfoDescNum>
              </NumInfo>
              <ButtonsGroup>
                <LikedButtonDiv onClick={() => playSong(pageData)}>
                  <FontAwesomeIcon icon={faPlay} />
                </LikedButtonDiv>
                <LikedButtonDiv isLiked={isLiked} onClick={toggleLiked}>
                  <FontAwesomeIcon icon={faHeart} />
                </LikedButtonDiv>
              </ButtonsGroup>
            </MainInfoSongInfoDiv>
          </MainInfoDiv>
        </MainInfoContainer>
      </MainInfoBackground>
      <BodyContainer>
        <ArtistContainer>
          <ArtistInfo>
            <ArtistInfoLeftDiv>
              <ArtistImgDiv>
                <img alt="" src={pageData.cover} />
              </ArtistImgDiv>
              <ArtistInfoNames>
                <ArtistName>{pageData.artist}</ArtistName>
                <AuthorizedDesc>認證創作者</AuthorizedDesc>
              </ArtistInfoNames>
            </ArtistInfoLeftDiv>
            <ArtistButton>＋追蹤</ArtistButton>
          </ArtistInfo>
          <SongUpdate>發佈時間 2021-09-15</SongUpdate>
        </ArtistContainer>
        <MainBodyContainer>
          <FoldSection>
            <FoldInfo isFold={foldSection1}>
              <h3>介紹</h3>
              <Content
                dangerouslySetInnerHTML={{ __html: pageData.introduction }}
              />
            </FoldInfo>
            <FoldingCover isFold={foldSection1}>
              <CoverDesc onClick={() => setFoldSection1(!foldSection1)}>
                {foldSection1 ? "收合" : "...查看更多"}
              </CoverDesc>
            </FoldingCover>
          </FoldSection>
          <FoldSection>
            <FoldInfo isFold={foldSection2}>
              <h3>歌詞</h3>
              <Content dangerouslySetInnerHTML={{ __html: pageData.lyrics }} />
            </FoldInfo>
            <FoldingCover isFold={foldSection2}>
              <CoverDesc onClick={() => setFoldSection2(!foldSection2)}>
                {foldSection2 ? "收合" : "...查看更多"}
              </CoverDesc>
            </FoldingCover>
          </FoldSection>
          <CommentArea area={"songs"} id={songId} />
        </MainBodyContainer>
      </BodyContainer>
    </SongPageConatainer>
  );
};

export default Song;
