import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { bringAllArtworks } from '../../services/apiCalls'
import { Col, Container, Row, Spinner } from 'react-bootstrap'

import './ArtworkGallery.css'
import { useNavigate } from 'react-router'
import { NavBar } from '../../components/Navbar/NavBar'
import { useDispatch } from 'react-redux'
import { addChoosenArtwork } from '../artworkSlice'

export const ArtworkGallery = () => {
  const [allArtworks, setAllArtworks] = useState([])
  const [loading, setLoading] = useState(true);

  // const [postHovered, setPostHovered] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const userCredentialsRdx = useSelector(userData)


  useEffect(() => {
    if (allArtworks.length === 0) {
      bringAllArtworks()
        .then((result) => {
            setLoading(false);

          if (result.data.data.length === 0) {
            return
          }
          setAllArtworks(result.data.data)
        })
        .catch((error) => console.log(error))
    }
  }, [allArtworks])

  const artworkSelected = (artwork) => {
    dispatch(addChoosenArtwork({ choosenArtwork: artwork }));
    setTimeout(() => {
      navigate("/artwork-detail");
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
          <h4>Loading...</h4>
        </div>
      </div>
      </>
    );
} else if (allArtworks.length > 0) {
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
