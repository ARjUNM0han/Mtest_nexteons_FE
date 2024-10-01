
import './bootstrap.min.css'
import Auth from './Pages/Auth/Auth'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home/Home';
import MyBlogs from './Components/MyBlogs/MyBlogs'
import Header from './Components/Header/Header';
import { authContext } from './Context/AuthContext';
import { useContext } from 'react';
function App() {
  const { authStatus } = useContext(authContext)
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={authStatus ? <Home /> : <Auth />} />
        <Route path='/my-blogs' element={authStatus ? <MyBlogs /> : <Auth />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
