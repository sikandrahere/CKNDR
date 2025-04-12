import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminViewLayout = () => {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default AdminViewLayout