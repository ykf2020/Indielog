import styled from "styled-components";
export const PageContainer = styled.div`
  width: 100%;
  margin: 0 auto 20px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;
export const ImgDiv = styled.div`
  width: 400px;
  height: 400px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Announcement = styled.h3`
  margin-top: 20px;
  font-size: 1rem;
`;
