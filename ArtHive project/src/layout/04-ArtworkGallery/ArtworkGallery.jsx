import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {
  addFavorite,
  bringAllArtworksAsUser,
  bringMyUserArtworks,
  updateFavorite,
} from '../../services/apiCalls'
import { Col, Container, Row } from 'react-bootstrap'

import './ArtworkGallery.css'
import { useNavigate } from 'react-router'
import { NavBar } from '../../components/Navbar/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { addChoosenArtwork, artworkData } from '../artworkSlice'
import { userData } from '../userSlice'
import { SpinnerComponent } from '../../components/SpinnerComponent/SpinnerComponent'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'


export const ArtworkGallery = () => {
  const userCredentialsRdx = useSelector(userData)

  const [allArtworks, setAllArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredArtworkId, setHoveredArtworkId] = useState(null)
  const [myUserArtwork, setMyUserArtwork] = useState([])
  const [isAlreadySaved, setIsAlreadySaved] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (myUserArtwork.length === 0) {
      bringMyUserArtworks(userCredentialsRdx.credentials.token)
        .then((result) => {
          if (result.data.data.length === 0) {
            return
          }
          setMyUserArtwork(result.data.data)
        })
        .catch((error) => console.log(error))
    }
  }, [myUserArtwork])

  useEffect(() => {
    if (allArtworks.length === 0) {
      setTimeout(() => {
        bringAllArtworksAsUser(userCredentialsRdx.credentials.token)
          .then((result) => {
            setLoading(false)

            if (result.data.data.length === 0) {
              return
            }
            setAllArtworks(result.data.data)

            const savedArtworks = {}
            result.data.data.forEach((artwork) => {
              if (
                artwork.Users.length > 0 &&
                artwork.Users[0].User_artworks.favorite === 1
              ) {
                savedArtworks[artwork.id] = true
              } else {
                savedArtworks[artwork.id] = false
              }
            })
            setIsAlreadySaved(savedArtworks)
          })
          .catch((error) => console.log(error))
      }, 2000)
    }
  }, [allArtworks])

  const artworkSelected = (artwork) => {

    dispatch(addChoosenArtwork({ choosenArtwork: artwork }));
 
    const isRegistered = myUserArtwork.some(
      (userArtwork) => userArtwork.artwork_id === artwork.id
    )

    if (isRegistered) {
      const artworkToUpdateFav = myUserArtwork.find(
        (userArtwork) => userArtwork.artwork_id === artwork.id
      )
     
      }
    setTimeout(() => {
      navigate('/artwork-details')
    }, 500)
  }

  const addToUserArtwork = (artwork) => {
    const artworkId = artwork.id
    console.log(artwork, 'entro addToUserArtwork')
    const isRegistered = myUserArtwork.some(
      (userArtwork) => userArtwork.artwork_id === artwork.id
    )
    console.log(isRegistered, 'isRegistered')

    if (isRegistered) {
      const artworkToUpdateFav = myUserArtwork.find(
        (userArtwork) => userArtwork.artwork_id === artwork.id
      )
     

      updateFavorite(
        artworkToUpdateFav.id,
        { favorite: !artworkToUpdateFav.favorite },
        userCredentialsRdx.credentials.token
      )
        .then(() => {
          setMyUserArtwork((prevState) =>
            prevState.map((userArtwork) =>
              userArtwork.id === artworkToUpdateFav.id
                ? {
                    ...userArtwork,
                    favorite: !artworkToUpdateFav.favorite,
                  }
                : userArtwork
            )
          )

          setIsAlreadySaved((prevState) => ({
            ...prevState,
            [artworkId]: !artworkToUpdateFav.favorite,
          }))
        })
        .catch((error) => console.log(error))
    } else {
      console.log(artworkId, 'entro addfavorite')

      addFavorite(
        { artwork_id: artworkId, favorite: true },
        userCredentialsRdx.credentials.token
      )
        .then(() => {
          setMyUserArtwork((prevState) => [
            ...prevState,
            { artwork_id: artworkId, favorite: true },
          ])
          setIsAlreadySaved((prevState) => ({
            ...prevState,
            [artworkId]: true,
          }))
        })
        .catch((error) => console.log(error))
    }
  }

  if (loading) {
    return (
      
        <div className="spinnerDesign d-flex justify-content-center align-items-center flex-column">
          <SpinnerComponent message="Art is coming... hold on!" />
        </div>
    )
  } else if (allArtworks.length > 0) {
    return (
     

        <Container fluid>
          <h2>All artworks:</h2>
          <Row className="homeSection1">
            <Col>
              <div className="cardsGalleryContainer">
                {allArtworks.map((artwork) => {
                    const isHovered = artwork.id === hoveredArtworkId
                  return (
                    <div
                      className="pinDesign "
                      onMouseEnter={() => setHoveredArtworkId(artwork.id)}
                      onMouseLeave={() => setHoveredArtworkId(null)}
                      onClick={() => artworkSelected(artwork)}
                      key={artwork.id}
                    >
                      {/* <p>
                      <span className="pe-4 nameFieldDesign">Title:</span>
                      {artwork.title}
                    </p> */}
                      <img
                        className="imgDesign"
                        src={`http://localhost:3000/static/${artwork.image_url}`}
                      />
                      {isHovered && (
                      
                              <>
                              <button type="button"
                                  className="detailsBtn"
                                  onClick={() => artworkSelected(artwork)}>
                                    <BsFillArrowUpRightCircleFill className="bs"/>  Go to Details
                              </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    addToUserArtwork(artwork)
                                  }}
                                  type="button"
                                  className="saveBtn"
                                >
                                  {isAlreadySaved[artwork.id]
                                    ? 'Saved'
                                    : 'Save'}
                                </button>
                              </>
                      
                      )}
                    </div>
                  )
                })}
              </div>
            </Col>
          </Row>
        </Container>
   
    )
  }
}
