import axios from "axios"

const root = 'http://localhost:3000/'

export const bringAllArtworks = async (token) => {
    let config = {
      headers: { 
        'Authorization': 'Bearer '+ token,  
      }
    };
    return await axios.get(`${root}artworks`, config);
  }

  export const logMe = async (body) => {

    return await axios.post(`${root}auth/login`, body)

}