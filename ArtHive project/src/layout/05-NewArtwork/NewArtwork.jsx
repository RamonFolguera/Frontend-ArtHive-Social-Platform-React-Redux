import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validate } from "../../helpers/useful";
import { InputText } from "../../components/InputText/InputText";
import "./NewArtwork.css";
import { registerNewArtwork } from "../../services/apiCalls";


export const NewArtwork = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    artist_id: "",
    title: "",
    category: "",
    description: "",
    technique: "",
    dimensions: "",
    // date_creation: "",
    image_url: "",
    status: true,
    price: "",
  });

  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [valiCredentials, setValiCredentials] = useState({
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

  });

  const [credentialsError, setCredentialsError] = useState({
    artist_idError: "",
    titleError: "",
    categoryError: "",
    descriptionError: "",
    techniqueError: "",
    dimensionsError: "",
    // date_creationError: "",
    image_urlError: "",
    statusError: "",
    priceError: "",
  });

  const [registerAct, setRegisterAct] = useState(false);

  const [welcome, setWelcome] = useState("");

  useEffect(() => {
    for (let error in credentialsError) {
      if (credentialsError[error] != "") {
        setRegisterAct(false);
        return;
      }
    }

    for (let empty in credentials) {
      if (credentials[empty] === "") {
        setRegisterAct(false);
        return;
      }
    }

    for (let validated in valiCredentials) {
      if (valiCredentials[validated] === false) {
        setRegisterAct(false);
        return;
      }
    }
    setRegisterAct(true);
  });

  const checkError = (e) => {
    let error = "";

    let checked = validate(e.target.name, e.target.value, e.target.required);

    error = checked.message;

    setValiCredentials((prevState) => ({
      ...prevState,
      [e.target.name + "Vali"]: checked.validated,
    }));

    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const artworkRegister = () => {
    console.log("entro")
    registerNewArtwork(credentials);

    setWelcome(`Congratulations! Your new artwork is out there to share with the world!`);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (

    <div className="d-flex justify-content-center defaultPageHeight">
      
      {welcome === "" ? (
        <div className="registerContent">
          <div className="w-100 text-center pt-3 pb-3">
            <h1>Fill in info with your artwork</h1>
          </div>
          <div className="registerContainerDesign mb-5">
            <Container>
              <Row className="mb-3">
                <Col md={4} id="formGridName">
                  <p className="mb-0 mt-3">Title</p>
                  <InputText
                    className={
                      credentialsError.titleError === ""
                        ? "inputsDesignCommon inputBasicDesign"
                        : "inputsDesignCommon inputBasicDesign inputErrorDesign"
                    }
                    type={"text"}
                    name={"title"}
                    placeholder="Title"
                    required={true}
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.titleError}</div>
                </Col>

                <Col md={4} id="formGridFirstSurname">
                  <p className="mb-0 mt-3">category</p>
                  <InputText
                    className={
                      credentialsError.categoryError === ""
                        ? "inputsDesignCommon inputBasicDesign"
                        : "inputsDesignCommon inputBasicDesign inputErrorDesign"
                    }
                    type={"text"}
                    name={"category"}
                    required={true}
                    placeholder="category"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.categoryError}</div>
                </Col>

                <Col md={4} id="formGridSecondSurname">
                  <p className="mb-0 mt-3">description</p>
                  <InputText
                    className={
                      credentialsError.descriptionError === ""
                        ? "inputsDesignCommon inputBasicDesign"
                        : "inputsDesignCommon inputBasicDesign inputErrorDesign"
                    }
                    type={"text"}
                    name={"description"}
                    required={true}
                    placeholder="Description"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.descriptionError}</div>
                </Col>
              </Row>
              <Row className="mb-3">
               
                <Col sm={12} lg={6} id="formGridEmail">
                  <p className="mb-0 mt-3">technique</p>
                  <InputText
                    className={
                      credentialsError.techniqueError === ""
                        ? "inputsDesignCommon inputBasicDesign inputEmailDesign"
                        : "inputsDesignCommon inputBasicDesign inputErrorDesign inputEmailDesign"
                    }
                    type={"text"}
                    name={"technique"}
                    required={true}
                    placeholder="Technique"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.techniqueError}</div>
                </Col>

                <Col sm={12} lg={6} id="formGridPassword">
                  <p className="mb-0 mt-3">dimensions</p>
                  <InputText
                    className={
                      credentialsError.dimensionsError === ""
                        ? "inputsDesignCommon inputBasicDesign inputPasswordDesign"
                        : "inputsDesignCommon inputBasicDesign inputErrorDesign inputPasswordDesign"
                    }
                    type={"text"}
                    name={"dimensions"}
                    required={true}
                    placeholder="e.g. 500x500mm"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.dimensionsError}</div>
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
              <Col  id="formGridPhone">
                  <p className="mb-0 mt-3">image_url</p>
                  <InputText
                    className={
                      credentialsError.image_urlError === ""
                        ? "inputsDesignCommon inputBasicDesign"
                        : "inputsDesignCommon inputBasicDesign inputErrorDesign"
                    }
                    type={"text"}
                    name={"image_url"}
                    required={true}
                    placeholder="e.g. httt://..."
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.image_urlError}</div>
                </Col>
                <Col  id="formGridPhone">
                  <p className="mb-0 mt-3">Phone</p>
                  <InputText
                    className={
                      credentialsError.priceError === ""
                        ? "inputsDesignCommon inputBasicDesign"
                        : "inputsDesignCommon inputBasicDesign inputErrorDesign"
                    }
                    type={"integer"}
                    name={"price"}
                    required={true}
                    placeholder="e.g. 50"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.priceError}</div>
                </Col>
                </Row>
                <Row className="d-flex justify-content-center">
              <div
                type="submit"
                className={
                  registerAct
                    ? "mt-3 buttonDesign registerSendAct text-center"
                    : "mt-3 buttonDesign text-center"
                }
                onClick={() => {
                    artworkRegister()}
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
   
  );
};