import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { addFavorite, bringAllArtworks, bringMyUserArtworks, updateFavorite } from '../../services/apiCalls'
import { Col, Container, Row, Spinner } from 'react-bootstrap'

import './ArtworkGallery.css'
import { useNavigate } from 'react-router'
import { NavBar } from '../../components/Navbar/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { addChoosenArtwork, artworkData } from '../artworkSlice'
import { userData } from '../userSlice'
import { SpinnerComponent } from '../../components/SpinnerComponent/SpinnerComponent'
import { addChoosenUserArtwork, userArtworkData } from '../userArtworkSlice'

export const ArtworkGallery = () => {
  const [allArtworks, setAllArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingPost, setSavingPost] = useState(false)
  const [postHovered, setPostHovered] = useState(false)
  const [myUserArtwork, setMyUserArtwork] = useState([])
 
  // const alreadySaved = 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userCredentialsRdx = useSelector(userData)
  const userArtworkDetailsRdx = useSelector(userArtworkData)

  useEffect(() => {
  
    if (myUserArtwork.length === 0) {
        bringMyUserArtworks(userCredentialsRdx.credentials.token)
          .then((result) => {

            if (result.data.data.length === 0) {
              return
            }
            setMyUserArtwork(result.data.data)
            console.log(result.data.data)

          })
          .catch((error) => console.log(error))
    }
  }, [myUserArtwork])

useEffect(() => {

  if (allArtworks.length === 0) {
      setTimeout(() => {
        bringAllArtworks()
          .then((result) => {
            setLoading(false)

            if (result.data.data.length === 0) {
              return
            }
            setAllArtworks(result.data.data)
          })
          .catch((error) => console.log(error))
      }, 2000)
    }
}, [allArtworks])

useEffect (()=>{
  if (myUserArtwork.length === 0) {
    bringMyUserArtworks(userCredentialsRdx.credentials.token)
      .then((result) => {

        if (result.data.data.length === 0) {
          return
        }
        setMyUserArtwork(result.data.data)
        console.log(result.data.data)

      })
      .catch((error) => console.log(error))
}
},[userCredentialsRdx.credentials.token])


const artworkSelected = (artwork) => {
    dispatch(addChoosenArtwork({ choosenArtwork: artwork }))
    console.log(dispatch(addChoosenArtwork({ choosenArtwork: artwork })));
    console.log(artwork.id)
  const artworkId = artwork.id

   const isRegistered = myUserArtwork.some(
    (userArtwork) => userArtwork.artwork_id === artwork.id
   )

   if (isRegistered) {
    const artworkToUpdateFav = myUserArtwork.find (
      (userArtwork) => userArtwork.artwork_id === artwork.id
    )
    updateFavorite(
      artworkToUpdateFav.id,
      { favorite: !artworkToUpdateFav.favorite },
      userCredentialsRdx.credentials.token
    )
      .then(() => {
        setMyUserArtwork((prev) =>
          prev.map((userArtwork) =>
            userArtwork.id === artworkToUpdateFav.id
              ? {
                  ...userArtwork,
                  favorite: !artworkToUpdateFav.favorite,
                }
              : userArtwork
          )
        );
      })
      .catch((error) => console.log(error));
  } else {
    addFavorite(artworkId, userCredentialsRdx.credentials.token)
      .then(() => {
        setMyUserArtwork((prev) => [...prev, { artwork_id: artworkId, favorite: true }]);
      })
      .catch((error) => console.log(error));
  }
};
 
    //   setParams(userArtwork.id);

    //   if (artwork.id === userArtwork.artwork_id ) {
    //     //Register exists then update
    //     console.log(params);
    //     console.log("entro porque ids son iguales");
    //     if (userArtwork.favorite === true) {
    //       console.log(userArtwork.favorite,"aqui favorite es true");
    //       setModifyFavorite({
    //         id: params,
    //         favorite: false
    //       })
    //       console.log(modifyFavorite,"aqui favorite es false");

    //       updateFavorite(params, modifyFavorite, userCredentialsRdx.credentials.token)
    //       console.log(myUserArtwork,"aqui traigo myUserARtwork actualizado");
          

    //     } else {
    //       console.log(userArtwork.favorite,"aqui favorite es false");

    //       setModifyFavorite({
    //         id: params,
    //         favorite: true
    //       })
    //       console.log(modifyFavorite,"aqui favorite es true");

    //       updateFavorite(params, modifyFavorite, userCredentialsRdx.credentials.token)
    //     }

    //   } else {
      
    //     setCreateFavorite({
    //       favorite: true,
    //       artwork_id: artworkId
    //     })
    //     addFavorite(createFavorite, userCredentialsRdx.credentials.token)
    //   }
    // })
    
    // setTimeout(() => {
    //   navigate('/artwork-details')
    // }, 1000)
  

 

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="spinnerDesign d-flex justify-content-center align-items-center flex-column">
          <SpinnerComponent message="Art is coming... hold on!" />
        </div>
      </>
    )
  } else if (allArtworks.length > 0) {
    return (
      <>
        <NavBar />

        <Container fluid>
          <h2>All artworks:</h2>
          <Row className="homeSection1">
            <Col>
              <div className="cardsContainer">
                {allArtworks.map((artwork) => {
                  return (
                    <div 
                    className="pinDesign " 
                    onMouseEnter={() => setPostHovered(true)}
                    onMouseLeave={() => setPostHovered(false)}
                    onClick={() => artworkSelected(artwork)}
                    key={artwork.id}>
                      {/* <p>
                      <span className="pe-4 nameFieldDesign">Title:</span>
                      {artwork.title}
                    </p> */}
                      <img
                        className="imgDesign"
                        src={`http://localhost:3000/static/${artwork.image_url}`}
                      />
                      {postHovered && (
                        <div
                          className=""
                        >
                          <div
                          className=""
                          >
                            <div onClick={() => addToUserArtwork()} className="">
                              hey
                              {/* <a href=""
                              onClick={(e) => e.stopPropagation()}></a> */}
{/* 
                              {alreadySaved?.length !== 0 ? (
                                <>
                                <button>Saved</button>
                                </>
                              ): (
                                <>
                                <button>Save</button>
                                </>
                              )} */}
                              
                              
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
