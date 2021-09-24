import React, { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink} from './HeaderElements'
import firebase from '../../utils/firebase.js'
import 'firebase/compat/auth';
const Header = ({ toggleSignPanel }) => {
  const [user, setUser] = useState(null)
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
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">Indielog</NavLogo>
        <MobileIcon>
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
        {user ? <NavBtnLink onClick={signOut}>登出</NavBtnLink> : <NavBtnLink onClick={toggleSignPanel}>註冊 / 登入</NavBtnLink>}
        </NavBtn>
      </NavbarContainer>
    </Nav>
  )
}

export default Header
