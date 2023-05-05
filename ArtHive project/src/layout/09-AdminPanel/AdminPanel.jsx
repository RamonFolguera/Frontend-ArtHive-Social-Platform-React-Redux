import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { bringUsers, updateUsersStatus } from '../../services/apiCalls'
import { userData } from '../userSlice'
import Spinner from 'react-bootstrap/Spinner'
import { addChoosenUser } from '../detailsSlice'

import './AdminPanel.css'

import { Col, Container, Row, Table } from 'react-bootstrap'
import { bringAllArtworks } from '../../services/apiCalls'

export const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [artists, setArtists] = useState([]);
  const [artLovers, setArtLovers] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [totalArtworks, setTotalArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [totalDeletedUsers, setTotalDeletedUsers] = useState([]);

  const userCredentialsRdx = useSelector(userData);
  const token = userCredentialsRdx.credentials.token;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (users.length === 0) {
      setTimeout(() => {
        bringUsers(token)
          .then((result) => {
            setLoading(false)
            //We want to save in users only the ones with status === true
            const statusUsers = (res) => {
              let totalStatusTrueUsers = []
              let totalStatusFalseUsers = []
              
              for (let i = 0; i < res.length; i++) {
                if (res[i].status === true) {
                  totalStatusTrueUsers.push(res[i])
                } else {
                  totalStatusFalseUsers.push(res[i])
                }
              }
            
              return {
                statusTrue: totalStatusTrueUsers,
                statusFalse: totalStatusFalseUsers
              }
            }

            const { statusTrue, statusFalse } = statusUsers(result.data.data)
            setUsers(statusTrue)
            setDeletedUsers(statusFalse)

          setTotalDeletedUsers(statusFalse.length)

            let totalArtists = []
            result.data.data.map((user) => {
              if (user.role_id === 3 && user.status === true) {
                (totalArtists.push(user)  )
      }})
              setArtists(totalArtists.length)

              let totalArtLovers = []
              result.data.data.map((user) => {
                if (user.role_id === 4 && user.status === true) {
                  (totalArtLovers.push(user)  )
        }})
                setArtLovers(totalArtLovers.length)
          })
          .catch((error) => console.log(error))
      }, 2000)
    }
  }, [users])


console.log(users);
console.log(deletedUsers);

 
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
      navigate('/user-details')
    }, 500)
  }

  const deleteSelected = (user) => {
    updateUsersStatus(user.id, {status: false},token )
    .then(() => {
      setUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser.id !== user.id));
      setDeletedUsers((prevDeletedUsers) => [...prevDeletedUsers, user]);
    })
   
    .catch((error) => {
      console.log(error);
    });
  }

  const restoreSelected = (deletedUser) => {
    updateUsersStatus(deletedUser.id, {status: true},token )
      .then(() => {
        setDeletedUsers((prevDeletedUsers) => prevDeletedUsers.filter((user) => user.id !== deletedUser.id));
        setUsers((prevUsers) => [...prevUsers, deletedUser]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (loading) {
    return (
      
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
    )
  } else if (users.length > 0) {
    return (
        <Container>
          <Row>
            <Col lg={9}>
            <div className="usersTableDesign mt-3">

          <h2>Registered users list:</h2>
    <Table  striped bordered hover size="lg">
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
          <th>Actions</th>
        
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
        <td>
          <div>
            <button className="me-3" onClick={() => selected(user)}>UPDATE</button>
            <button onClick={() => deleteSelected(user)}>DELETE</button>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>

    </Table>
    </div>
    <div className="deletedTableDesign mt-3">

<h2>Deleted users list:</h2>
<Table  striped bordered hover size="lg">
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
<th>Actions</th>

</tr>
</thead>
{deletedUsers.length > 0 && (
<tbody>
{deletedUsers.map((deletedUser) => {
return (

<tr key={deletedUser.id}>
<td>{deletedUser.id}</td>
<td>{deletedUser.role_id}</td>
<td>{deletedUser.name}</td>
<td>{deletedUser.last_name}</td>
<td>{deletedUser.email}</td>
<td>{deletedUser.phone}</td>
<td>{deletedUser.city}</td>
<td>{deletedUser.country}</td>
<td>
  <button onClick={() => restoreSelected(deletedUser)}>RESTORE</button>
</td>
</tr>
);
})}
</tbody>
)}

</Table>
</div>
        </Col>
        <Col lg={3}>

          <div className="totalArtistsDesign d-flex align-items-center justify-content-between">
            <p className="totalTitle">Total Artists registered:</p>
            <p className="totalNumber"> {artists}</p>
            </div>
          <div className="totalArtLoversDesign d-flex align-items-center justify-content-between"> 
          <p className="totalTitle">Total Art Lovers registered:</p>
            <p className="totalNumber"> {artLovers}</p></div>
            <div className="totalDeletedUsersDesign d-flex align-items-center justify-content-between"> 
          <p className="totalTitle">Total Deleted Users:</p>
            <p className="totalNumber"> {totalDeletedUsers}</p></div>
        </Col>
      </Row>
      <Row>
            <Col lg={9}>
            <div className="artworksTableDesign mt-3">

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
                       
                      </tr>
                      )
                    })}
      
      </tbody>
    </Table>
</div>
        </Col>
        <Col lg={3}>
          <div className="totalArtworksDesign d-flex align-items-center justify-content-between"> <p className="totalTitle">Total Artworks registered:</p>
            <p className="totalNumber"> {totalArtworks}</p></div>
        </Col>
      </Row>
      <Row>
            <Col lg={9}>
        
    
        </Col>
        </Row>

      </Container>
    )
  } else {
    return (
   
    
    
    <div>No registered user</div>
   )
  }
}
