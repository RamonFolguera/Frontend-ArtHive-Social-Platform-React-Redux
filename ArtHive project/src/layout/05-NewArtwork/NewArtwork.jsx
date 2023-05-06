import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
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
import { NavBar } from '../../components/Navbar/NavBar'
import { FooterTemplate } from '../../components/FooterTemplate/FooterTemplate'

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
    image_url: '',
    status: true,
    price: '',
  })

const [categories, setCategories] = useState([
  {
    name: "Abstract painting"
  },
  {
    name: "Oil painting"
  },
  {
    name: "Photography"
  },
  {
    name: "Digital painting"
  },
  {
    name: "Watercolor painting"
  },
  {
    name: "Acrylic painting"
  },
  {
    name: "Graffiti Art"
  },
  {
    name: "Illustration"
  },
  {
    name: "Mix digital and traditional painting"
  },
  {
    name: "Mix photography and digital"
  },
])


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
    <>
    <NavBar/>
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
                <Col md={12} lg={12} id="formGridTitle">
                  <p className="mb-0 mt-3 ps-3">TITLE</p>
                  <InputText
                    className={
                      infoArtworkError.titleError === ''
                        ? 'inputDesign'
                        : 'inputDesign inputErrorDesign'
                    }
                    type={'text'}
                    name={'title'}
                    placeholder="Title"
                    required={true}
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div className="errorMessage">{infoArtworkError.titleError}</div>
                </Col>

                

                <Col md={12} id="formGridSecondDescription">
                  <p className="mb-0 mt-3 ps-3">DESCRIPTION</p>
                  <InputText
                    className={
                      infoArtworkError.descriptionError === ''
                      ? 'inputDesign'
                      : 'inputDesign inputErrorDesign'
                    }
                    type={'text'}
                    name={'description'}
                    required={true}
                    placeholder="Description"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div className="errorMessage">{infoArtworkError.descriptionError}</div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={12} lg={6} id="formGridEmail">
                  <p className="mb-0 mt-3 ps-3">TECHNIQUE</p>
                  <InputText
                    className={
                      infoArtworkError.techniqueError === ''
                      ? 'inputDesign'
                      : 'inputDesign inputErrorDesign'
                    }
                    type={'text'}
                    name={'technique'}
                    required={true}
                    placeholder="Technique"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div className="errorMessage">{infoArtworkError.techniqueError}</div>
                </Col>
                <Col md={12} lg={6} id="formGridFirstSurname">
                <Form>
            <Form.Group className="mb-3">
              <p className="pe-4 nameFieldDesign ps-3">CATEGORY</p>
              <Form.Select
               className="selectCategoryDesign"
                name={"category"}
                onChange={(e) => inputHandler(e)}
                aria-label="Default select example"
              >
                <option>Choose category</option>

                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Form>
    
                </Col>
              </Row>
              <Row>
                
              <Col sm={12} lg={6} id="formGridDimensions">
                  <p className="mb-0 mt-3 ps-3">DIMENSIONS</p>
                  <InputText
                    className={
                      infoArtworkError.dimensionsError === ''
                      ? 'inputDesign'
                      : 'inputDesign inputErrorDesign'
                    }
                    type={'text'}
                    name={'dimensions'}
                    required={true}
                    placeholder="e.g. 500x500mm"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div className="errorMessage">{infoArtworkError.dimensionsError}</div>
                </Col>
                <Col sm={12} lg={6} id="formGridPrice">
                  <p className="mb-0 mt-3 ps-3">PRICE</p>
                  <InputText
                    className={
                      infoArtworkError.priceError === ''
                      ? 'inputDesign'
                      : 'inputDesign inputErrorDesign'
                    }
                    type={'integer'}
                    name={'price'}
                    required={true}
                    placeholder="e.g. 50"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div className="errorMessage">{infoArtworkError.priceError}</div>
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
<FooterTemplate/>
    </>
  )
}
