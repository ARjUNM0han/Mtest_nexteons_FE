import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import BlogChangeContext from './Context/BlogChangeContext.jsx'
import AuthContext from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <BlogChangeContext>
          <App />
        </BlogChangeContext>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>,
)
