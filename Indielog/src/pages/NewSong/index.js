import { PageContainer, ImgDiv, Announcement } from "./NewSongElements.js";

const NewSong = () => {
  return (
    <PageContainer>
      <ImgDiv>
        <img alt="" src="/maintenance.svg" />
      </ImgDiv>
      <Announcement>認證創作者審核機制設計中，暫不開放上傳音樂</Announcement>
    </PageContainer>
  );
};

export default NewSong;
