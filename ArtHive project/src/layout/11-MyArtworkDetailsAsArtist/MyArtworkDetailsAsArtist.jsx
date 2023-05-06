import React from 'react'
import { useNavigate } from 'react-router'
import { artworkData } from '../artworkSlice'
import { useSelector } from 'react-redux'
import { NavBar } from '../../components/Navbar/NavBar'
import { Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react'
import { SpinnerComponent } from '../../components/SpinnerComponent/SpinnerComponent'
import './MyArtworkDetailsAsArtist.css'
import {  bringAllUserArtworks } from '../../services/apiCalls'
import { userData } from '../userSlice'

import { Link } from 'react-router-dom'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { deleteMyArtwork } from '../../services/apiCalls'
import { useEffect } from 'react'

export const MyArtworkDetailsAsArtist = () => {
  const navigate = useNavigate()
  const userCredentialsRdx = useSelector(userData)
  const artworkSelectedRdx = useSelector(artworkData)
  const artworkSelectedObj = artworkSelectedRdx.choosenArtwork
  const params = artworkSelectedObj.id
  const [myUserArtwork, setMyUserArtwork] = useState([])
  const [allUserArtworks, setAllUserArtworks] = useState([])
  const [allUserArtworksSelected, setAllUserArtworksSelected] = useState([])
  const [loading, setLoading] = useState(true)
 
  const [averageRating, setAverageRating] = useState(null)

  let totalRating = 0

  const ratingSum = (res) => {
    for (let i = 0; i < res.length; i++) {
      if (res[i].rating !== null) {
        totalRating += res[i].rating
      }
    }
    return totalRating
  }

  useEffect(() => {
    if (allUserArtworks.length === 0) {
      setTimeout(() => {
        bringAllUserArtworks(userCredentialsRdx.credentials.token)
          .then((result) => {
            setLoading(false)
            if (result.data.data.length === 0) {
              return
            }
            setAllUserArtworks(result.data.data)
          })
          .catch((error) => console.log(error))
      }, 2000)
    }
  }, [])


useEffect(() => {
  if (allUserArtworks.length > 0) {
    /////////////// Getting all user_artworks registered for this selected artwork
    const selectedUserArtworks = allUserArtworks.filter((userArtwork) => {
      return (
        artworkSelectedObj.id === userArtwork.artwork_id 
      )
    })
    setAllUserArtworksSelected(selectedUserArtworks)
  }
  },[allUserArtworks])

  useEffect(() => {
    if (allUserArtworksSelected.length > 0) {
    /////////////// Getting my user_artwork registered for this selected artwork
    const myUserArtworkSelected = allUserArtworksSelected.find((userArtwork) => {
      return (
        userArtwork.user_id === userCredentialsRdx.credentials.user.userId
      )
    })

    if (!myUserArtworkSelected) {
      setMyUserArtwork([])
    } else {
      setMyUserArtwork(myUserArtworkSelected)
    }
  }
},[allUserArtworksSelected])
  
useEffect(() => {
    /////////////// Saving average rating
const ratingsNotNull = allUserArtworksSelected.filter((userArtwork) => {
return (
        userArtwork.rating !== null
)
})
if (ratingsNotNull.length > 0) {
let newTotalRating = ratingSum(ratingsNotNull)

let avgRating = Math.floor(newTotalRating / ratingsNotNull.length)
setAverageRating(avgRating)
} else {
setAverageRating(null)
}
}, [allUserArtworksSelected])


 
  const deleteArtwork = async () => {
 try {
    await deleteMyArtwork(params, userCredentialsRdx.credentials.token)
 }catch(error) {
    console.log(error)
 }
    
    setTimeout(() => {
        navigate('/my-artworks-gallery')
      }, 500)
  }

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="spinnerDesign d-flex justify-content-center align-items-center flex-column">
          <SpinnerComponent message="Art is coming... hold on!" />
        </div>
      </>
    )
  } else if (allUserArtworks.length > 0) {
    return (
      <>
        <NavBar />

        <Container fluid className="mainContainer">
          <h2 className="galleryTitleDesign text-center">My Artwork in Detail</h2>
          <Row className="d-flex justify-content-center">
            <Col lg={4} className="me-5">
              <div className="cardsContainer d-flex  ">
                <div className="artworkCardDetailsDesign d-flex flex-column justify-content-between">
                  <p className="pe-4 titleFieldDesign">
                    {artworkSelectedObj.title}
                  </p>
                  <p>{artworkSelectedObj.description}</p>
                  {/* <p>{artworkSelectedObj.Artist.artistic_name}</p> */}
                  <p>{artworkSelectedObj.category}</p>
                  <p>{artworkSelectedObj.technique}</p>
                  <p>{artworkSelectedObj.dimensions}</p>
                  <p>{artworkSelectedObj.price}</p>
                  <div className="goToUpdateProfileBtnContainer d-flex justify-content-center align-items-center">
              <Link
                className="detailsBtnDesign pt-3 pb-3 ps-5 pe-5 w-100 justify-content-center d-flex align-items-center"
                to="/update-profile"
              >
                UPDATE MY ARTWORK DETAILS <BsFillArrowUpRightCircleFill className="bs ms-3 arrowDesign" />
              </Link>
            </div>
            <div className="goToUpdateProfileBtnContainer d-flex justify-content-center align-items-center">
              <Link
                className="detailsBtnDesign pt-3 pb-3 ps-5 pe-5 w-100 justify-content-center d-flex align-items-center"
onClick = {() => {deleteArtwork()}}              >
                DELETE MY ARTWORK DETAILS 
              </Link>
            </div>
                </div>
              </div>
            </Col>
            <Col lg={4} className="ms-5">
              <div>
                <img
                  className="ImgDesign"
                  src={`http://localhost:3000/static/${artworkSelectedObj.image_url}`}
                />
              </div>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col lg={6}>
              <div className="commentsContainer">

                {allUserArtworks.map((userArtwork) => {
                  return (
                    <div
                      key={userArtwork.id}
                      className="d-flex justify-content-between"
                    >
                      <div
                        className={
                          (userArtwork.id === myUserArtwork.id &&  myUserArtwork.user_id === userCredentialsRdx.credentials.user.userId && userArtwork.comment !== null)
                          ? 'commentLine userComment m-0 w-100' :
                          (userArtwork.artwork_id === artworkSelectedObj.id && userArtwork.comment !== null )  
                          ? 'commentLine m-0 w-100'
                          : 'm-0 w-100'
                        }
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="m-0">{
                          (userArtwork.artwork_id === artworkSelectedObj.id && userArtwork.comment !== null) 
                          ? userArtwork.comment 
                          : <div></div>
                          }</div>
                        </div>
                      </div>
                      
                    </div>
                  )
                })}
              </div>
            </Col>
            <Col lg={2}>
              <div className="ratingContainer d-flex justify-content-center flex-column align-items-center">
                <div>
                  {averageRating === null ?  <p className="ratingStyle">0</p> :   <p className="ratingStyle">{averageRating}</p>}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
