import React from 'react'

import { Home } from '../00-Home/Home'

export const Body = () => {
  return (
    <> 
    <Routes>
        <Route path="*" element={<Navigate to="/"/>}/>
        <Route path="/" element={<Home/>}/>
    </Routes>
    </>
  )
}
