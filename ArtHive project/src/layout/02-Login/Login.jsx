import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { bringAllArtworks, logMe } from '../../services/apiCalls'
import './Login.css'

import { useDispatch, useSelector } from 'react-redux'
import { login, userData } from '../userSlice'

import { decodeToken } from 'react-jwt'
import { InputText } from '../../components/InputText/InputText'
import { NavBar } from '../../components/Navbar/NavBar'
import { Col, Container, Row } from 'react-bootstrap'

export const Login = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch() //Instanciamos modo escritura Redux
  const credentialsRdx = useSelector(userData) //Instanciamos modo lecutura Redux
   console.log(credentialsRdx);
  const [allArtworks, setAllArtworks] = useState([])

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
        })
        .catch((error) => console.log(error))
    }
  }, [])

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const [credentialsError, setCredentialsError] = useState({
    emailError: '',
    passwordError: '',
  })

  const [welcome, setWelcome] = useState('')

  useEffect(() => {
    if (credentialsRdx.credentials.token) {
      navigate('/')
    }
  }, [])

  const inputHandler = ({ target }) => {
    const { name, value } = target
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const checkError = (e) => {
    switch (e.target.name) {
      case 'email':
        break

      case 'password':
        if (credentials.password.length < 6) {
          setCredentialsError((prevState) => ({
            ...prevState,
            passwordError:
              'You must enter a password with minimum 6 characters',
          }))
        } else {
          setCredentialsError((prevState) => ({
            ...prevState,
            passwordError: '',
          }))
        }
        break

      default:
        console.log('default')
    }
  }

  const loginFunction = () => {
    logMe(credentials)
      .then((userData) => {
        let decoded = decodeToken(userData.data.data)
        let dataBackend = {
          token: userData.data.data,
          user: decoded,
        }

        dispatch(login({ credentials: dataBackend }))

        setWelcome(`Welcome back ${dataBackend.user.name}`)

        setTimeout(() => {
          navigate('/')
        }, 3000)
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <Container fluid className="main-container">
        <Row >
          <Col lg={6} className="p-0 m-0 selectedImgCol">
            {allArtworks.map((artwork) => {
              return (
                <div key={artwork.id}>
                  <div>
                    <img
                      className="selectedImgLoginDesign"
                      src={`http://localhost:3000/static/${artwork.image_url}`}
                    />
                  </div>
                </div>
              )
            })}
          </Col>


          <Col lg={6} className="formCol d-flex justify-content-center ps-lg-5 pb-lg-5 justify-content-lg-start align-items-start align-items-lg-center">
            <>
              {welcome === '' ? (
                <>
                  <div className="loginFormBody">
                    <h1 className="greetingMsgDesign">Time To Get Inspired!</h1>

                    <div className="loginFormContainer">
                      <div className="ps-3">EMAIL</div>
                      <InputText
                        className="ps-3 inputLoginDesign"
                        type="email"
                        name="email"
                        placeholder="e.g. artist@gmail.com"
                        changeFunction={(e) => inputHandler(e)}
                        blurFunction={(e) => checkError(e)}

                      />
                      <div>{credentialsError.emailError}</div>
                      <div className="ps-3 mt-4 ">PASSWORD</div>

                      <InputText
                         className="ps-3 inputLoginDesign"
                        type="password"
                        name="password"
                        placeholder="e.g. password_123"
                        changeFunction={(e) => inputHandler(e)}
                        blurFunction={(e) => checkError(e)}

                      />
                      <div>{credentialsError.passwordError}</div>
                      <div className="d-flex justify-content-center">
                        <div
                        type="button" 
                          className="mt-5 buttonDesign d-flex justify-content-center align-items-center"
                          onClick={() => loginFunction()}
                        >
                          Sign in
                        </div>
                      </div>
                      <Link to="/register">Don't have an account?</Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className="d-flex justify-content-center align-items-center welcomeMsgContainerDesign">
                  <h1 className="welcomeMsgDesign">{welcome}</h1>
                </div>
              )}
            </>
          </Col>
        </Row>
      </Container>
    </>
  )
}
