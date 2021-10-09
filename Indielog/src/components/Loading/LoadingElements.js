import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(33, 33, 33, 0.8);
  z-index: 1200;
`;

export const LoadingDiv = styled.div`
  height: 100px;
  width: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  background: transparent;
  transform: translate(-50%, -50%);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
