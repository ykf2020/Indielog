import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import logo from './logo.svg';
import './App.css';
import SignPanel from './components/SignPanel'
import Header from './components/Header'
import SideBar from './components/SideBar'
import MusicPlayer from './components/MusicPlayer'
import PaddingBottom from './components/PaddingBottom'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import NewPost from './pages/NewPost'
import Music from './pages/Music'
import Song from './pages/Song'
import PersonalInfo from './pages/PersonalInfo'
import CollectionPosts from './pages/CollectionPosts'
import CollectionSongs from './pages/CollectionSongs'
import MyPosts from './pages/MyPosts'
import EditPost from './pages/EditPost'
import NewSong from './pages/NewSong'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import firebase from './utils/firebase.js'
import 'firebase/compat/auth'
import { setUser } from './redux/reducers/userReducer'
import { setSongs, setCurrentSong } from "./redux/reducers/songReducer"


function App() {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user.currentUser)
  const [isOpenSideBar, setIsOpenSideBar] = useState(false)
  const toggleSideBar = () => {
    setIsOpenSideBar(!isOpenSideBar)
  }

  const [isOpenSignPanel, setIsOpenSignPanel] = useState(false)
  const toggleSignPanel = () => {
    setIsOpenSignPanel(!isOpenSignPanel)
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('songs')
      .onSnapshot((collectionSnapShot) => {
        const data = collectionSnapShot.docs.map((doc) => {
          const id = doc.id
          return {...doc.data(),id}
        })
        dispatch(setSongs(data))
        dispatch(setCurrentSong(data[0]))
      })
  }, [])

  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged((currentUser) => {
        dispatch(setUser(currentUser))
      })
  },[])
  return (
    <div className='app'>
      <Router>
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
        <MusicPlayer />
        <ScrollToTop />
        <Switch>
          <Route exact path='/'>
            <Music />
          </Route>
          <Route exact path='/blog'>
            <Blog />
          </Route>
          <Route exact path='/blogpost/:postId'>
            <BlogPost />
          </Route>
          <Route exact path='/new-post'>
            {user ? <NewPost /> : <Redirect to='/'/>}
          </Route>
          <Route eact path='/new-song'>
            {user ? <NewSong /> : <Redirect to='/'/>}
          </Route>
          <Route exact path='/songs/:songId'>
            <Song />
          </Route>
          <Route exact path='/member/personal-info'>
            {user ? <PersonalInfo /> : <Redirect to='/'/>}
          </Route>
          <Route exact path='/member/collections/posts'>
            {user ? <CollectionPosts /> : <Redirect to='/'/>}
          </Route>
          <Route exact path='/member/collections/songs'>
            {user ? <CollectionSongs /> : <Redirect to='/'/>}
          </Route>
          <Route exact path='/member/myposts'>
            {user ? <MyPosts /> : <Redirect to='/'/>}
          </Route>
          <Route exact path='/editpost/:postId'>
            {user ? <EditPost /> : <Redirect to='/'/>}
          </Route>
        </Switch>
        <PaddingBottom />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
