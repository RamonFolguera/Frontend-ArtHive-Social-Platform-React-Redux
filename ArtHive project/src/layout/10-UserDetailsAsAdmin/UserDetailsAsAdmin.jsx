import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { detailsData } from "../detailsSlice";
import { userData } from "../userSlice";
import { NavBar } from "../../components/Navbar/NavBar";



export const UserDetailsAsAdmin = () => {



  const userDetailsRdx = useSelector(detailsData);
  const userCredentialsRdx = useSelector(userData)

  const user = userDetailsRdx.choosenUser
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userCredentialsRdx.credentials.token) {
      navigate("/");
    }
  });

  return (
    <>
    <NavBar/>
    <Container className="profileMainDesign">
      <Row>
      <div className="text-center">
        <p className="nameDesign">
     
          {user.name}{" "}
          {user.last_surname}{" "}
     
        </p>
      </div>
   
        <div className="profileContainerDesign">
        <div className="profileDetailDesign">
            <div className="detailDesign">Email:
            </div>

            <div className="fieldDesign">
              {user.email}
            </div>
          </div>

          <div className="profileDetailDesign">
            <div className="detailDesign">Address:
            </div>

            <div className="fieldDesign">
              {user.city}
            </div>
          </div>


          <div className="profileDetailDesign">
            <div className="detailDesign">Phone:</div>
            <div className="fieldDesign">
              {user.phone}
            </div>
          </div>
        </div>
        
          </Row>
    </Container>



    </>

  );
};
