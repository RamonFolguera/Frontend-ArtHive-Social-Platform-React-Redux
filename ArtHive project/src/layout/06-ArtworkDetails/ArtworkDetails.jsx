import React from 'react'
import { useNavigate } from 'react-router';
import { artworkData } from '../artworkSlice';
import { useSelector } from 'react-redux';

export const ArtworkDetails = () => {

    const navigate = useNavigate();
    const artworkSelectedRdx = useSelector(artworkData);






  return (

    
    <div>ArtworkDetails</div>
  )
}
