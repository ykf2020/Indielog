import React, { useState, useEffect, useRef } from 'react'
import { FaBars } from 'react-icons/fa'
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  NavMemberImgDiv,
  DropDownContainer,
  DropDownMain,
  DropDownItem,
  DropDownBottom,
  MemberDiv
} from './HeaderElements'
import firebase from '../../utils/firebase.js'
import 'firebase/compat/auth'

const Header = ({ toggleSignPanel, toggleSideBar }) => {
  const [user, setUser] = useState(null)
  const [isOpenDropDown, setIsOpenDropDown] = useState(false)
  const dropDownRef = useRef(null)
  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged((currentUser) => {
        setUser(currentUser)
      })
  },[])
  const signOut = () => {
    firebase.auth().signOut()
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpenDropDown(false);
      }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">Indielog</NavLogo>
        <MobileIcon onClick={toggleSideBar}>
          <FaBars />
        </MobileIcon>
        <NavMenu>
          <NavItem>
            <NavLinks to="/">聽聽音樂</NavLinks>
          </NavItem>
          <div style={{color: '#fff'}}> | </div>
          <NavItem>
            <NavLinks to="/blog">聊聊音樂</NavLinks>
          </NavItem>
        </NavMenu>
        <NavBtn>
        {user ?
          <MemberDiv ref={dropDownRef}>
            <DropDownContainer  isOpenDropDown={isOpenDropDown}>
              <DropDownMain>
                <DropDownItem to='/new-song'>上傳音樂</DropDownItem>
                <DropDownItem to='/new-post'>新增文章</DropDownItem>
                <DropDownItem to='/member/collections/songs'>收藏列表</DropDownItem>
                <DropDownItem to='/member/personal-info'>會員資料</DropDownItem>
              </DropDownMain>
              <DropDownBottom>登出</DropDownBottom>
            </DropDownContainer>
            <NavMemberImgDiv onClick = {() => setIsOpenDropDown(!isOpenDropDown)}>
              <img src={'https://cdn.hk01.com/di/media/images/cis/5e4270c8a5e2c82bd6096139.jpg/KNyBGtInTJ6vNZG50MWr4YRe57jWFOUilG8xy5RvMcs?v=w1920'}/>
            </NavMemberImgDiv>
          </MemberDiv>
          :
          <NavBtnLink onClick={toggleSignPanel}>註冊 / 登入</NavBtnLink>
        }
        </NavBtn>
      </NavbarContainer>
    </Nav>
  )
}

export default Header
