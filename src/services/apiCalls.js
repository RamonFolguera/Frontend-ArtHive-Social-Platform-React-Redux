import axios from "axios"

const root = 'https://web-production-841d.up.railway.app/https://rfc-val-finalproject-backend-production.up.railway.app/'


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

export const bringUsers = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.get(`${root}users/`,config);
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

export const addComment = async (body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.post(`${root}user-artwork/comment`, body, config)
}

export const updateComment = async (params, body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.put(`${root}user-artwork/comment/${params}`,  body, config)
}

export const deleteComment = async (params, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.delete(`${root}user-artwork/comment/${params}`,  config)
}

export const addRating = async (body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.post(`${root}user-artwork/rating`,body,  config)
}

export const updateRating = async (params, body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.put(`${root}user-artwork/rating/${params}`,  body, config)
}

export const deleteRating = async (params, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.delete(`${root}user-artwork/rating/${params}`,  config)
}

export const updateMyProfile = async (body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.put(`${root}users/update-me`,  body, config)
}

export const deleteMyArtwork = async (params, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.delete(`${root}artworks/delete/${params}`,  config)
}

export const updateUsersStatus = async (params, body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.put(`${root}users/update-status/${params}`,  body, config)
}

export const updateUsersProfileAsAdmin = async (params, body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.put(`${root}users/update-profile-as-admin/${params}`,  body, config)
}
