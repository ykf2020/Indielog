import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const SignPanelContainer = styled.div`
  background: #01bf71;
  height: 100vh;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:99;

`

export const SignPanelLogo = styled.h1`
  font-weight: bold;
  color: white;
  font-size: 2.5rem;
  position: absolute;
  top: -80px;
`

export const Panel = styled.div`
  background: black;
  border-radius: 20px;
  margin: 0 auto;
  width: 400px;
  height: 500px;
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
  color: #010606;
  right: 14px;
  top: 14px;

  &:before {
    position: absolute;
    content: "x";
    top: 50%;
    left: 50%;
    transform: translate(-42%, -54%)
  }

  &:hover {
    color: #fff;
    background: #01bf71;
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
  margin-top: 38px;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`

export const SignPanelTitleDesc = styled.p`
  margin-top: 20px;
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
  background: #01bf71;
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
`

export const SignPanelChange = styled.a`
  color: white;
  font-size:0.8rem;
  text-decoration: none;

  &:hover {
    cursor: pointer
  }
`
