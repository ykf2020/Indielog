import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import data from '../../data.js'
import { gray1, gray2, gray3, gray4 , black1, green1, peach1, MEDIA_QUERY_1400, MEDIA_QUERY_1024, MEDIA_QUERY_978, MEDIA_QUERY_768, MEDIA_QUERY_568 } from '../../constants.js'
import CommentArea from '../../components/CommentArea'
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SongPageConatainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  background: ${gray1};
  position: relative;
`
const MainInfoBackground = styled.div`
  width: 100%;
  height: 500px;
  background-size: 180%;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 80px;

  ${({bgImg}) => bgImg && `
    background-image: url('${bgImg}');
  `}

  &:after {
    content: '';
    position: abslute;
    z-index: 1;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(30px) brightness(40%);
    -webkit-backdrop-filter: blur(30px) brightness(40%);
  }

  ${MEDIA_QUERY_768} {
    height: 900px;
  }

  ${MEDIA_QUERY_568} {
    height: 660px;
  }
`

const MainInfoContainer = styled.div`
  position: absolute;
  width:80%;
  height:100%;
  z-index:5;
  display: flex;
  justify-content: center;
  ${MEDIA_QUERY_1400} {
    width:88%
  }

  ${MEDIA_QUERY_1024} {
    width:96%
  }

  ${MEDIA_QUERY_768} {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  ${MEDIA_QUERY_568} {
    height: 580px;
  }
`

const BgFilter = styled.div`
  position: abslute;
  z-index: 1;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(30px) brightness(40%);
  -webkit-backdrop-filter: blur(30px) brightness(40%);
`

const MainImgDiv = styled.div`
  margin-top: 100px;
  position: relative;
  z-index: 10;
  width: 400px;
  height: 400px;
  border: 10px solid white;
  border-radius: 10px;
  box-shadow: 1px 1px 8px rgba(33, 33, 33, 0.5);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${MEDIA_QUERY_978} {
    margin-top: 40px;
    width: 300px;
    height: 300px;
    border: 8px solid white;
  }

  ${MEDIA_QUERY_768} {
    margin-top: 10px;
    width: 460px;
    height: 460px;
  }

  ${MEDIA_QUERY_568} {
    width: 280px;
    height: 280px;
  }
`

const MainInfoDiv = styled.div`
  position: relative;
  z-index: 10;
  margin-top: 100px;
  width: calc(100% - 400px);
  height: calc(100% - 180px);
  display: flex;
  flex-direction:column;
  padding: 20px 0px 20px 40px;
  ${MEDIA_QUERY_978} {
    width: calc(100% - 300px);
    margin-top: 40px;
    padding: 20px 0px 20px 20px;
  }

  ${MEDIA_QUERY_768} {
    width: 460px;
    margin-top: 20px;
    padding: 10px 0px 10px 10px;
    height: 310px;
  }

  ${MEDIA_QUERY_568} {
    width: 100%;
    height: 100%;

  }
`

const MainInfoSongName = styled.h1`
  font-size: 2.5rem;
  width:100%;
  color: white;

  ${MEDIA_QUERY_978} {
    font-size: 1.8rem;
  }

  ${MEDIA_QUERY_568} {
    font-size: 1.3rem;
  }
`

const SongInfoCategory = styled.h4`
  font-size: 1.2rem;
  color: ${gray1};

  ${MEDIA_QUERY_568} {
    font-size: 1rem;
  }
`

const MainInfoSongInfoDiv = styled.div`
  height: 100%;
  width: 100%;
  display:flex;
  align-items: flex-end;
  padding: 0 0 20px 0;
`

const NumInfo = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${MEDIA_QUERY_978} {
      width: 130px;
  }
`

const InfoDesc = styled.h4`
  color: ${gray2};

  ${MEDIA_QUERY_568} {
    font-size: 1.1rem;
  }
`

const InfoDescNum = styled.h3`
  color: ${gray2};

  ${MEDIA_QUERY_568} {
    font-size: 1.1rem;
  }
`

const BodyContainer = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  margin-top: 120px;
  justify-content: center;

  ${MEDIA_QUERY_1400} {
    width: 90%;
  }

  ${MEDIA_QUERY_768} {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 0px;
  }
`

const MainBodyContainer = styled.div`
  width: 70%;
  padding: 0 80px 0 80px;
  margin-top: -100px;

  ${MEDIA_QUERY_1400} {
    width: 60%;
  }

  ${MEDIA_QUERY_978} {
    padding: 0 20px 0 20px;
  }

  ${MEDIA_QUERY_768} {
    margin-top: 0px;
    width: 100%;
    padding: 0 30px 0 30px;
  }
`

const FoldSection = styled.section`
  padding-top: 30px;
  width: 100%;
  border-bottom: 1px solid ${gray2};

`

const FoldInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-height: auto;
  height: 100%;
  overflow:hidden;
  transition: all 0.3s ease;

  ${({isFold}) => !isFold && `
    height: 230px;
  `}
`

const FoldingCover = styled.div`
  height: 30px;
  background: ${gray1};
  display: flex;
  align-items: center;
  box-shadow: 0px -8px 8px rgba(250, 250, 250, 0.9);
  position: relative;
  z-index: 3;
  transition: all 0.3s ease;
  transform: translateY(-40%);

  ${({isFold}) => isFold && `
    transform: translateY(0%);
  `}
`

const CoverDesc = styled.h4`
  width: 100px;
  font-size: 1rem;
  color: ${gray4};
  cursor: pointer;

`
const Content = styled.p`
  font-size: 1.1rem;
  color: ${gray4};
`

const ArtistContainer = styled.div`
  position: relative;
  width: 30%;
  z-index: 100;

  ${MEDIA_QUERY_1400} {
    width: 40%;
  }

  ${MEDIA_QUERY_978} {
    margin-top: -100px;
  }

  ${MEDIA_QUERY_768} {
    margin-top: 0px;
    width: 100%;
    padding: 0 80px 0 80px;
  }

  ${MEDIA_QUERY_568} {
    width: 100%;
    padding: 0 10px 0 10px;
  }
`

const ArtistInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${gray2};
  padding: 20px 10px;
`

const ArtistInfoLeftDiv = styled.div`
  display:flex;

`

const ArtistInfoNames =  styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`

const ArtistName = styled.h4`
  color: ${gray4};
  font-size: 1.1rem;
  margin: 0;

  ${MEDIA_QUERY_978} {
    font-size: 0.8rem;
  }
`

const AuthorizedDesc = styled.p`
  color: ${gray3};
  font-size:0.8rem;
  margin: 0;
`

const ArtistImgDiv = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow:hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${MEDIA_QUERY_978} {
    width: 50px;
    height: 50px;
  }
`

const ArtistButton = styled.button`
  height: 30px;
  width:60px;
  font-size:0.7rem;
  border-radius: 15px;
  border: none;
  background: ${green1};
  transition: all 0.3s ease;

  ${MEDIA_QUERY_978} {
    width: 54px;
    font-size:0.5rem;
  }
`

const SongUpdate = styled.div`
  text-align: center;
  font-size: 1rem;
  color: ${gray3};
  padding: 20px;
  border-bottom: 1px solid ${gray2};
`

const ButtonsGroup = styled.div`
  width: 140px;
  display:flex;
  justify-content: space-around;
  margin-left: auto;
  margin-right: 10px;

  ${MEDIA_QUERY_568} {
    width: 120px;
  }
`

const LikedButtonDiv = styled.div`
  color: ${gray2};
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid ${gray2};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${MEDIA_QUERY_568} {
    height: 40px;
    width: 40px;
    transform: translateY(-10px);
  }

  ${({isLiked}) => isLiked && `
    background: ${peach1};
    color: white;
  `}
`



const Song = () => {
  const { songId } = useParams()
  const [foldSection1, setFoldSection1] = useState(false)
  const [foldSection2, setFoldSection2] = useState(false)
  const [pageData, setPageData] = useState({})
  useEffect(() => {
    setPageData(data.find(d => d.id === songId))
  },[data, songId])
  return (
    <SongPageConatainer>
      <MainInfoBackground bgImg={pageData.cover}>
        <MainInfoContainer>
          <MainImgDiv><img src={pageData.cover}/></MainImgDiv>
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
              <InfoDescNum>10,000</InfoDescNum>
            </NumInfo>
            <ButtonsGroup>
              <LikedButtonDiv>
                <FontAwesomeIcon icon={faPlay} />
              </LikedButtonDiv>
              <LikedButtonDiv>
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
            <ArtistImgDiv><img src='https://p3.pstatp.com/origin/pgc-image/04e1adade5804e39a3d2ca067c00550f.jpeg'/></ArtistImgDiv>
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
                <Content>
                  我們靜靜地看著彼此，不發一語<br/>
                  因為你知道，一部分的我將永遠留在那裡<br/>
                  <br/>
                  作曲 Composer：楊詠淳 Vitz Yang｜梁丹郡 Mandark Liang<br/>
                  作詞 Lyrics：楊詠淳 Vitz Yang｜曾國洵 Kuohsun Tseng<br/>
                  編曲 Arranger：I Mean Us<br/>
                  演奏 Performer：I Mean Us<br/>
                  <br/>
                  主唱 Vocal：梁丹郡 Mandark Liang｜章羣 Chun Zhang<br/>
                  吉他 Guitar：楊詠淳 Vitz Yang｜章羣 Chun Zhang<br/>
                  合成器 Synthesizer：楊詠淳 Vitz Yang<br/>
                  鼓 Drums：呂佩蓬 PP L<br/>
                  貝斯 Bass：陳思翰 Hank Chen<br/>
                  合聲 Chorus：梁丹郡 Mandark Liang｜章羣 Chun Zhang｜楊詠淳 Vitz Yang<br/>
                  合聲編寫 Chorus Arranger：梁丹郡 Mandark Liang ｜楊詠淳 Vitz Yang<br/>
                  <br/>
                  製作人 Producer：韓立康 LUB<br/>
                  鼓組錄音師 Drums Recording Engineer：錢煒安 Zen Chien<br/>
                  鼓組錄音室 Drums Recording Studio：112F Recording Studio<br/>
                  人聲錄音師 Vocals Recording Engineer：蔡周翰(@Lights Up Studio)<br/>
                  人聲錄音室 Vocals Recording Studio：BB Road Studio<br/>
                  其他樂器錄音師 Other Instruments Recording Engineer：韓立康 LUB｜沈冠霖 SHENB<br/>
                  其他樂器錄音室 Other Instruments Recording Studio：阿康工作室｜BB Road Studio<br/>
                  <br/>
                  混音師 Mixing Engineer：黃文萱 Ziya Huang<br/>
                  混音錄音室 Mixing Studio：Purring Sound Studio<br/>
                  母帶後期處理工程師 Mastering Engineer：Greg Calbi｜Steve Fallone<br/>
                  母帶後期錄音室 Mastering Studio：Sterling Sound<br/>
                  <br/>
                  製作助理 Producing Assistant：趙宇晨<br/>
                  鼓錄音助理 Drums Recording Assistant：陳祺龍 Chris Chen<br/>
                  <br/>
                  藝術指導 Art Director：盧翊軒<br/>
                  電腦圖形設計 CG Artist：張以得<br/>
                </Content>
            </FoldInfo>
            <FoldingCover isFold={foldSection1}>
              <CoverDesc onClick={() => setFoldSection1(!foldSection1)}>{foldSection1 ? '收合' : '...查看更多'}</CoverDesc>
            </FoldingCover>
          </FoldSection>
          <FoldSection >
            <FoldInfo isFold={foldSection2}>
              <h3>歌詞</h3>
                <Content>
                  "There’s a frozen lake never taken<br/>
                  You and me were standing in the center<br/>
                  Without words<br/>
                  We’re just staring at each other<br/>
                  We were there<br/>
                  Like a secret<br/>
                  <br/>
                  There's a hallway runs through the border<br/>
                  You and me were sticking around in a moment<br/>
                  Without words<br/>
                  We’re just staring at each other<br/>
                  We were there<br/>
                  Like a secret<br/>
                  <br/>
                  All the things become clear now<br/>
                  Then I don’t know how to fix it<br/>
                  Hidden place round the corner<br/>
                  How to scream underwater<br/>
                  <br/>
                  Suddenly awake from the end of the dreams<br/>
                  Floating above<br/>
                  Fall to the ground<br/>
                  Against the wall<br/>
                  Turn on the light<br/>
                  Suddenly awake from the end of the dreams<br/>
                  <br/>
                  What if I told you I<br/>
                  still feel haunted all the time<br/>
                  What if we turned around<br/>
                  There’s nothing there?<br/>
                  <br/>
                  Save me a ticket to our kingdom<br/>
                  I’ll share those things that we might remember<br/>
                  Cause you know<br/>
                  Part of me was left there forever<br/>
                  Young and fresh<br/>
                  As if we could"<br/>
                </Content>
            </FoldInfo>
            <FoldingCover isFold={foldSection2}>
              <CoverDesc onClick={() => setFoldSection2(!foldSection2)}>{foldSection2 ? '收合' : '...查看更多'}</CoverDesc>
            </FoldingCover>
          </FoldSection>
          <CommentArea/>
        </MainBodyContainer>
      </BodyContainer>
    </SongPageConatainer>
  )
}

export default Song
