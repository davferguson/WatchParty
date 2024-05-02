import React from 'react'
import './HomePage.css'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

function HomePage() {
  return (
    <div className="home__page">
        <Sidebar />
        <Chat />
    </div>
  )
}

export default HomePage