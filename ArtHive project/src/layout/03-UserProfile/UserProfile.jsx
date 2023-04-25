import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { bringMyUserProfile } from '../../services/apiCalls'
import { userData } from '../userSlice'
import './UserProfile.css'

export const UserProfile = () => {
  const [user, setUser] = useState([])
  const [artistProfile, setArtistProfile] = useState([])

  const userCredentialsRdx = useSelector(userData)

  useEffect(() => {
    if (user.length === 0) {
      bringMyUserProfile(userCredentialsRdx.credentials.token)
        .then((result) => {
          setUser(result.data.data)
          setArtistProfile(result.data.data.Artists[0]);
        })
        .catch((error) => console.log(error))
    }
  }, [user])


  if (userCredentialsRdx.credentials.user.roleId === 4) {
  return (
    <Container className="profileMainDesign">
      <div className="text-center">
        <p className="nameDesign">
          {user.name} {user.last_name}{' '}
        </p>
      </div>

      <div className="profileContainerDesign">
        <div className="profileDetailDesign">
          <div className="detailDesign">Email:</div>
          <div className="fieldDesign">{user.email}</div>
        </div>

        <div className="profileDetailDesign">
          <div className="detailDesign">Phone:</div>
          <div className="fieldDesign">{user.phone}</div>
        </div>

        <div className="profileDetailDesign">
          <div className="detailDesign">City:</div>
          <div className="fieldDesign">{user.city}</div>
        </div>

        <div className="profileDetailDesign">
          <div className="detailDesign">Country:</div>
          <div className="fieldDesign">{user.country}</div>
        </div>

        <div className="profileDetailDesign">
          <div className="detailDesign">Birth date:</div>
          <div className="fieldDesign">{user.birth_date}</div>
        </div>

      </div>
      <div className="buttonContainerDesign d-flex justify-content-center">
        <Link className="buttonUpdateDesign" to="/update-user-as-client">
          Update your profile
        </Link>
      </div>
    </Container>
  )

} else if (userCredentialsRdx.credentials.user.roleId === 3) {
    return (
        <Container className="profileMainDesign">
          <div className="text-center">
            <p className="nameDesign">
              {user.name} {user.last_name}{' '}
            </p>
          </div>
    
          <div className="profileContainerDesign">
            <div className="profileDetailDesign">
              <div className="detailDesign">Email:</div>
              <div className="fieldDesign">{user.email}</div>
            </div>
    
            <div className="profileDetailDesign">
              <div className="detailDesign">Phone:</div>
              <div className="fieldDesign">{user.phone}</div>
            </div>
    
            <div className="profileDetailDesign">
              <div className="detailDesign">City:</div>
              <div className="fieldDesign">{user.city}</div>
            </div>
    
            <div className="profileDetailDesign">
              <div className="detailDesign">Country:</div>
              <div className="fieldDesign">{user.country}</div>
            </div>
    
            <div className="profileDetailDesign">
              <div className="detailDesign">Birth date:</div>
              <div className="fieldDesign">{user.birth_date}</div>
            </div>

            
        <div className="profileDetailDesign">
          <div className="detailDesign">Artistic Name:</div>
          <div className="fieldDesign">{artistProfile.artistic_name}</div>
        </div>

        <div className="profileDetailDesign">
          <div className="detailDesign">About me:</div>
          <div className="fieldDesign">{artistProfile.about_me}</div>
        </div>

        <div className="profileDetailDesign">
          <div className="detailDesign">My personal site:</div>
          <div className="fieldDesign">{artistProfile.personal_web}</div>
        </div>

        <div className="profileDetailDesign">
          <div className="detailDesign">My social links:</div>
          <div className="fieldDesign">{artistProfile.social_media_links}</div>
        </div>
    
          </div>
          <div className="buttonContainerDesign d-flex justify-content-center">
            <Link className="buttonUpdateDesign" to="/update-user-as-client">
              Update your profile
            </Link>
          </div>
        </Container>
      )
} else {
    return (
        <Container className="profileMainDesign">
          <div className="text-center">
            <p className="nameDesign">
              {user.name} {user.last_name}{' '}
            </p>
          </div>
    
          <div className="profileContainerDesign">
            <div className="profileDetailDesign">
              <div className="detailDesign">Email:</div>
              <div className="fieldDesign">{user.email}</div>
            </div>
    
            <div className="profileDetailDesign">
              <div className="detailDesign">Phone:</div>
              <div className="fieldDesign">{user.phone}</div>
            </div>
    
            <div className="profileDetailDesign">
              <div className="detailDesign">City:</div>
              <div className="fieldDesign">{user.city}</div>
            </div>
    
            <div className="profileDetailDesign">
              <div className="detailDesign">Country:</div>
              <div className="fieldDesign">{user.country}</div>
            </div>
    
            <div className="profileDetailDesign">
              <div className="detailDesign">Birth date:</div>
              <div className="fieldDesign">{user.birth_date}</div>
            </div>
    
          </div>
          <div className="buttonContainerDesign d-flex justify-content-center">
            <Link className="buttonUpdateDesign" to="/update-user-as-client">
              Update your profile
            </Link>
          </div>
        </Container>
      )
}
}
