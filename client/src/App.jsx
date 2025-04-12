import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar,AppSidebar, Footer } from './components/allFiles'
const App = () => {
  return (
    <div>
      <Navbar/>
      <AppSidebar  />
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App