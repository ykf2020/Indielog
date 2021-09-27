import { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignPanel from './components/SignPanel'
import Header from './components/Header'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import NewPost from './pages/NewPost'
import Music from './pages/Music'
import Song from './pages/Song'
import MusicPlayer from './components/MusicPlayer'
import PaddingBottom from './components/PaddingBottom'
import data from './data.js'
import { useDispatch } from "react-redux";
import { setSongs, setCurrentSong } from "./redux/reducers/songReducer";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSongs(data))
    dispatch(setCurrentSong(data[0]))
  }, [])

  const [isOpenSignPanel, setIsOpenSignPanel] = useState(false)
  const toggleSignPanel = () => {
    setIsOpenSignPanel(!isOpenSignPanel)
  }
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
        />
        <MusicPlayer />
        <Switch>
          <Route exact path='/'>
            <Music />
          </Route>
          <Route exact path='/blog'>
            <Blog />
          </Route>
          <Route path='/blogpost/:postId'>
            <BlogPost />
          </Route>
          <Route path='/new-post'>
            <NewPost />
          </Route>
          <Route path='/songs'>
            <Song />
          </Route>
        </Switch>
        <PaddingBottom />
      </Router>
    </div>
  );
}

export default App;
