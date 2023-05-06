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
import { FooterTemplate } from '../../components/FooterTemplate/FooterTemplate'
import { Link } from 'react-router-dom'

export const ArtworkGallery = () => {
  const userCredentialsRdx = useSelector(userData)

  const [allArtworks, setAllArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredArtworkId, setHoveredArtworkId] = useState(null)
  const [myUserArtwork, setMyUserArtwork] = useState([])
  const [isAlreadySaved, setIsAlreadySaved] = useState({})

  const [selectedCategory, setSelectedCategory] = useState('ALL') // Category selection
  const [categoryArtworks, setCategoryArtworks] = useState([]) // Artworks of selected category

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

            // filtering artworks for category
            setCategoryArtworks(
              result.data.data.filter(
                (artwork) => artwork.category === selectedCategory
              )
            )
          })
          .catch((error) => console.log(error))
      }, 2000)
    }
  }, [allArtworks])

  useEffect(() => {
    // filtering artworks for category
    setCategoryArtworks(
      allArtworks.filter((artwork) => artwork.category === selectedCategory)
    )
    console.log(
      selectedCategory,
      'entro en useEffect cuando selectedCategory cambia'
    )
  }, [selectedCategory])

  console.log(categoryArtworks, 'category artworks a ver si cambia')

  const artworkSelected = (artwork) => {
    dispatch(addChoosenArtwork({ choosenArtwork: artwork }))

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

  const handleCategoryClick = (category) => {
    console.log(category, 'entro handleCategoryClick')
    setSelectedCategory(category)
  }

  if (loading) {
    return (
      <div className="spinnerDesign d-flex justify-content-center align-items-center flex-column">
        <SpinnerComponent message="Art is coming... hold on!" />
      </div>
    )
  } else if (allArtworks.length > 0) {
    return (
      <>
        <NavBar />
        <Container fluid>
          <h2 className="galleryTitleDesign text-center">Artworks Gallery</h2>
          <Row>
            <Col
              lg={12}
              className="mt-4 d-flex flex-wrap justify-content-center"
            >
              <button
                className="categoryBtnDesign pt-3 pb-3 ps-5 pe-5 me-3 mt-2"
                onClick={() => handleCategoryClick('ALL')}
              >
                ALL
              </button>
              <button
                className="categoryBtnDesign pt-3 pb-3 ps-5 pe-5 me-3 mt-2"
                onClick={() => handleCategoryClick('Abstract painting')}
              >
                ABSTRACT PAINTING
              </button>
              <button
                className="categoryBtnDesign pt-3 pb-3 ps-5 pe-5 me-3 mt-2"
                onClick={() => handleCategoryClick('Oil painting')}
              >
                OIL PAINTING
              </button>
              <button
                className="categoryBtnDesign pt-3 pb-3 ps-5 pe-5 me-3 mt-2"
                onClick={() => handleCategoryClick('Photography')}
              >
                PHOTOGRAPHY
              </button>
              <button
                className="categoryBtnDesign pt-3 pb-3 ps-5 pe-5 me-3 mt-2"
                onClick={() => handleCategoryClick('Digital painting')}
              >
                DIGITAL PAINTING
              </button>
              <button
                className="categoryBtnDesign pt-3 pb-3 ps-5 pe-5 me-3 mt-2"
                onClick={() => handleCategoryClick('Watercolor painting')}
              >
                WATERCOLOR PAINTING
              </button>
              <button
                className="categoryBtnDesign pt-3 pb-3 ps-5 pe-5 me-3 mt-2"
                onClick={() => handleCategoryClick('Acrylic painting')}
              >
                ACRYLIC PAINTING
              </button>
              <button
                className="categoryBtnDesign pt-3 pb-3 ps-5 pe-5 me-3 mt-2"
                onClick={() => handleCategoryClick('Graffiti Art')}
              >
                GRAFFITI
              </button>
              <button
                className="categoryBtnDesign pt-3 pb-3 ps-5 pe-5 me-3 mt-2"
                onClick={() => handleCategoryClick('Illustration')}
              >
                ILLUSTRATION
              </button>
              <button
                className="categoryBtnDesign pt-3 pb-3 ps-5 pe-5 me-3 mt-2"
                onClick={() =>
                  handleCategoryClick('Mix digital and traditional painting')
                }
              >
                DIGITAL + TRADITIONAL
              </button>
              <button
                className="categoryBtnDesign pt-3 pb-3 ps-5 pe-5 me-3 mt-2"
                onClick={() =>
                  handleCategoryClick('Mix photography and digital')
                }
              >
                PHOTOGRAPHY + DIGITAL
              </button>
            </Col>
          </Row>
          <Row className="homeSection1">
            {selectedCategory === 'ALL' ? (
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
                            <button
                              type="button"
                              className="detailsBtn"
                              onClick={() => artworkSelected(artwork)}
                            >
                              <BsFillArrowUpRightCircleFill className="bs" /> Go
                              to Details
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                addToUserArtwork(artwork)
                              }}
                              type="button"
                              className="saveBtn"
                            >
                              {isAlreadySaved[artwork.id] ? 'Saved' : 'Save'}
                            </button>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </Col>
            ) : (
              <Col>
    <div className="cardsGalleryContainer">
      {categoryArtworks
        .map((artwork) => {
          const isHovered = artwork.id === hoveredArtworkId
          return (
            <div
              className="pinDesign"
              onMouseEnter={() => setHoveredArtworkId(artwork.id)}
              onMouseLeave={() => setHoveredArtworkId(null)}
              onClick={() => artworkSelected(artwork)}
              key={artwork.id}
            >
              <img
                className="imgDesign"
                src={`http://localhost:3000/static/${artwork.image_url}`}
              />
              {isHovered && (
                <>
                  <button
                    type="button"
                    className="detailsBtn"
                    onClick={() => artworkSelected(artwork)}
                  >
                    <BsFillArrowUpRightCircleFill className="bs"/> Go to Details
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addToUserArtwork(artwork)
                    }}
                    type="button"
                    className="saveBtn"
                  >
                    {isAlreadySaved[artwork.id] ? 'Saved' : 'Save'}
                  </button>
                </>
              )}
            </div>
          )
        })}
    </div>
  </Col>
            )}
            
          </Row>
        </Container>
        <FooterTemplate />
      </>
    )
  }
}
