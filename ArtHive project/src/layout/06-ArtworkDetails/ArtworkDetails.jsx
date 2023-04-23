import React from 'react'
import { useNavigate } from 'react-router';
import { artworkData } from '../artworkSlice';
import { useSelector } from 'react-redux';
import { NavBar } from '../../components/Navbar/NavBar';
import { Col, Container, Row } from 'react-bootstrap';

export const ArtworkDetails = () => {

    const navigate = useNavigate();
    const artworkSelectedRdx = useSelector(artworkData);

    const artworkSelectedObj = artworkSelectedRdx.choosenArtwork;
    
    console.log(artworkSelectedObj);


  return (
<>
    <NavBar/>

    <Container fluid>
      <h2>Selected artwork in detail:</h2>
      <Row className="homeSection1">
        <Col>
          <div className="cardsContainer">
                <div className="artworkCardDesign ">
                    <p>
                      <span className="pe-4 nameFieldDesign">TITLE:</span>
                      {artworkSelectedObj.title}
                    </p>
                    <p>
                    <span className="pe-4 nameFieldDesign">ARTIST:</span>
                      {artworkSelectedObj.Artist.artistic_name} 
                    </p>
                    <p>
                      <span className="pe-4 nameFieldDesign">CATEGORY:</span>
                      {artworkSelectedObj.category}
                    </p>
                    <p>
                      <span className="pe-4 nameFieldDesign">TECHNIQUE:</span>
                      {artworkSelectedObj.technique}
                    </p>
                    <p>
                      <span className="pe-4 nameFieldDesign">CREATED AT:</span>
                      {artworkSelectedObj.date_creation}
                    </p>
                    <p>
                      <span className="pe-4 nameFieldDesign">DIMENSIONS:</span>
                      {artworkSelectedObj.dimensions}
                    </p>
                    <p>
                      <span className="pe-4 nameFieldDesign">DESCRIPTION:</span>
                      {artworkSelectedObj.description}
                    </p>
                    <p>
                      <span className="pe-4 nameFieldDesign">PRICE:</span>
                      {artworkSelectedObj.price}
                    </p>
                  
                    <img                     
                      className="ImgDesign"
                      src={`http://localhost:3000/static/${artworkSelectedObj.image_url}`}
                    />    
                         

                </div>
                <button>GO TO THE ARTIST PERSONAL PAGE TO GET TO KNOW THEM</button>
          </div>
        </Col>
      </Row>
    </Container>
    </>

  )
}
