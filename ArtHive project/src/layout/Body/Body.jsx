import React from 'react'

import { Home } from '../00-Home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Register } from '../01-Register/Register'
import { ArtworkDetails } from '../06-ArtworkDetails/ArtworkDetails'
import { Login } from '../02-Login/Login'
import { NewArtwork } from '../05-NewArtwork/NewArtwork'
import { ArtworkGallery } from '../04-ArtworkGallery/ArtworkGallery'

export const Body = () => {
  return (
    <> 
    <Routes>
        {/* <Route path="/" element={<Layout />}/> */}
        <Route path="*" element={<Navigate to="/"/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/artwork-details" element={<ArtworkDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/newArtwork" element={<NewArtwork/>}/>
        <Route path="/artworks-gallery" element={<ArtworkGallery/>}/>
    </Routes>
    </>
  )
}
