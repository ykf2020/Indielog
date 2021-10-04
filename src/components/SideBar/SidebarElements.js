import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { green1, black1, MEDIA_QUERY_568 } from '../../constants.js'

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #0d0d0d;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
  top: 0;
  right: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpenSideBar }) => (isOpenSideBar ? '100%' : '0')};
  right: ${({ isOpenSideBar }) => (isOpenSideBar ? '0' : '-100%')};
`

export const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 700px;
  text-align: center;
  padding: 20px 0;
`

export const SidebarLink = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  margin: 20px 0 ;
  &:hover {
    color: ${green1};
    transition: 0.2s ease-in-out;
  }

  ${MEDIA_QUERY_568} {
    font-size: 1rem;
    margin: 10px 0 ;
  }
`

export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`

export const SignPanelBtn = styled.button`
  border-radius: 50px;
  background: ${green1};
  white-space: nowrap;
  padding: 16px 64px;
  color: ${black1};
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: ${black1};
  }

  ${MEDIA_QUERY_568} {
    font-size: 14px;
    padding: 12px 50px;
  }
`

export const SideMemberDiv = styled.div`
  height: 80px;
  width: 180px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const SideMemberImgDiv = styled.div`
  width:  45px;
  height: 45px;
  border-radius: 50%;
  border: 3px solid white;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
export const MemberHello = styled.div`
  margin: 4px 0;
  color: white;
  font-size: 1rem;
`
