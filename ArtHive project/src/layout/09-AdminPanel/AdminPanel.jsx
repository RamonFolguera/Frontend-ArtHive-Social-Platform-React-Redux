import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { bringUsers } from '../../services/apiCalls'
import { userData } from '../userSlice'
import Spinner from 'react-bootstrap/Spinner'
import { addChoosenUser } from '../detailsSlice'

import './AdminPanel.css'

import { NavBar } from '../../components/Navbar/NavBar'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { bringAllArtworks } from '../../services/apiCalls'

export const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [artists, setArtists] = useState([]);
  const [artLovers, setArtLovers] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [totalArtworks, setTotalArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const credentialsRdx = useSelector(userData)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (users.length === 0) {
      setTimeout(() => {
        bringUsers(credentialsRdx.credentials.token)
          .then((result) => {
            setLoading(false)

            setUsers(result.data.data)

            let totalArtists = []
            result.data.data.map((user) => {
              if (user.role_id === 3) {
                (totalArtists.push(user)  )
      }})
              setArtists(totalArtists.length)

              let totalArtLovers = []
              result.data.data.map((user) => {
                if (user.role_id === 4) {
                  (totalArtLovers.push(user)  )
        }})
                setArtLovers(totalArtLovers.length)
          })
          .catch((error) => console.log(error))
      }, 2000)
    }
  }, [users])
 
  useEffect(() => {
    if (artworks.length === 0) {
      setTimeout(() => {
        bringAllArtworks()
          .then((result) => {
            setLoading(false)

            setArtworks(result.data.data)

              let totalArtworks = []
              result.data.data.map((artwork) => {
           
                  (totalArtworks.push(artwork)  )
        })
        setTotalArtworks(totalArtworks.length)
          })
          .catch((error) => console.log(error))
      }, 2000)
    }
  }, [artworks])


  const selected = (user) => {
    dispatch(addChoosenUser({ choosenUser: user }))

    setTimeout(() => {
      navigate('/user-profile-as-admin')
    }, 500)
  }

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="spinnerDesign d-flex justify-content-center align-items-center flex-column">
          <div>
            {' '}
            <Spinner animation="border" variant="primary" />
          </div>
          <div>
            {' '}
            <h4>Loading...</h4>
          </div>
        </div>
      </>
    )
  } else if (users.length > 0) {
    return (
      <>
        <NavBar />
        <Container>
          <Row>
            <Col lg={8}>

          <h2>Registered users list:</h2>

    <Table striped bordered hover size="lg">
      <thead>
        <tr>
          <th>ID</th>
          <th>Role</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
          <th>Country</th>
          <th>More details</th>
        
        </tr>
      </thead>
      <tbody>
      {users.map((user) => {
                      return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.role_id}</td>
                        <td>{user.name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.city}</td>
                        <td>{user.country}</td>
                        <td className="w-100 clickForMoreLink" type="button" onClick={() => selected(user)}>Click for more</td>
                      </tr>
                      )
                    })}
      
      </tbody>
    </Table>

        </Col>
        <Col lg={4}>

          <div className="totalArtistsDesign d-flex align-items-center justify-content-between">
            <p className="totalTitle">Total Artists registered:</p>
            <p className="totalNumber"> {artists}</p>
            </div>
          <div className="totalArtLoversDesign d-flex align-items-center justify-content-between"> <p className="totalTitle">Total Art Lovers registered:</p>
            <p className="totalNumber"> {artLovers}</p></div>
        
        </Col>
      </Row>
      <Row>
            <Col lg={8}>

          <h2>Registered Artworks list:</h2>
        
    <Table striped bordered hover size="lg">
      <thead>
        <tr>
          <th>ID</th>
          <th>Artist ID</th>
          <th>Title</th>
          <th>Category</th>
          <th>Description</th>
          <th>Technique</th>
          <th>Creation Date</th>
          <th>Status</th>
          <th>File Name</th>
          <th>Price</th>
        
        </tr>
      </thead>
      <tbody>
      {artworks.map((artwork) => {
                      return (
                      <tr key={artwork.id}>
                        <td>{artwork.id}</td>
                        <td>{artwork.artist_id}</td>
                        <td>{artwork.title}</td>
                        <td>{artwork.category}</td>
                        <td>{artwork.technique}</td>
                        <td>{artwork.dimensions}</td>
                        <td>{artwork.date_creation}</td>
                        <td>{artwork.status}</td>
                        <td>{artwork.image_url}</td>
                        <td>{artwork.price}</td>
                        <td className="w-100 clickForMoreLink" type="button" onClick={() => selected(artwork)}>Click for more</td>
                      </tr>
                      )
                    })}
      
      </tbody>
    </Table>

        </Col>
        <Col lg={4}>
          <div className="totalArtworksDesign d-flex align-items-center justify-content-between"> <p className="totalTitle">Total Artworks registered:</p>
            <p className="totalNumber"> {totalArtworks}</p></div>
        </Col>
      </Row>
      </Container>
      </>
    )
  } else {
    return <div>No registered user</div>
  }
}
