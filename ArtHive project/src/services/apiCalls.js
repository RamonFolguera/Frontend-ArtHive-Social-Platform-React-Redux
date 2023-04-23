import axios from "axios"

const root = 'http://localhost:3000/'


export const registerUser = async (body) => {

  return await axios.post(`${root}auth/register`, body)

}

export const registerNewArtwork = async (body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };
  return await axios.post(`${root}artworks/new`, body, config)

}

export const logMe = async (body) => {

  return await axios.post(`${root}auth/login`, body)

}

export const bringAllArtworks = async () => {
 
    return await axios.get(`${root}artworks`);
  }





    
 