import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Home.css'
import { bringAllArtworks } from '../../services/apiCalls'
import { NavBar } from '../../components/Navbar/NavBar'
import community from '../../assets/images/community.png'
import { Link } from 'react-router-dom'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { FooterTemplate } from '../../components/FooterTemplate/FooterTemplate'

export const Home = () => {
  const [allArtworks, setAllArtworks] = useState([]);
  const [topRatedArtworks, setTopRatedArtworks] = useState([]);

  useEffect(() => {
    if (allArtworks.length === 0) {
      bringAllArtworks()
        .then((result) => {
          if (result.data.data.length === 0) {
            return
          }
          const randomArtwork =
            result.data.data[
              Math.floor(Math.random() * result.data.data.length)
            ]
          setAllArtworks([randomArtwork])

          //Sorting artwors from higher rating to lower
          const sortedByRating = result.data.data.sort(
            (a, b) => b.rating - a.rating
          );

          //Taking only first 10 artworks
          const topRatedData = sortedByRating.slice(0, 10);
          setTopRatedArtworks(topRatedData);

        })
        .catch((error) => console.log(error))
    }
  }, [])


  return (
    <>
      <NavBar />
      <Container className="defaultPageHeight">
        <Row className="my-auto homeSection1">
          <Col lg={6}>
            <p className="titleDesign">
              Discover limitless creativity everyday
            </p>
            <div className="d-flex justify-content-start align-items-end">
              <img
                src={community}
                alt="Several users profile pictures"
                style={{ width: 'auto', height: '5em', objectFit: 'contain' }}
              />
              <p className="joinTitleDesign d-flex align-items-center ms-4">
                JOIN OUR 150K+ COMMUNITY OF TALENTED ARTISTS
              </p>
            </div>

            <div className="buttonGoToRegisterContainerDesign d-flex justify-content-start">
              <Link
                className="buttonGoToRegisterDesign pt-3 pb-3 ps-5 pe-5"
                to="/register"
              >
                GET STARTED <BsFillArrowUpRightCircleFill className="bs" />
              </Link>
            </div>
          </Col>

          <Col lg={6} className="selectedImgCol">
            {allArtworks.map((artwork) => {
              return (
                <div key={artwork.id}>
                  <div className="d-flex align-items-end justify-content-between">
                    <span className="pe-4 nameFieldDesign">Title:</span>
                    <p>{artwork.title}</p>

                    <img
                      className="selectedImgDesign"
                      src={`http://localhost:3000/static/${artwork.image_url}`}
                    />
                  </div>
                </div>
              )
            })}
          </Col>
        </Row>
        <Row className="my-auto homeSection2">
<Col lg={12} className="mt-5">
<div >
      <h1>Top 10 Artworks by Rating</h1>
      <table className="ratingTop10Table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {topRatedArtworks.map((artwork) => (
            <tr key={artwork.id}>
              <td className="tdDesign">{artwork.title}</td>
              <td>{artwork.category}</td>
              <td>{artwork.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</Col>




        </Row>
      </Container>
      <FooterTemplate/>
    </>
  )
}
