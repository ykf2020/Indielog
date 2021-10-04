import { SidebarContainer, SidebarMenu, SidebarLink, SideBtnWrap, SignPanelBtn, SideMemberDiv, SideMemberImgDiv, MemberHello } from './SidebarElements'
import { useSelector } from 'react-redux'
import { signOut } from '../../utils/firebase.js'

const SideBar = ({ isOpenSideBar, toggleSideBar, toggleSignPanel }) => {
  const user = useSelector((store) => store.user.currentUser)
  return (
    <SidebarContainer isOpenSideBar={isOpenSideBar}>
        <SidebarMenu>
          {user ?
            <SideMemberDiv>
              <SideMemberImgDiv>
                <img src={user.photoURL ? user.photoURL : '/default-user-image.png'}/>
              </SideMemberImgDiv>
              <MemberHello>嗨！{user.displayName}</MemberHello>
            </SideMemberDiv> : ''}
          <SidebarLink to="/" onClick={toggleSideBar}>聽聽音樂</SidebarLink>
          <SidebarLink to="/blog" onClick={toggleSideBar}>聊聊音樂</SidebarLink>
          {user ? <SidebarLink to="/new-song" onClick={toggleSideBar}>上傳音樂</SidebarLink> : ''}
          {user ? <SidebarLink to="/new-post" onClick={toggleSideBar}>新增文章</SidebarLink> : ''}
          {user ? <SidebarLink to="/member/collections/songs" onClick={toggleSideBar}>收藏列表</SidebarLink> : ''}
          {user ? <SidebarLink to="/member/personal-info" onClick={toggleSideBar}>會員資料</SidebarLink> : ''}
        </SidebarMenu>
        <SideBtnWrap>
        {user ?  <SignPanelBtn onClick={() => {toggleSideBar(); signOut()}}>登出</SignPanelBtn> : <SignPanelBtn onClick={() => {toggleSideBar(); toggleSignPanel()}}>註冊 / 登入</SignPanelBtn>}
        </SideBtnWrap>
    </SidebarContainer>
  )
}

export default SideBar;
