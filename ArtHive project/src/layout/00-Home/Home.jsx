import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import './Home.css'
import { bringAllArtworks } from "../../services/apiCalls";
import { NavBar } from "../../components/Navbar/NavBar";
import community from "../../assets/images/community.png"

export const Home = () => {

const [allArtworks, setAllArtworks] = useState([]);
const [image, setImage] = useState({});

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
      <>
        <NavBar/>
        <Container className="m-0">
            <Row className="homeSection1">
              <Col lg={8} className="ps-5">
              <p className="titleDesign">Discover limitless creativity everyday</p>
              <div className="d-flex justify-content-start align-items-end">
                <img src={community} alt="Several users profile pictures" style={{ width: 'auto', height: '5em', objectFit: 'contain' }} />
                <p className="joinTitleDesign d-flex align-items-center ms-4">JOIN OUR 150K+ COMMUNITY OF TALENTED ARTISTS</p>
              </div>
              </Col>

            <Col lg={4} >
          
                {allArtworks.map((artwork) => {
                    return (
                    <div key={artwork.id}>
                        <div className="d-flex align-items-end justify-content-between">
                       
                            <span className="pe-4 nameFieldDesign">Title:</span>
                            <p>{artwork.title}</p>
                        
                            
                            <img className="selectedImgDesign" src={`http://localhost:3000/static/${artwork.image_url}`}/>
                        </div>
                    </div>
            );
          })}
     
                </Col>
                
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
        </>

    )};