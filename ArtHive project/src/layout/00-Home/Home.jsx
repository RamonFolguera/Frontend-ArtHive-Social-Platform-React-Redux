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
  const [allArtworks, setAllArtworks] = useState([])
  const [topRatedArtworks, setTopRatedArtworks] = useState([])

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
          )

          //Taking only first 10 artworks
          const topRatedData = sortedByRating.slice(0, 10)
          setTopRatedArtworks(topRatedData)
        })
        .catch((error) => console.log(error))
    }
  }, [])

  // const artworkSelected = (artwork) => {
  //   dispatch(addChoosenArtwork({ choosenArtwork: artwork }))

  //   }
  //   setTimeout(() => {
  //     navigate('/artwork-details')
  //   }, 500)
  // }

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
                  <div className="d-flex align-items-end justify-content-end ">
                  <div className="d-flex align-items-end flex-column justify-content-end me-5">
                    <div>
                      <p className="randomArtworkTitle">{artwork.title}</p>
                    </div>
                    <div
                      type="button"
                      className="seeMoreHomeDesign text-center d-flex align-items-center justify-content-center"
                      onClick={() => artworkSelected(artwork)}
                    >
                      Click for more details
                    </div>
                    </div>
                    <div>
                      <img
                        className="selectedImgDesign"
                        src={`http://localhost:3000/static/${artwork.image_url}`}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </Col>
        </Row>
        <Row className="my-auto homeSection2">
          <Col lg={12} className="mt-5">
            <div>
              <h1 className="galleryTitleDesign text-center mt-5 mb-3">
                Top 10 Artworks Today
              </h1>
              <table className="ratingTop10Table">
                <thead >
                  <tr >
                    <th className="theadDesign m-5">ARTIST</th>
                    <th className="theadDesign m-5">NAME</th>

                    <th className="theadDesign m-5">TITLE</th>
                    <th className="theadDesign m-5">CATEGORY</th>
                    <th className="theadDesign m-5"></th>
                    <th className="theadDesign m-5">ARTWORK</th>
                  </tr>
                </thead>
                <tbody>
                  {topRatedArtworks.map((artwork) => (
                    <tr key={artwork.id}>
                      <td className="tdDesign"> <img
                          className="top10AvatarDesign"
                          src={`http://localhost:3000/static/${artwork.Artist.User.avatar}`}
                        /></td>
                      <td className="tdDesign">
                        {artwork.Artist.User.name}{' '}
                        {artwork.Artist.User.last_name}
                      </td>

                      <td className="tdDesign">{artwork.title}</td>
                      <td className="tdDesign">{artwork.category}</td>
                      <td ><p className="seeMoreHomeDesign d-flex align-items-center justify-content-center">Click for more details</p></td>

                      <td>
                        {' '}
                        <img
                          className="top10ImgDesign"
                          src={`http://localhost:3000/static/${artwork.image_url}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
      <FooterTemplate />
    </>
  )
}
