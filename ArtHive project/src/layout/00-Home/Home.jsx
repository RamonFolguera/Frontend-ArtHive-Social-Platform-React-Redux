import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import './Home.css'
import { bringAllArtworks } from "../../services/apiCall";

export const Home = () => {

const [allArtworks, setAllArtworks] = useState([])

useEffect(() => {
    if (allArtworks.length === 0) {
        bringAllArtworks()
        .then((result) => {

          if (result.data.data.length === 0) {
            return;
          }
          console.log(result)
          const randomArtwork = result.data.data[Math.floor(Math.random() * result.data.data.length)];
          setAllArtworks([randomArtwork]);
        
          console.log(randomArtwork);
        })
        .catch((error) => console.log(error));
    }
  }, []);

console.log(allArtworks, "artwork random");
    return (
        <Container>
             <h2>All artworks:</h2>
            <Row className="homeSection1">
            <Col>
            <div className="cardsContainer">
           
                {allArtworks.map((artwork) => {
                    return (
                    <div className="appointmentCardDesign" key={artwork.id}>
                        <div className="d-flex flex-column">
                        <p>
                            <span className="pe-4 nameFieldDesign">Title:</span>
                            {artwork.title}
                        </p>
                </div>
              </div>
            );
          })}
        </div>
               
                </Col>
                <Col></Col>
            </Row>
            <Row className="homeSection1">
                <Col>
                </Col>
            </Row>
            <Row className="homeSection1">
                <Col>
                <p>Hello</p>
                </Col>
            </Row>
        </Container>


    )};