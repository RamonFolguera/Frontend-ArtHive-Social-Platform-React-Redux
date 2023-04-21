import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";

import './Home.css'
import { bringAllArtworks } from "../../services/apiCalls";

export const Home = () => {

const [allArtworks, setAllArtworks] = useState([])
const [image, setImage] = useState({})

const fileOnChange = (e) => {
setImage(e.target.files[0]);
}

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

const sendImage = async (e) => {

const formData = new FormData();
formData.append("file", image);
try {
  const result = await axios.post("http://localhost:3000/file", formData);
  console.log(result);
 } catch (error) {
  console.log(error);
 }
}

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
                       
                            <span className="pe-4 nameFieldDesign">Title:</span>
                            <p>{artwork.title}</p>
                        
                            
                            <img src={`http://localhost:3000/static/${artwork.image_url}`} style={{ width: '20%', height: 'auto', objectFit: 'cover' }}  />
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
{/* 
          <input type='file' onChange={(event)=> {
            const file = event.target.files[0];
            postFile(file)
            console.log(file);
          }}/> */}


          <input type='file' onChange={fileOnChange} />
          <button onClick={sendImage}>Upload</button>
                </Col>
            </Row>
            <Row className="homeSection1">
                <Col>
                <p>Hello</p>
                </Col>
            </Row>
        </Container>


    )};