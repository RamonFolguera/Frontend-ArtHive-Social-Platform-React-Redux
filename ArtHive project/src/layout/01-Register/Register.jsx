import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { InputText } from '../../components/InputText/InputText'
import './Register.css'
import { bringAllArtworks, registerUser } from '../../services/apiCalls'
import { validate } from '../../helpers/useful'
import { MdCloudUpload } from 'react-icons/md'

export const Register = () => {
  const navigate = useNavigate()

  const [allArtworks, setAllArtworks] = useState([])
  const [confirmedCredential, setConfirmedCredential] = useState({
    confirm_password: '',
  })

  const [roles, setRoles] = useState([
    {
      id: 3,
      name: 'Art lover',
    },
    {
      id: 4,
      name: 'Artist',
    },
  ])

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
    name: '',
    last_name: '',
    email: '',
    password: '',
    role_id: '',
    phone: '',
    // avatar: '',
    city: '',
    country: '',
  })

  const inputHandlerConfirmPassword = (e) => {
    setConfirmedCredential((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const [valiCredentials, setValiCredentials] = useState({
    nameVali: false,
    last_nameVali: false,
    emailVali: false,
    passwordVali: false,
    phoneVali: false,
    // avatarVali: false,
    cityVali: false,
    countryVali: false,
  })

  const [credentialsError, setCredentialsError] = useState({
    nameError: '',
    last_nameError: '',
    emailError: '',
    passwordError: '',
    phoneError: '',
    // avatarError: '',
    cityError: '',
    countryError: '',
  })
  console.log(credentials)
  console.log(confirmedCredential)
  const [registerAct, setRegisterAct] = useState(false)

  const [welcome, setWelcome] = useState('')

  useEffect(() => {
    for (let error in credentialsError) {
      if (credentialsError[error] != '') {
        setRegisterAct(false)
        return
      }
    }

    for (let empty in credentials) {
      if (credentials[empty] === '') {
        setRegisterAct(false)
        return
      }
    }

    for (let validated in valiCredentials) {
      if (valiCredentials[validated] === false) {
        setRegisterAct(false)
        return
      }
    }

    if ((credentials.password === confirmedCredential.confirm_password) && credentials.role_id !== '') {
      setRegisterAct(true)
    } else {
      setRegisterAct(false)
    }
  })
  console.log(credentials.password === confirmedCredential.confirm_password)
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

  const userRegister = () => {
    registerUser(credentials)

    setWelcome(`Welcome to ArtHive. Be creative! `)
    setTimeout(() => {
      navigate('/')
    }, 500)
  }

  return (
    <div className="d-flex justify-content-center defaultPageHeight">
      {welcome === '' ? (
        <Container fluid className="register-container">
          <Row className="mb-3 w-100">
            <Col
              lg={6}
              className="registerFormBody pb-lg-5 justify-content-lg-center"
              id="formGridName"
            >
              <h1 className="greetingRegisterMsgDesign text-center">
                Start your Art Journey
              </h1>

              <div className="d-flex justify-content-between">
                <div>
                  <p className="mb-0 mt-3">NAME</p>
                  <InputText
                    className={
                      credentialsError.nameError === ''
                        ? 'inputsDesignCommon inputDesign w-100'
                        : 'inputsDesignCommon inputDesign inputErrorDesign w-100'
                    }
                    type={'text'}
                    name={'name'}
                    placeholder="Name"
                    required={true}
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div className="errorMessage">
                    {credentialsError.nameError}
                  </div>

                  <p className="mb-0 mt-3">LAST NAME</p>
                  <InputText
                    className={
                      credentialsError.last_nameError === ''
                        ? 'inputsDesignCommon inputDesign w-100'
                        : 'inputsDesignCommon inputDesign  inputErrorDesign w-100'
                    }
                    type={'text'}
                    name={'last_name'}
                    required={true}
                    placeholder="Last name"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div className="errorMessage">
                    {credentialsError.last_nameError}
                  </div>
                </div>
                <Form className="d-flex align-items-center">
                  <Form.Group className="mb-3">
                  <p> ARTIST or ART LOVER?</p>

                    <Form.Select
                      className="selectDesign"
                      name={'role_id'}
                      required={true}
                      onChange={(e) => inputHandler(e)}
                      aria-label="Default select example"
                    >

                      <option>
                      </option>

                      {roles.map((role) => {
                        return (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        )
                      })}
                    </Form.Select>
                  </Form.Group>
                </Form>
                <form
                  className="inputFileRegisterForm form-avatar"
                  action="/profile"
                  method="post"
                  encType="multipart/form-data"
                >
                  Avatar/photo
                  <input
                    type="file"
                    name="avatar"
                    className="input-field-avatar"
                    hidden
                  />
                  <MdCloudUpload color="#1475cf" size={60} />
                  <p>Browse Files to upload</p>
                </form>
              </div>
              <p className="mb-0 mt-3">EMAIL</p>
              <InputText
                className={
                  credentialsError.emailError === ''
                    ? 'inputsDesignCommon inputDesign inputEmailDesign w-100'
                    : 'inputsDesignCommon inputDesign inputErrorDesign inputEmailDesign w-100'
                }
                type={'email'}
                name={'email'}
                required={true}
                placeholder="Email"
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e) => checkError(e)}
              />
              <div className="errorMessage">{credentialsError.emailError}</div>
              <div className="passwordsFields d-flex justify-content-between w-100">
                <div className="w-100 me-3">
                  <p className="mb-0 mt-3">PASSWORD</p>
                  <InputText
                    className={
                      credentialsError.passwordError === ''
                        ? 'inputsDesignCommon inputDesign inputPasswordDesign w-100'
                        : 'inputsDesignCommon inputDesign inputErrorDesign inputPasswordDesign w-100'
                    }
                    type={'password'}
                    name={'password'}
                    required={true}
                    placeholder="e.g. Password_123"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div className="errorMessage">
                    {credentialsError.passwordError}
                  </div>
                </div>
                <div className="w-100 ms-3">
                  <p className="mb-0 mt-3">CONFIRM PASSWORD</p>
                  <InputText
                    className={
                      credentialsError.passwordError === ''
                        ? 'inputsDesignCommon inputDesign inputPasswordDesign w-100'
                        : 'inputsDesignCommon inputDesign inputErrorDesign inputPasswordDesign w-100'
                    }
                    type={'password'}
                    name={'confirm_password'}
                    required={true}
                    placeholder="e.g. Password_123"
                    changeFunction={(e) => inputHandlerConfirmPassword(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div className="errorMessage">
                    {credentialsError.passwordError}
                  </div>
                </div>
              </div>
              <p className="mb-0 mt-3">PHONE</p>
              <InputText
                className={
                  credentialsError.phoneError === ''
                    ? 'inputsDesignCommon inputDesign w-100'
                    : 'inputsDesignCommon inputDesign inputErrorDesign w-100'
                }
                type={'text'}
                name={'phone'}
                required={true}
                placeholder="e.g. +34666555444"
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e) => checkError(e)}
              />
              <div className="errorMessage">{credentialsError.phoneError}</div>

              <div className="cityCountrySection d-flex justify-content-between">
                <div className="w-100 me-3">
                  <p className="mb-0 mt-3">CITY</p>
                  <InputText
                    className={
                      credentialsError.cityError === ''
                        ? 'inputsDesignCommon inputDesign inputAddressDesign w-100'
                        : 'inputsDesignCommon inputDesign inputErrorDesign inputAddressDesign w-100'
                    }
                    type={'text'}
                    name={'city'}
                    required={true}
                    placeholder="City"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div className="errorMessage">
                    {credentialsError.cityError}
                  </div>
                </div>
                <div className="w-100 ms-3">
                  <p className="mb-0 mt-3">COUNTRY</p>
                  <InputText
                    className={
                      credentialsError.countryError === ''
                        ? 'inputsDesignCommon inputDesign inputAddressDesign w-100'
                        : 'inputsDesignCommon inputDesign inputErrorDesign inputAddressDesign w-100'
                    }
                    type={'text'}
                    name={'country'}
                    required={true}
                    placeholder="Country"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div className="errorMessage">
                    {credentialsError.countryError}
                  </div>
                </div>
              </div>

              <div
                type="submit"
                className={
                  registerAct
                    ? 'mt-3 buttonDesign  text-center'
                    : 'mt-3 buttonDesign notActBtn text-center'
                }
                onClick={
                  registerAct
                    ? () => {
                        userRegister()
                        ;<div className="d-flex justify-content-center align-items-center welcomeMsgContainerDesign">
                          <h1 className="welcomeMsgDesign">{welcome}</h1>
                        </div>
                      }
                    : () => {}
                }
              >
                Submit
              </div>
            </Col>
            <Col lg={6} className="p-0 m-0 selectedImgCol">
              {allArtworks.map((artwork) => {
                return (
                  <div key={artwork.id}>
                    <div className="d-flex align-items-end justify-content-end">
                      <img
                        className="selectedImgDesignRegister"
                        src={`http://localhost:3000/static/${artwork.image_url}`}
                      />
                    </div>
                  </div>
                )
              })}
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="d-flex justify-content-center align-items-center welcomeMsgContainerDesign">
          <h1 className="welcomeMsgDesign">{welcome}</h1>
        </div>
      )}
    </div>
  )
}
