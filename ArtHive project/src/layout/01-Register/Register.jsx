import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { InputText } from "../../components/InputText/InputText";
import "./Register.css";
import { bringAllArtworks, registerUser } from "../../services/apiCalls";
import { validate } from "../../helpers/useful";

export const Register = () => {
  const navigate = useNavigate();

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
    name: "",
    last_name: "",
    email: "",
    password: "",
    birth_date: "",
    phone: "",
    avatar: "",
    city: "",
    country: "",
  });

  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [valiCredentials, setValiCredentials] = useState({
    nameVali: false,
    last_nameVali: false,
    emailVali: false,
    passwordVali: false,
    birth_dateVali: false,
    phoneVali: false,
    avatarVali: false,
    cityVali: false,
    countryVali: false,

  });

  const [credentialsError, setCredentialsError] = useState({
    nameError: "",
    last_nameError: "",
    emailError: "",
    passwordError: "",
    birth_dateError: "",
    phoneError: "",
    avatarError: "",
    cityError: "",
    countryError: "",
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

  const userRegister = () => {
    registerUser(credentials);

    setWelcome(`Welcome to ArtHive. Be creative! `);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (

    <div className="d-flex justify-content-center defaultPageHeight">
      
      {welcome === "" ? (
     
            <Container fluid className="main-container">
              <Row className="mb-3 w-100">

                <Col lg={6} className="registerFormBody pb-lg-5 justify-content-lg-center" id="formGridName">
                <h1 className="text-center">Register with ArtHive and start your art journey</h1>
                  <p className="mb-0 mt-3">Name</p>
                  <InputText
                    className={
                      credentialsError.nameError === ""
                        ? "inputsDesignCommon inputBasicDesign w-100"
                        : "inputsDesignCommon inputBasicDesign inputErrorDesign w-100"
                    }
                    type={"text"}
                    name={"name"}
                    placeholder="Name"
                    required={true}
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.nameError}</div>
          
                  <p className="mb-0 mt-3">Last Name:</p>
                  <InputText
                    className={
                      credentialsError.first_surnameError === ""
                        ? "inputsDesignCommon inputBasicDesign w-100"
                        : "inputsDesignCommon inputBasicDesign inputErrorDesign w-100"
                    }
                    type={"text"}
                    name={"last_name"}
                    required={true}
                    placeholder="Last name"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.first_surnameError}</div>
             
                  <p className="mb-0 mt-3">Second Surname</p>
                  <InputText
                    className={
                      credentialsError.second_surnameError === ""
                        ? "inputsDesignCommon inputBasicDesign w-100"
                        : "inputsDesignCommon inputBasicDesign inputErrorDesign w-100"
                    }
                    type={"text"}
                    name={"second_surname"}
                    required={true}
                    placeholder="Second Surname"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.second_surnameError}</div>
          
               
         
                  <p className="mb-0 mt-3">Email</p>
                  <InputText
                    className={
                      credentialsError.emailError === ""
                        ? "inputsDesignCommon inputBasicDesign inputEmailDesign w-100"
                        : "inputsDesignCommon inputBasicDesign inputErrorDesign inputEmailDesign w-100"
                    }
                    type={"email"}
                    name={"email"}
                    required={true}
                    placeholder="Email"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.emailError}</div>
            
                  <p className="mb-0 mt-3">Password</p>
                  <InputText
                    className={
                      credentialsError.passwordError === ""
                        ? "inputsDesignCommon inputBasicDesign inputPasswordDesign w-100"
                        : "inputsDesignCommon inputBasicDesign inputErrorDesign inputPasswordDesign w-100"
                    }
                    type={"password"}
                    name={"password"}
                    required={true}
                    placeholder="e.g. Password_123"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.passwordError}</div>
       
                <p className="mb-0 mt-3">Address</p>
                <InputText
                  className={
                    credentialsError.addressError === ""
                      ? "inputsDesignCommon inputBasicDesign inputAddressDesign w-100"
                      : "inputsDesignCommon inputBasicDesign inputErrorDesign inputAddressDesign w-100"
                  }
                  type={"text"}
                  name={"address"}
                  required={true}
                  placeholder="Address"
                  changeFunction={(e) => inputHandler(e)}
                  blurFunction={(e) => checkError(e)}
                />
                <div>{credentialsError.addressError}</div>
          
                  <p className="mb-0 mt-3">Phone</p>
                  <InputText
                    className={
                      credentialsError.phoneError === ""
                        ? "inputsDesignCommon inputBasicDesign w-100"
                        : "inputsDesignCommon inputBasicDesign inputErrorDesign w-100"
                    }
                    type={"text"}
                    name={"phone"}
                    required={true}
                    placeholder="e.g. +34666555444"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.phoneError}</div>
               
           
              <div
                type="submit"
                className={
                  registerAct
                    ? "mt-3 buttonDesign registerSendAct text-center"
                    : "mt-3 buttonDesign text-center"
                }
                onClick={
                  registerAct
                    ? () => {
                        userRegister();
                        <div className="d-flex justify-content-center align-items-center welcomeMsgContainerDesign">
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
   
  );
};
