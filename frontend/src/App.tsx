import { useEffect, useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import { BrowserRouter } from "react-router-dom"
import Login from './pages/login'

import { client} from "@gradio/client";


function App() {

  return (
    <BrowserRouter>

      <SideBar />
      {/* <Login></Login> */}

    </BrowserRouter>
  )
}

export default App
