import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { bringAllArtworks } from '../../services/apiCalls'
import { Col, Container, Row } from 'react-bootstrap'

import './ArtworkGallery.css'
import { Navigate, useNavigate } from 'react-router'
import { NavBar } from '../../components/Navbar/NavBar'

export const ArtworkGallery = () => {
  const [allArtworks, setAllArtworks] = useState([])
  // const [postHovered, setPostHovered] = useState(false)

  const navigate = useNavigate()
  
  useEffect(() => {
    if (allArtworks.length === 0) {
      bringAllArtworks()
        .then((result) => {
          if (result.data.data.length === 0) {
            return
          }
          setAllArtworks(result.data.data)
        })
        .catch((error) => console.log(error))
    }
  }, [allArtworks])

  return (
    <>
    <NavBar/>
    <Container fluid>
      <h2>All artworks:</h2>
      <Row className="homeSection1">
        <Col>
          <div className="cardsContainer">
            {allArtworks.map((artwork) => {
              return (
                <div className="artworkCardDesign " key={artwork.id}>
                 
                    {/* <p>
                      <span className="pe-4 nameFieldDesign">Title:</span>
                      {artwork.title}
                    </p> */}
                    <img
                      // onMouseEnter={() => setPostHovered(true)}
                      // onMouseLeave={() => setPostHovered(false)}
                      onClick={() => Navigate(`/artwork-detail/${artwork.id}`)}
                      className="ImgDesign"
                      src={`http://localhost:3000/static/${artwork.image_url}`}
                    />
                 
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
