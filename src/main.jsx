import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/base.css'
import './styles/components.css'
import './styles/navbar.css'
import './styles/sections/hero.css'
import './styles/sections/about.css'
import './styles/sections/live.css'
import './styles/sections/projects.css'
import './styles/sections/writing.css'
import './styles/sections/photography.css'
import './styles/sections/contact.css'
import './styles/pages/case-study.css'
import './styles/pages/not-found.css'
import './styles/pages/blog-post.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
