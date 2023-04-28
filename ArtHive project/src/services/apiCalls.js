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

  export const bringAllArtworksAsUser = async (token) => {
    let config = {
      headers: { 
        'Authorization': 'Bearer '+ token,  
      }
    };

    return await axios.get(`${root}artworks/user`,config);
  }
  
export const bringAllMyArtworks = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };
    return await axios.get(`${root}artworks/mine`, config);
}

export const bringMyUserProfile = async (token) => {
    let config = {
      headers: { 
        'Authorization': 'Bearer '+ token,  
      }
    };
    return await axios.get(`${root}users/me`, config);
  }
  
export const addFavorite = async (body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };
  return await axios.post(`${root}user-artwork/favorite`, body, config);
}

export const updateFavorite = async (params, body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };
  return await axios.put(`${root}user-artwork/favorite/${params}`, body, config);
}

export const bringMyUserArtworks = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };
  return await axios.get(`${root}user-artwork/mine`,  config);

}

export const bringAllUserArtworks = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };
  return await axios.get(`${root}user-artwork/`,  config);

}

export const addComment = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.post(`${root}user-artwork/comment`,  config)
}


export const updateComment = async (params, body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.put(`${root}user-artwork/comment/${params}`,  body, config)
}
