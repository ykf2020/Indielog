import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { gray2, gray4, green1, green2, black1 } from '../../constants.js'
export const Nav = styled.nav`
  background: ${black1};
  height: 80px;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: fixed;
  top: 0;
  z-index: 1001;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`

export const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 12px;
  font-weight: bold;
  text-decoration: none;
  font-family: 'Dancing Script', cursive;

  &:hover {
    color: white;
  }
`

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absulute;
    top: 0;
    right: 0;
    transform: translate(-60%, 16%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`

export const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right: -22px;
  margin: auto 0;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavItem = styled.li`
  height: 80px;
`

export const NavLinks = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &:hover {
    color: white;
  }
`

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none
  }
`

export const NavBtnLink = styled.a`
  border-radius: 50px;
  background: ${green1};
  padding: 10px 22px;
  color: ${black1};
  font-size: 14px;
  outline:none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: ${black1};
  }
`

export const MemberDiv = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
  display:flex;
  align-items: center;
  justify-content: center;
  margin-left: 61px;
`


export const NavMemberImgDiv = styled.div`
  width:  50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid white;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const DropDownContainer = styled.div`
  position: absolute;
  z-index: 2000;
  top: 0;
  right: 0;
  opacity: 0;
  transform: translate(20px, 45px);
  width: 150px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(33, 33, 33, 0.5);
  display:flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  justify-content: space-between;
  overflow:hidden;

  ${({isOpenDropDown}) => isOpenDropDown && `
    transform: translate(20px, 70px);
    opacity: 1;
  `}
`

export const DropDownMain = styled.div`
  width: 100%;
  display:none;
  ${({isOpenDropDown}) => isOpenDropDown && `
    display: block;
  `}
`

export const DropDownItem = styled(Link)`
  text-decoration: none;
  color: ${gray4};
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width:100%;
  cursor: pointer;
  padding: 0 6px;
  border-bottom: 1px solid ${gray2};
  transition: all 0.3s ease;
  &:hover {
    background: ${green2};
    color: white;
  }

`
export const DropDownBottom = styled.div`
  color: ${gray4};
  font-size: 1rem;
  height:50px;
  width: 100%;
  padding: 6px 4px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    background: ${green2};
    color: white;
    font-size: bold;
  }

  display:none;
  ${({isOpenDropDown}) => isOpenDropDown && `
    display: flex;
  `}
`
