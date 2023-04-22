import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { bringAllArtworks } from '../../services/apiCall';
import { Col, Container, Row } from 'react-bootstrap';

export const Gallery = () => {
  const [allArtworks, setAllArtworks] = useState([]);
 



  useEffect(() => {
      if (allArtworks.length === 0) {
          bringAllArtworks()
          .then((result) => {
            if (result.data.data.length === 0) {
              return;
            }
            const randomArtwork = result.data.data[Math.floor(Math.random() * result.data.data.length)];
            setAllArtworks([randomArtwork]);
          })
          .catch((error) => console.log(error));
      }
    }, []);

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
            </Container>
  )
}
