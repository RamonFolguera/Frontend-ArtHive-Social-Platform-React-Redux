import React from 'react'

import { Home } from '../00-Home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Register } from '../01-Register/Register'
import { ArtworkDetails } from '../06-ArtworkDetails/ArtworkDetails'
import { Login } from '../02-Login/Login'
import { NewArtwork } from '../05-NewArtwork/NewArtwork'
import { ArtworkGallery } from '../04-ArtworkGallery/ArtworkGallery'
import { MyGalleryAsArtist } from '../07-MyGalleryAsArtist/MyGalleryAsArtist'
import { UserProfile } from '../03-UserProfile/UserProfile'
import { UpdateProfile } from '../08-UpdateProfile/UpdateProfile'
import { AdminPanel } from '../09-AdminPanel/AdminPanel'
import { MyArtworkDetailsAsArtist } from '../11-MyArtworkDetailsAsArtist/MyArtworkDetailsAsArtist'
import { UserDetailsAsAdmin } from '../10-UserDetailsAsAdmin/UserDetailsAsAdmin'
import { ArtworkGalleryLoggedOut } from '../13-ArtworkGalleryLoggedOut/ArtworkGalleryLoggedOut'

export const Body = () => {
  return (
    <> 
    <Routes>
        <Route path="*" element={<Navigate to="/"/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/artwork-details" element={<ArtworkDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/new-artwork" element={<NewArtwork/>}/>
        <Route path="/artworks-gallery" element={<ArtworkGallery/>}/>
        <Route path="/my-artworks-gallery" element={<MyGalleryAsArtist/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/update-profile" element={<UpdateProfile/>}/>
        <Route path="/admin-panel" element={<AdminPanel/>}/>
        <Route path="/my-artwork-details" element={<MyArtworkDetailsAsArtist/>}/>
        <Route path="/user-details" element={<UserDetailsAsAdmin/>}/>
        <Route path="/artworks-gallery-loggedOut" element={<ArtworkGalleryLoggedOut/>}/>

    </Routes>
    </>
  )
}
