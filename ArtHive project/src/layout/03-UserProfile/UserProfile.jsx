import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { bringMyUserProfile } from '../../services/apiCalls'
import { userData } from '../userSlice'
import './UserProfile.css'
import { NavBar } from '../../components/NavBar/NavBar'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import avatar from '../../assets/images/profile-picture-placeholder.png'
import { FooterTemplate } from '../../components/FooterTemplate/FooterTemplate'

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
console.log(user);
  if (userCredentialsRdx.credentials?.user?.roleId === 4) {
    return (
      <>
        <NavBar />

        <Container className="profileMainDesign">
          <Row className="rowUserProfileDesign d-flex justify-content-center ">
            <div className="text-center">
              <p className="nameDesign">
                Art Lover: {user.name} {user.last_name}{' '}
              </p>
            </div>
            <Col xs={10} lg={4}>
              <div className="avatarPicContainer mt-5 mb-5">
                <img
                  className="avatarPic"
                  src={`http://localhost:3000/static/${user.avatar}`}
                />
              </div>
            </Col>
            <Col xs={12} lg={4} className="d-flex justify-content-center me-lg-5">
              <div className="profileContainerDesign d-flex justify-content-center flex-column">
                <div className="profileDetailDesign d-flex justify-content-between flex-column flex-lg-row ps-5 pe-5">
                  <div className="detailDesign me-5">EMAIL:</div>
                  <div className="fieldDesign">{user.email}</div>
                </div>

                <div className="profileDetailDesign d-flex justify-content-between ps-5 pe-5 flex-column flex-lg-row">
                  <div className="detailDesign  me-5">PHONE:</div>
                  <div className="fieldDesign">{user.phone}</div>
                </div>

                <div className="profileDetailDesign d-flex justify-content-between ps-5 pe-5 flex-column flex-lg-row">
                  <div className="detailDesign me-5">CITY:</div>
                  <div className="fieldDesign">{user.city}</div>
                </div>

                <div className="profileDetailDesign d-flex justify-content-between ps-5 pe-5 flex-column flex-lg-row">
                  <div className="detailDesign me-5">COUNTRY:</div>
                  <div className="fieldDesign">{user.country}</div>
                </div>

                <div className="goToUpdateProfileBtnContainer d-flex justify-content-center align-items-center mb-5">
              <Link
                className="goToUpdateProfileBtn pt-3 pb-3 ps-5 pe-5 justify-content-center d-flex align-items-center"
                to="/update-profile"
              >
                UPDATE MY DETAILS{' '}
                <BsFillArrowUpRightCircleFill className="bs ms-3 arrowDesign" />
              </Link>
            </div>
              </div>
              
            </Col>
           
          </Row>
        </Container>
        <FooterTemplate/>

      </>
    )
  } else if (userCredentialsRdx.credentials?.user?.roleId === 3) {
    return (
      <>
      <NavBar />
      <Container className="profileMainDesign">
          <Row className="rowUserProfileDesign d-flex justify-content-center ">
            <div className="text-center">
              <p className="nameDesign">
               Artist: {user.name} {user.last_name}{' '}
              </p>
            </div>
            <Col xs={10} lg={10} >
              <div className="avatarPicContainer mt-5 d-flex justify-content-center">
                <img
                  className="avatarPic"
                  src={`http://localhost:3000/static/${user.avatar}`}
                />
              </div>
            </Col>
            <Col xs={12} lg={10} className="d-flex justify-content-center align-items-center  me-lg-5 mt-5">
              <div className="profileContainerDesign d-flex justify-content-center  align-items-center flex-column">
                <div className="profileDetailDesign d-flex justify-content-between flex-column flex-lg-row ps-5 pe-5">
                  <div className="detailDesign me-5">EMAIL:</div>
                  <div className="fieldDesign">{user.email}</div>
                </div>

                <div className="profileDetailDesign d-flex justify-content-between ps-5 pe-5 flex-column flex-lg-row">
                  <div className="detailDesign  me-5">PHONE:</div>
                  <div className="fieldDesign">{user.phone}</div>
                </div>

                <div className="profileDetailDesign d-flex justify-content-between ps-5 pe-5 flex-column flex-lg-row">
                  <div className="detailDesign me-5">CITY:</div>
                  <div className="fieldDesign">{user.city}</div>
                </div>

                <div className="profileDetailDesign d-flex justify-content-between ps-5 pe-5 flex-column flex-lg-row">
                  <div className="detailDesign me-5">COUNTRY:</div>
                  <div className="fieldDesign">{user.country}</div>
                </div>
                {user && user.Artists && user.Artists.length > 0 && (
                  <>
                <div className="profileDetailDesign d-flex justify-content-between ps-5 pe-5 flex-column flex-lg-row">
                  <div className="detailDesign me-5">ARTISTIC NAME:</div>
                  <div className="fieldDesign">{user.Artists[0].artistic_name}</div>
                </div>

                <div className="profileDetailDesign d-flex justify-content-between ps-5 pe-5 flex-column flex-lg-row">
                  <div className="detailDesign me-5">ABOUT ME:</div>
                  <div className="fieldDesign">{user.Artists[0].about_me}</div>
                </div>

                <div className="profileDetailDesign d-flex justify-content-between ps-5 pe-5 flex-column flex-lg-row">
                  <div className="detailDesign me-5">PERSONAL WEB:</div>
                  <a href="https://github.com/RamonFolguera" className="fieldDesign personalWeb">{user.Artists[0].personal_web}</a>
                </div>
              
                <div className="profileDetailDesign d-flex justify-content-between ps-5 pe-5 flex-column flex-lg-row">
                  <div className="detailDesign me-5">SOCIAL MEDIA:</div>
                  <a href=" https://www.linkedin.com/in/ram%C3%B3n-folguera-0ab32776/" className="fieldDesign socialMedia">{user.Artists[0].social_media_links}</a>
                </div>
                </> )}

                <div className="goToUpdateProfileBtnContainer d-flex justify-content-center align-items-center mb-5">
              <Link
                className="goToUpdateProfileBtn pt-3 pb-3 ps-5 pe-5 justify-content-center d-flex align-items-center"
                to="/update-profile"
              >
                UPDATE MY DETAILS{' '}
                <BsFillArrowUpRightCircleFill className="bs ms-3 arrowDesign" />
              </Link>
            </div>
              </div>
              
            </Col>
           
           
          </Row>
        </Container>
        <FooterTemplate/>

      </>
    )
  } else {
    return (
      <>
        <NavBar />

        <Container className="profileMainDesign">
          <Row className="rowUserProfileDesign">
            <div className="text-center">
              <p className="nameDesign">
                {user.name} {user.last_name}{' '}
              </p>
            </div>
            <Col lg={8}>
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
                UPDATE MY DETAILS{' '}
                <BsFillArrowUpRightCircleFill className="bs ms-3 arrowDesign" />
              </Link>
            </div>
          </Row>
        </Container>
        <FooterTemplate/>
      </>
    )
  }
}
