import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { InputText } from "../../components/InputText/InputText";
import "./UserDetailsAsAdmin.css";
import { bringMyUserProfile, updateMyProfile, updateUsersProfileAsAdmin } from "../../services/apiCalls";
import { validate } from "../../helpers/useful";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { MdCloudUpload } from "react-icons/md";
import { detailsData } from "../detailsSlice";

export const UserDetailsAsAdmin = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState([])
  const userCredentialsRdx = useSelector(userData)
  const userDetailsRdx = useSelector(detailsData)
  const choosenUser = userDetailsRdx.choosenUser;
  const params = userDetailsRdx.choosenUser.id;

    const [credentials, setCredentials] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    role_id: "",
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
    role_idVali: false,
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
    role_idError: "",
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

  const userUpdate = () => {
    updateUsersProfileAsAdmin(params, credentials, userCredentialsRdx.credentials.token);
console.log("entro en update");
    setWelcome(`Profile updated!`);
    setTimeout(() => {
      navigate("/admin-panel");
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center defaultPageHeight">
      {welcome === '' ? (
        <Container fluid className="register-container">
          <Row className="mb-3 w-100 d-flex justify-content-center mt-5 mb-5">
            <Col
              lg={12}
              className="updateUserFormBody pb-lg-5 justify-content-lg-center"
              id="formGridName"
            >
              <h1 className="text-center nameDesign">
                Updating {choosenUser.name}'s profile details
              </h1>
              <div className="d-flex justify-content-between">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <p className="mb-0 "><span className="previousDetail">{choosenUser.name}</span></p>
                  <InputText
                    className={
                      credentialsError.nameError === ''
                        ? 'inputsDesignCommon inputBasicDesign w-100'
                        : 'inputsDesignCommon inputBasicDesign inputErrorDesign w-100'
                    }
                    type={'text'}
                    name={'name'}
                    placeholder="Name"
                    required={true}
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.nameError}</div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                  <p className="mb-0 "><span className="previousDetail"> {choosenUser.last_name}</span></p>

                  <InputText
                    className={
                      credentialsError.last_nameError === ''
                        ? 'inputsDesignCommon inputBasicDesign w-100'
                        : 'inputsDesignCommon inputBasicDesign inputErrorDesign w-100'
                    }
                    type={'text'}
                    name={'last_name'}
                    required={true}
                    placeholder="Last name"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.last_nameError}</div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                  <p className="mb-0 "><span className="previousDetail">Role ID: {choosenUser.role_id}</span></p>

                  <InputText
                    className={
                      credentialsError.role_idError === ''
                        ? 'inputsDesignCommon inputBasicDesign w-100'
                        : 'inputsDesignCommon inputBasicDesign inputErrorDesign w-100'
                    }
                    type={'text'}
                    name={'role_id'}
                    required={true}
                    placeholder="Role (2-admin, 3-art lover, 4-artist)"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.role_idError}</div>
                  </div>
                   </div>
                <div>
                <form
                  action="/profile"
                  method="post"
                  encType="multipart/form-data"
                  className="form-avatar"
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

              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
              <p className="mb-0 "><span className="previousDetail">{choosenUser.email}</span></p>

              <InputText
                className={
                  credentialsError.emailError === ''
                    ? 'inputsDesignCommon inputBasicDesign inputEmailDesign w-100'
                    : 'inputsDesignCommon inputBasicDesign inputErrorDesign inputEmailDesign w-100'
                }
                type={'email'}
                name={'email'}
                required={true}
                placeholder="Email"
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e) => checkError(e)}
              />
              <div>{credentialsError.emailError}</div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
              <p className="mb-0 "><span className="previousDetail">New Password:</span></p>

              <InputText
                className={
                  credentialsError.passwordError === ''
                    ? 'inputsDesignCommon inputBasicDesign inputPasswordDesign w-100'
                    : 'inputsDesignCommon inputBasicDesign inputErrorDesign inputPasswordDesign w-100'
                }
                type={'password'}
                name={'password'}
                required={true}
                placeholder="e.g. Password_123"
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e) => checkError(e)}
              />
              <div>{credentialsError.passwordError}</div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
              <p className="mb-0 "><span className="previousDetail">{choosenUser.phone}</span></p>

              <InputText
                className={
                  credentialsError.phoneError === ''
                    ? 'inputsDesignCommon inputBasicDesign w-100'
                    : 'inputsDesignCommon inputBasicDesign inputErrorDesign w-100'
                }
                type={'text'}
                name={'phone'}
                required={true}
                placeholder="e.g. +34666555444"
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e) => checkError(e)}
              />
              <div>{credentialsError.phoneError}</div>
              </div>
              <div className="cityCountrySection d-flex justify-content-between">
                <div className="w-100 me-3">
                <div className="d-flex justify-content-between align-items-center mt-3">
                <p className="mb-0 "><span className="previousDetail">{choosenUser.city}</span></p>

                  <InputText
                    className={
                      credentialsError.cityError === ''
                        ? 'inputsDesignCommon inputBasicDesign inputAddressDesign w-100'
                        : 'inputsDesignCommon inputBasicDesign inputErrorDesign inputAddressDesign w-100'
                    }
                    type={'text'}
                    name={'city'}
                    required={true}
                    placeholder="City"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.cityError}</div>
                  </div>
                </div>
                <div className="w-100 ms-3">
                <div className="d-flex justify-content-between align-items-center mt-3">
                <p className="mb-0 "><span className="previousDetail">{choosenUser.country}</span></p>

                  <InputText
                    className={
                      credentialsError.countryError === ''
                        ? 'inputsDesignCommon inputBasicDesign inputAddressDesign w-100'
                        : 'inputsDesignCommon inputBasicDesign inputErrorDesign inputAddressDesign w-100'
                    }
                    type={'text'}
                    name={'country'}
                    required={true}
                    placeholder="Country"
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <div>{credentialsError.countryError}</div>
                  </div>
                </div>
              </div>

              <div
                type="submit"
                className={
                  registerAct
                    ? 'mt-3 buttonDesign registerSendAct text-center'
                    : 'mt-3 buttonDesign text-center'
                }
                onClick={
                  () => { userUpdate()}}
              >
                Submit
              </div>
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
};
