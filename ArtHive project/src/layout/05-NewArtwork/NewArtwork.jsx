import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { validate } from '../../helpers/useful'
import { InputText } from '../../components/InputText/InputText'
import './NewArtwork.css'
import { registerNewArtwork } from '../../services/apiCalls'
import axios from 'axios'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { userData } from "../userSlice";

export const NewArtwork = () => {
  const userCredentialsRdx = useSelector(userData);
  const navigate = useNavigate()

  
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState()
  const [fileName, setFileName] = useState('No Selected File')

  console.log(fileName)
  
  const [infoArtwork, setInfoArtwork] = useState({
    artist_id: userCredentialsRdx.credentials.user.artistId,
    title: '',
    category: '',
    description: '',
    technique: '',
    dimensions: '',
    // date_creation: "",
    image_url: '',
    status: true,
    price: '',
  })

  const fileOnChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setInfoArtwork((prevState) => ({
        ...prevState,
        image_url: e.target.files[0].name,
       
      }));
    }
    if (e.target.files) {
      setImageUrl(URL.createObjectURL(e.target.files[0]))
      setImage(e.target.files[0])
    }
  }
  console.log(infoArtwork)

  const deleteFile = () => {
    setFileName('No selected File')
    setImage(null)
  }

  const inputHandler = (e) => {
    setInfoArtwork((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const [valiInfoArtwork, setValiInfoArtwork] = useState({
    artist_idVali: false,
    titleVali: false,
    categoryVali: false,
    descriptionVali: false,
    techniqueVali: false,
    dimensionsVali: false,
    // date_creationVali: false,
    image_urlVali: false,
    statusVali: false,
    priceVali: false,
  })

  const [infoArtworkError, setInfoArtworkError] = useState({
    artist_idError: '',
    titleError: '',
    categoryError: '',
    descriptionError: '',
    techniqueError: '',
    dimensionsError: '',
    // date_creationError: "",
    image_urlError: '',
    statusError: '',
    priceError: '',
  })

  const [registerAct, setRegisterAct] = useState(false)

  const [welcome, setWelcome] = useState('')

  useEffect(() => {
    for (let error in infoArtworkError) {
      if (infoArtworkError[error] != '') {
        setRegisterAct(false)
        return
      }
    }

    for (let empty in infoArtwork) {
      if (infoArtwork[empty] === '') {
        setRegisterAct(false)
        return
      }
    }

    for (let validated in valiInfoArtwork) {
      if (valiInfoArtwork[validated] === false) {
        setRegisterAct(false)
        return
      }
    }
    setRegisterAct(true)
  })

  const checkError = (e) => {
    let error = ''

    let checked = validate(e.target.name, e.target.value, e.target.required)

    error = checked.message

    setValiInfoArtwork((prevState) => ({
      ...prevState,
      [e.target.name + 'Vali']: checked.validated,
    }))

    setInfoArtworkError((prevState) => ({
      ...prevState,
      [e.target.name + 'Error']: error,
    }))
  }
  const sendImage = async (e) => {
    const formData = new FormData()
    formData.append('file', image)
    try {
      const result = await axios.post('http://localhost:3000/file', formData)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(image)

  const artworkRegister = () => {
    registerNewArtwork(infoArtwork, userCredentialsRdx.credentials.token)
    
    setWelcome(
      `Congratulations! Your new artwork is out there to share with the world!`
    )
    setTimeout(() => {
      navigate('/my-artworks-gallery')
    }, 500)
  }

  return (
    <div className="d-flex justify-content-center defaultPageHeight">
      {welcome === '' ? (
        <div className="registerContent">
          <div className="w-100 text-center pt-3 pb-3">
            <h1>Create New Item</h1>
            <p>* Required fields</p>
            <p>File types supported: JPG, PNG, GIF. Max size: 100 MB</p>
          </div>
          <div className="registerContainerDesign mb-5">
            <Container>
              <Row className="mb-3">
                <Col md={12}>
                  <form
                  className="inputFileForm"
                    action="/profile"
                    method="post"
                    encType="multipart/form-data"
                    onClick={() =>
                      document.querySelector('.input-field').click()
                    }
                  >
                    <input
                      type="file"
                      name="avatar"
                      onChange={(e) => {
                        fileOnChange(e)
                      }}
                      className="input-field"
                      hidden
                    />

                    {imageUrl ? (
                      <img src={imageUrl} alt={fileName} />
                    ) : (
                      <>
                        <MdCloudUpload color="#1475cf" size={60} />
                        <p>Browse Files to upload</p>
                      </>
                    )}
                  </form>
                  <section className="uploaded-row">
                    <AiFillFileImage color="#1475cf" />
                    <span className="upload-content">
                      {fileName} -
                      <MdDelete onClick={() => deleteFile()} />
                    </span>
                  </section>
                  <button
                    onClick={() => {
                      sendImage()
                    }}
                  >
                    Upload
                  </button>
                </Col>
                <Col md={4} id="formGridName">
                  <p className="mb-0 mt-3">Title</p>
                  <InputText
                    className={
                      infoArtworkError.titleError === ''
                        ? 'inputsDesignCommon inputBasicDesign'
                        : 'inputsDesignCommon inputBasicDesign inputErrorDesign'
                    }
                    type={'text'}
                    name={'title'}
                    placeholder="Title"
                    required={true}
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{infoArtworkError.titleError}</div>
                </Col>

                <Col md={4} id="formGridFirstSurname">
                  <p className="mb-0 mt-3">category</p>
                  <InputText
                    className={
                      infoArtworkError.categoryError === ''
                        ? 'inputsDesignCommon inputBasicDesign'
                        : 'inputsDesignCommon inputBasicDesign inputErrorDesign'
                    }
                    type={'text'}
                    name={'category'}
                    required={true}
                    placeholder="category"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{infoArtworkError.categoryError}</div>
                </Col>

                <Col md={4} id="formGridSecondSurname">
                  <p className="mb-0 mt-3">description</p>
                  <InputText
                    className={
                      infoArtworkError.descriptionError === ''
                        ? 'inputsDesignCommon inputBasicDesign'
                        : 'inputsDesignCommon inputBasicDesign inputErrorDesign'
                    }
                    type={'text'}
                    name={'description'}
                    required={true}
                    placeholder="Description"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{infoArtworkError.descriptionError}</div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={12} lg={6} id="formGridEmail">
                  <p className="mb-0 mt-3">technique</p>
                  <InputText
                    className={
                      infoArtworkError.techniqueError === ''
                        ? 'inputsDesignCommon inputBasicDesign inputEmailDesign'
                        : 'inputsDesignCommon inputBasicDesign inputErrorDesign inputEmailDesign'
                    }
                    type={'text'}
                    name={'technique'}
                    required={true}
                    placeholder="Technique"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{infoArtworkError.techniqueError}</div>
                </Col>

                <Col sm={12} lg={6} id="formGridPassword">
                  <p className="mb-0 mt-3">dimensions</p>
                  <InputText
                    className={
                      infoArtworkError.dimensionsError === ''
                        ? 'inputsDesignCommon inputBasicDesign inputPasswordDesign'
                        : 'inputsDesignCommon inputBasicDesign inputErrorDesign inputPasswordDesign'
                    }
                    type={'text'}
                    name={'dimensions'}
                    required={true}
                    placeholder="e.g. 500x500mm"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{infoArtworkError.dimensionsError}</div>
                </Col>
              </Row>
              <Row>
                <Col sm={12} lg={6} id="formGridAddress">
                  {/* <p className="mb-0 mt-3">date_creation</p>
                <InputText
                  className={
                    credentialsError.date_creationError === ""
                      ? "inputsDesignCommon inputBasicDesign inputAddressDesign"
                      : "inputsDesignCommon inputBasicDesign inputErrorDesign inputAddressDesign"
                  }
                  type={"datetime-local"}
                  name={"date_creation"}
                  required={true}
                  changeFunction={(e) => inputHandler(e)}
                  blurFunction={(e) => checkError(e)}
                />
                <div>{credentialsError.date_creationError}</div> */}
                </Col>

                <Col id="formGridPrice">
                  <p className="mb-0 mt-3">Price</p>
                  <InputText
                    className={
                      infoArtworkError.priceError === ''
                        ? 'inputsDesignCommon inputBasicDesign'
                        : 'inputsDesignCommon inputBasicDesign inputErrorDesign'
                    }
                    type={'integer'}
                    name={'price'}
                    required={true}
                    placeholder="e.g. 50"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{infoArtworkError.priceError}</div>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                <div
                  type="submit"
                  className={
                    registerAct
                      ? 'mt-3 buttonDesign registerSendAct text-center'
                      : 'mt-3 buttonDesign text-center'
                  }
                  onClick={
                    () => {
                      artworkRegister()
                    }
                    //           registerAct
                    //             ? () => {
                    //                 artworkRegister();
                    //                 <div className="d-flex justify-content-center align-items-center welcomeMsgContainerDesign">
                    // <h1 className="welcomeMsgDesign">{welcome}</h1>
                    // </div>
                    //               }
                    //             : () => {}
                  }
                >
                  Submit
                </div>
              </Row>
            </Container>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center welcomeMsgContainerDesign">
          <h1 className="welcomeMsgDesign">{welcome}</h1>
        </div>
      )}
    </div>
  )
}
