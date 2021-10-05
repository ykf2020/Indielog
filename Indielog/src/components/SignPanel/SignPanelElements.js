import styled from 'styled-components'
import { green1, black1, warning } from '../../utils/constants.js'
export const SignPanelContainer = styled.div`
  background: ${green1};
  height: 100vh;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:1005;

`

export const SignPanelLogo = styled.h1`
  font-weight: bold;
  color: white;
  font-size: 2.5rem;
  position: absolute;
  top: -80px;
  font-family: 'Dancing Script', cursive;
  margin: 0 auto;
`

export const Panel = styled.div`
  background: ${black1};
  border-radius: 20px;
  margin: 0 auto;
  width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CancelButton = styled.button`
  border: none;
  border-radius: 50%;
  background: #fff;
  width: 20px;
  height: 20px;
  font-weight: bold;
  position: absolute;
  color: ${black1};
  right: 14px;
  top: 12px;

  &:before {
    position: absolute;
    content: "x";
    top: 50%;
    left: 50%;
    transform: translate(-42%, -58%)
  }

  &:hover {
    color: #fff;
    background: ${green1};
    cursor: pointer;
  }

`

export const PanelInnerWrap = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SignPanelTitle = styled.h2`
  margin-top: 20px;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0;
`

export const SignPanelTitleDesc = styled.p`
  margin-top: 20px;
  margin-bottom: 0;
  align-self: flex-start;
  color: white;
  font-size: 1rem;
`

export const SignPanelInput = styled.input`
  border: none;
  border-radius: 6px;
  margin-top:10px;
  padding: 0 10px;
  height: 40px;
  width: 100%;
  outline: none
`

export const SignPanelButton = styled.button`
  margin-top: 40px;
  border: none;
  border-radius: 6px;
  color: white;
  background: ${green1};
  font-size: 1rem;
  width: 100%;
  height: 40px;

  &:hover {
    cursor: pointer;
  }
`

export const LinkGroups = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`

export const SignPanelChange = styled.a`
  color: white;
  font-size:0.8rem;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: white;
  }
`

export const Warning = styled.div`
  border: none;
  border-radius: 6px;
  margin-top:10px;
  padding: 0 10px;
  min-height: 34px;
  width: 100%;
  outline: none;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  background: ${warning};
  display: flex;
  align-items: center;
  justify-content: center;
`
