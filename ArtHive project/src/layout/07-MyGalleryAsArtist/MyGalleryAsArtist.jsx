import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { bringAllArtworks, bringAllMyArtworks } from '../../services/apiCalls'
import { Col, Container, Row, Spinner } from 'react-bootstrap'

import './MyGalleryAsArtist.css'
import { useNavigate } from 'react-router'
import { NavBar } from '../../components/Navbar/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { addChoosenArtwork } from '../artworkSlice'
import { userData } from '../userSlice'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'

export const MyGalleryAsArtist = () => {
  const [allMyArtworks, setAllMyArtworks] = useState([])
  const [loading, setLoading] = useState(true);
  const [hoveredArtworkId, setHoveredArtworkId] = useState(null)
  const [isAlreadySaved, setIsAlreadySaved] = useState({})


  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const userCredentialsRdx = useSelector(userData)

  useEffect(() => {
    if (allMyArtworks.length === 0) {
        setTimeout(() => {
      bringAllMyArtworks(userCredentialsRdx.credentials.token)
        .then((result) => {
            setLoading(false);

          if (result.data.data.length === 0) {
            return
          }
          setAllMyArtworks(result.data.data)
        })
        .catch((error) => console.log(error))
    }, 2000);
    }
  }, [allMyArtworks])

  const artworkSelected = (artwork) => {
    dispatch(addChoosenArtwork({ choosenArtwork: artwork }));
    setTimeout(() => {
      navigate("/my-artwork-details");
    }, 1000);
  };

  if (loading) {
    return (
        <>
    <NavBar/>

      <div className="spinnerDesign d-flex justify-content-center align-items-center flex-column">
        <div>
          {" "}
          <Spinner animation="border" variant="primary" />
        </div>
        <div>
          {" "}
          <h4>Art is coming... hold on!</h4>
        </div>
      </div>
      </>
    );
} else if (allMyArtworks.length > 0) {
  return (
    <>
    <NavBar/>

    <Container fluid>
      <h2 className="galleryTitleDesign text-center">My Artworks Gallery</h2>
      <Row className="homeSection1">
        <Col>
          <div className="cardsGalleryContainer">
                {allMyArtworks.map((artwork) => {
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
    </>
  )
}
}
