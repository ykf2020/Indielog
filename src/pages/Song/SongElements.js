import { gray1, gray2, gray3, gray4, green1, peach1, MEDIA_QUERY_1400, MEDIA_QUERY_1024, MEDIA_QUERY_978, MEDIA_QUERY_768, MEDIA_QUERY_568 } from '../../constants.js'
import styled from 'styled-components'
export const SongPageConatainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  background: ${gray1};
  position: relative;
`
export const MainInfoBackground = styled.div`
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

export const MainInfoContainer = styled.div`
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

export const BgFilter = styled.div`
  position: abslute;
  z-index: 1;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(30px) brightness(40%);
  -webkit-backdrop-filter: blur(30px) brightness(40%);
`

export const MainImgDiv = styled.div`
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

export const MainInfoDiv = styled.div`
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

export const MainInfoSongName = styled.h1`
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

export const SongInfoCategory = styled.h4`
  font-size: 1.2rem;
  color: ${gray1};

  ${MEDIA_QUERY_568} {
    font-size: 1rem;
  }
`

export const MainInfoSongInfoDiv = styled.div`
  height: 100%;
  width: 100%;
  display:flex;
  align-items: flex-end;
  padding: 0 0 20px 0;
`

export const NumInfo = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${MEDIA_QUERY_978} {
      width: 130px;
  }
`

export const InfoDesc = styled.h4`
  color: ${gray2};

  ${MEDIA_QUERY_568} {
    font-size: 1.1rem;
  }
`

export const InfoDescNum = styled.h3`
  color: ${gray2};

  ${MEDIA_QUERY_568} {
    font-size: 1.1rem;
  }
`

export const BodyContainer = styled.div`
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

export const MainBodyContainer = styled.div`
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

export const FoldSection = styled.section`
  padding-top: 30px;
  width: 100%;
  border-bottom: 1px solid ${gray2};

`

export const FoldInfo = styled.div`
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

export const FoldingCover = styled.div`
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

export const CoverDesc = styled.h4`
  width: 100px;
  font-size: 1rem;
  color: ${gray4};
  cursor: pointer;

`
export const Content = styled.p`
  font-size: 1.1rem;
  color: ${gray4};
`

export const ArtistContainer = styled.div`
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

export const ArtistInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${gray2};
  padding: 20px 10px;
`

export const ArtistInfoLeftDiv = styled.div`
  display:flex;

`

export const ArtistInfoNames =  styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`

export const ArtistName = styled.h4`
  color: ${gray4};
  font-size: 1.1rem;
  margin: 0;

  ${MEDIA_QUERY_978} {
    font-size: 0.8rem;
  }
`

export const AuthorizedDesc = styled.p`
  color: ${gray3};
  font-size:0.8rem;
  margin: 0;
`

export const ArtistImgDiv = styled.div`
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

export const ArtistButton = styled.button`
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

export const SongUpdate = styled.div`
  text-align: center;
  font-size: 1rem;
  color: ${gray3};
  padding: 20px;
  border-bottom: 1px solid ${gray2};
`

export const ButtonsGroup = styled.div`
  width: 140px;
  display:flex;
  justify-content: space-around;
  margin-left: auto;
  margin-right: 10px;

  ${MEDIA_QUERY_568} {
    width: 120px;
  }
`

export const LikedButtonDiv = styled.div`
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
