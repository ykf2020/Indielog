import { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignPanel from './components/SignPanel'
import Header from './components/Header'
import SideBar from './components/SideBar'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import NewPost from './pages/NewPost'
import Music from './pages/Music'
import Song from './pages/Song'
import PersonalInfo from './pages/PersonalInfo'
import MusicPlayer from './components/MusicPlayer'
import PaddingBottom from './components/PaddingBottom'
import CollectionPosts from './pages/CollectionPosts'
import CollectionSongs from './pages/CollectionSongs'
import data from './data.js'
import { useDispatch } from "react-redux";
import { setSongs, setCurrentSong } from "./redux/reducers/songReducer";

function App() {

  const dispatch = useDispatch()
  const [isOpenSideBar, setIsOpenSideBar] = useState(false)
  const toggleSideBar = () => {
    setIsOpenSideBar(!isOpenSideBar)
  }

  const [isOpenSignPanel, setIsOpenSignPanel] = useState(false)
  const toggleSignPanel = () => {
    setIsOpenSignPanel(!isOpenSignPanel)
  }

  useEffect(() => {
    dispatch(setSongs(data))
    dispatch(setCurrentSong(data[0]))
  }, [])

  return (
    <div className='app'>
      <Router>
        {isOpenSignPanel &&
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
            <NewPost />
          </Route>
          <Route exact path='/songs/:songId'>
            <Song />
          </Route>
          <Route exact path='/member/personal-info'>
            <PersonalInfo />
          </Route>
          <Route exact path='/member/collections/posts'>
            <CollectionPosts />
          </Route>
          <Route exact path='/member/collections/songs'>
            <CollectionSongs />
          </Route>
        </Switch>
        <PaddingBottom />
      </Router>
    </div>
  );
}

export default App;
