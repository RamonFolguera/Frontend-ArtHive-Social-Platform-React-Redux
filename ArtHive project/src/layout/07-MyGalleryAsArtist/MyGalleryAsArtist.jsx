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

export const MyGalleryAsArtist = () => {
  const [allMyArtworks, setAllMyArtworks] = useState([])
  const [loading, setLoading] = useState(true);

  // const [postHovered, setPostHovered] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const userCredentialsRdx = useSelector(userData)


  useEffect(() => {
    if (allMyArtworks.length === 0) {
        setTimeout(() => {
      bringAllMyArtworks()
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
      navigate("/artwork-details");
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
      <h2>All artworks:</h2>
      <Row className="homeSection1">
        <Col>
          <div className="cardsContainer">
            {allMyArtworks.map((artwork) => {
              return (
                <div className="artworkCardDesign " key={artwork.id}>
                 
                    {/* <p>
                      <span className="pe-4 nameFieldDesign">Title:</span>
                      {artwork.title}
                    </p> */}
                    <img
                      // onMouseEnter={() => setPostHovered(true)}
                      // onMouseLeave={() => setPostHovered(false)}
                      onClick={() => artworkSelected(artwork)}
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
}
