import {Routes,Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import NotFound from './pages/NotFound'
import './index.css'
import { useAuth } from './context/AuthContext'


function App() {
  console.log(useAuth()?.isLoggedIn);
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
