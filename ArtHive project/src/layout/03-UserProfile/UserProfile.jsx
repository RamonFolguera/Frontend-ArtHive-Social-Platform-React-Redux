import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { bringMyUserProfile } from '../../services/apiCalls'
import { userData } from '../userSlice'
import './UserProfile.css'
import { NavBar } from '../../components/Navbar/NavBar'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import  avatar from "../../assets/images/profile-picture-placeholder.png"

export const UserProfile = () => {
  const [user, setUser] = useState([])
  const [artistProfile, setArtistProfile] = useState([])

  const userCredentialsRdx = useSelector(userData)

  useEffect(() => {
    if (user.length === 0) {
      bringMyUserProfile(userCredentialsRdx.credentials.token)
        .then((result) => {
          setUser(result.data.data)
          // setArtistProfile(result.data.data.Artists[0]);
        })
        .catch((error) => console.log(error))
    }
  }, [user])

   if (userCredentialsRdx.credentials?.user?.roleId === 4) {
  return (
    <>
    <NavBar/>

    <Container className="profileMainDesign">

      <Row className="rowUserProfileDesign">
      <div className="text-center">
        <p className="nameDesign">
         Art Lover: {user.name} {user.last_name}{' '}
        </p>
      </div>
        <Col lg={8} >
      

      <div className="profileContainerDesign d-flex flex-wrap">
        <div className="profileDetailDesign d-flex">
          <div className="detailDesign me-5">Email:</div>
          <div className="fieldDesign">{user.email}</div>
        </div>

        <div className="profileDetailDesign d-flex">
          <div className="detailDesign me-5">Phone:</div>
          <div className="fieldDesign">{user.phone}</div>
        </div>

        <div className="profileDetailDesign d-flex">
          <div className="detailDesign me-5">City:</div>
          <div className="fieldDesign">{user.city}</div>
        </div>

        <div className="profileDetailDesign d-flex">
          <div className="detailDesign me-5">Country:</div>
          <div className="fieldDesign">{user.country}</div>
        </div>

      </div>
     
      </Col>
      <Col lg={4}>
        <div className="avatarPicContainer">
<img className="avatarPic" src={avatar} alt="" />
</div>
      </Col>
      <div className="goToUpdateProfileBtnContainer d-flex justify-content-center align-items-center">
              <Link
                className="goToUpdateProfileBtn pt-3 pb-3 ps-5 pe-5 justify-content-center d-flex align-items-center"
                to="/update-profile"
              >
                UPDATE MY DETAILS <BsFillArrowUpRightCircleFill className="bs ms-3 arrowDesign" />
              </Link>
            </div>
      </Row>
    </Container>
    </>
  )
 

} else if (userCredentialsRdx.credentials?.user?.roleId === 3) {
    return (
      <>
      <NavBar/>
  
      <Container className="profileMainDesign">
  
        <Row className="rowUserProfileDesign">
        <div className="text-center">
          <p className="nameDesign">
          Artist:  {user.name} {user.last_name}{' '}
          </p>
        </div>
          <Col lg={8} >
        
  
        <div className="profileContainerDesign d-flex flex-wrap">
          <div className="profileDetailDesign d-flex">
            <div className="detailDesign me-5">Email:</div>
            <div className="fieldDesign">{user.email}</div>
          </div>
  
          <div className="profileDetailDesign d-flex">
            <div className="detailDesign me-5">Phone:</div>
            <div className="fieldDesign">{user.phone}</div>
          </div>
  
          <div className="profileDetailDesign d-flex">
            <div className="detailDesign me-5">City:</div>
            <div className="fieldDesign">{user.city}</div>
          </div>
  
          <div className="profileDetailDesign d-flex">
            <div className="detailDesign me-5">Country:</div>
            <div className="fieldDesign">{user.country}</div>
          </div>
  
        </div>
       
        </Col>
        <Col lg={4}>
          <div className="avatarPicContainer">
  <img className="avatarPic" src={avatar} alt="" />
  </div>
        </Col>
        <div className="goToUpdateProfileBtnContainer d-flex justify-content-center align-items-center">
                <Link
                  className="goToUpdateProfileBtn pt-3 pb-3 ps-5 pe-5 justify-content-center d-flex align-items-center"
                  to="/update-profile"
                >
                  UPDATE MY DETAILS <BsFillArrowUpRightCircleFill className="bs ms-3 arrowDesign" />
                </Link>
              </div>
        </Row>
      </Container>
      </>
      )
} else {
    return (
      <>
      <NavBar/>
  
      <Container className="profileMainDesign">
  
        <Row className="rowUserProfileDesign">
        <div className="text-center">
          <p className="nameDesign">
            {user.name} {user.last_name}{' '}
          </p>
        </div>
          <Col lg={8} >
        
  
        <div className="profileContainerDesign d-flex flex-wrap">
          <div className="profileDetailDesign d-flex">
            <div className="detailDesign me-5">Email:</div>
            <div className="fieldDesign">{user.email}</div>
          </div>
  
          <div className="profileDetailDesign d-flex">
            <div className="detailDesign me-5">Phone:</div>
            <div className="fieldDesign">{user.phone}</div>
          </div>
  
          <div className="profileDetailDesign d-flex">
            <div className="detailDesign me-5">City:</div>
            <div className="fieldDesign">{user.city}</div>
          </div>
  
          <div className="profileDetailDesign d-flex">
            <div className="detailDesign me-5">Country:</div>
            <div className="fieldDesign">{user.country}</div>
          </div>
  
        </div>
       
        </Col>
        <Col lg={4}>
          <div className="avatarPicContainer">
  <img className="avatarPic" src={avatar} alt="" />
  </div>
        </Col>
        <div className="goToUpdateProfileBtnContainer d-flex justify-content-center align-items-center">
                <Link
                  className="goToUpdateProfileBtn pt-3 pb-3 ps-5 pe-5 justify-content-center d-flex align-items-center"
                  to="/update-profile"
                >
                  UPDATE MY DETAILS <BsFillArrowUpRightCircleFill className="bs ms-3 arrowDesign" />
                </Link>
              </div>
        </Row>
      </Container>
      </>
      )
}
}
