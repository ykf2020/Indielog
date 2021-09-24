import { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignPanel from './components/SignPanel'
import Header from './components/Header'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import NewPost from './pages/NewPost'
import Music from './pages/Music'

function App() {
  const [isOpenSignPanel, setIsOpenSignPanel] = useState(false)
  const toggleSignPanel = () => {
    setIsOpenSignPanel(!isOpenSignPanel)
  }
  return (
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
        <Route>
          <NewPost path='/new-post' />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;