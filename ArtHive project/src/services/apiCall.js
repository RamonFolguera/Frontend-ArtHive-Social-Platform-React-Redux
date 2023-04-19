import axios from "axios"

const root = 'http://localhost:3000/'

export const bringAllArtworks = async (token) => {
    
    return await axios.get(`${root}artworks`);
  }