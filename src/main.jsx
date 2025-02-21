import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeContextProvider } from './context/theme-context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
    <App />
    </ThemeContextProvider>
  </StrictMode>,
)


//git
//git cli

//gh auth login

//add repo in github
// 1) git add .
// 2) git commit -m "git commands added"
// 3) git push origin master 

// git clone https://github.com/RiyaThavani/TodoList.git