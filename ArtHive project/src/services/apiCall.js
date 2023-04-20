import axios from "axios"

const root = 'http://localhost:3000/'


export const registerUser = async (body) => {

  return await axios.post(`${root}auth/register`, body)

}

export const logMe = async (body) => {

  return await axios.post(`${root}auth/login`, body)

}

export const bringAllArtworks = async () => {
 
    return await axios.get(`${root}artworks`);
  }


    
 