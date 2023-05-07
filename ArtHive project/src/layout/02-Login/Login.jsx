import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { bringAllArtworks, logMe } from '../../services/apiCalls'
import './Login.css'

import { useDispatch, useSelector } from 'react-redux'
import { login, userData } from '../userSlice'

import { decodeToken } from 'react-jwt'
import { InputText } from '../../components/InputText/InputText'
import { Col, Container, Row } from 'react-bootstrap'
import { ModalTemplate } from '../../components/ModalTemplate/ModalTemplate'
import { validate } from '../../helpers/useful'

export const Login = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const credentialsRdx = useSelector(userData)
  const [loginAct, setLoginAct] = useState(false)

  const [allArtworks, setAllArtworks] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

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

  const [valiCredentials, setValiCredentials] = useState({
    emailVali: '',
    passwordVali: '',
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

  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  useEffect(() => {
    for (let error in credentialsError) {
      if (credentialsError[error] != '') {
        setLoginAct(false)
        return
      }
    }

    for (let empty in credentials) {
      if (credentials[empty] === '') {
        setLoginAct(false)
        return
      }
    }

    for (let validated in valiCredentials) {
      if (valiCredentials[validated] === false) {
        setLoginAct(false)
        return
      }
    }
    setLoginAct(true)
  })
  const checkError = (e) => {
    let error = ''

    let checked = validate(e.target.name, e.target.value, e.target.required)

    error = checked.message

    setValiCredentials((prevState) => ({
      ...prevState,
      [e.target.name + 'Vali']: checked.validated,
    }))

    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }))
  }

  const loginFunction = () => {
    logMe(credentials)
      .then((userData) => {
        let decoded = decodeToken(userData.data.data)
        let dataBackend = {
          token: userData.data.data,
          user: decoded,
        }
        if (!dataBackend.user.status) {
          console.log('status false')
          handleShowModal()
          throw new Error('User is not registered')
        }

        dispatch(login({ credentials: dataBackend }))

        setWelcome(`Welcome back ${dataBackend.user.name}`)

        setTimeout(() => {
          navigate('/')
        }, 3000)
      })
      .catch((error) => console.log(error))
  }

  const goToSignUp = () =>{
    setTimeout(() => {
      navigate('/register')
    }, 500)
  }

  return (
    <>
      <Container fluid className="main-container">
        <Row>
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

          <Col
            lg={6}
            className="formCol d-flex justify-content-center ps-lg-5 pb-lg-5 justify-content-lg-start align-items-start align-items-lg-center"
          >
            <>
              {showModal && (
                <div className="modalContainer">
                  <ModalTemplate
                    key="loginModal"
                    className="loginModalDesign"
                    title="User not found"
                    body="Please, register or send an email to admin@admin.com to recover your account if you have previously registered."
                    button1="Close"
                    button2="Sign up"
                    clickFunction1={() => handleCloseModal()}
                    clickFunction2={() => goToSignUp()}
                  />
                </div>
              )}

              {welcome === '' ? (
                <>
                  <div className="loginFormBody">
                    <h1 className="greetingMsgDesign">Time To Get Inspired!</h1>

                    <div className="loginFormContainer">
                      <div className="ps-3">EMAIL</div>
                      <InputText
                        className={
                          credentialsError.emailError === ''
                            ? 'ps-3 inputDesign w-100'
                            : 'ps-3 inputDesign inputErrorDesign w-100'
                        }
                        type="email"
                        name="email"
                        placeholder="e.g. artist@gmail.com"
                        changeFunction={(e) => inputHandler(e)}
                        blurFunction={(e) => checkError(e)}
                      />
                      <div className="errorMessage">
                        {credentialsError.emailError}
                      </div>
                      <div className="ps-3 mt-4 ">PASSWORD</div>

                      <InputText
                        className={
                          credentialsError.passwordError === ''
                            ? 'ps-3 inputDesign w-100'
                            : 'ps-3 inputDesign inputErrorDesign w-100'
                        }
                        type="password"
                        name="password"
                        placeholder="e.g. Password_123"
                        changeFunction={(e) => inputHandler(e)}
                        blurFunction={(e) => checkError(e)}
                      />
                      <div className="errorMessage">
                        {credentialsError.passwordError}
                      </div>
                      <div className="d-flex justify-content-center flex-column">
                        <div
                          type="button"
                          className={
                            loginAct
                              ? 'mt-3 buttonDesign  d-flex justify-content-center align-items-center'
                              : 'mt-3 buttonDesign notActBtn d-flex justify-content-center align-items-center'
                          }
                          onClick={
                            loginAct
                              ? () => {
                                  loginFunction()
                                  ;<div className="d-flex justify-content-center align-items-center welcomeMsgContainerDesign">
                                    <h1 className="welcomeMsgDesign">
                                      {welcome}
                                    </h1>
                                  </div>
                                }
                              : () => {}
                          }
                        >
                          Sign in
                        </div>
                        <Link
                          type="button"
                          className='mt-3 buttonDesign d-flex justify-content-center align-items-center'
                          to="/"
                        >
                          Back Home
                        </Link>
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
