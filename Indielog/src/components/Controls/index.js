import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import SignPanel from '../SignPanel'
import Header from '../Header'
import SideBar from '../SideBar'
import { getSongsOnSnapShot, checkUserStatus } from '../../utils/firebase.js'
import { setUser } from '../../redux/reducers/userReducer'
import { setSongs, setCurrentSong } from "../../redux/reducers/songReducer"


const Controls = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user.currentUser)
  const [isOpenSideBar, setIsOpenSideBar] = useState(false)
  const [isOpenSignPanel, setIsOpenSignPanel] = useState(false)

  function toggleSideBar(){
    setIsOpenSideBar(!isOpenSideBar)
  }

  function toggleSignPanel(){
    setIsOpenSignPanel(!isOpenSignPanel)
  }

  function handleUser(res){
    dispatch(setUser(res))
  }

  function handleDefaultSongs(res){
    dispatch(setSongs(res))
    dispatch(setCurrentSong(res[0]))
  }

  useEffect(() => {
    getSongsOnSnapShot(handleDefaultSongs)
    checkUserStatus(handleUser)
  }, [])

  return (
    <>
    {(isOpenSignPanel && !user) &&
      <SignPanel
      isOpenSignPanel={isOpenSignPanel}
      toggleSignPanel={toggleSignPanel}
      />
    }
    <Header
      isOpenSignPanel={isOpenSignPanel}
      toggleSignPanel={toggleSignPanel}
      toggleSideBar={toggleSideBar}
    />
    <SideBar
      toggleSignPanel={toggleSignPanel}
      isOpenSideBar={isOpenSideBar}
      toggleSideBar={toggleSideBar}
    />
    </>
  )
}

export default Controls
