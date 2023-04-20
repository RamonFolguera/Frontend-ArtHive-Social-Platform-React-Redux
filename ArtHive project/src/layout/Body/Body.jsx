import React from 'react'

import { Home } from '../00-Home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Register } from '../01-Register/Register'
import { Login } from '../02-Login/Login'

export const Body = () => {
  return (
    <> 
    <Routes>
        <Route path="*" element={<Navigate to="/"/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
    </>
  )
}
