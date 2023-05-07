import React from "react";
import { Whatsapp, Instagram, Facebook, Twitter, Youtube, Linkedin } from 'react-bootstrap-icons';
import './FooterTemplate.css'


export const FooterTemplate = () => {

  return (
    <footer className="text-center text-lg-start">
      <div className="container p-4">

        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">QUICK LINKS</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <p className="text-dark">
                  FAQs
                </p>
              </li>
              <li>
                <p className="text-dark">
                  Privacy & Data Policy
                </p>
              </li>
              <li>
                <p className="text-dark">
                Vulnerability Disclosure Policy
                </p>
              </li>
            
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">CONTACT US</h5>
            <ul className="list-unstyled mb-0">
             
              <li>
              <p className="text-dark">

                +34 633 95 54 87
                 </p>
                
              </li>
              <li>
              <p className="text-dark">

              folguera.ramon@gmail.com
              </p>
              </li>
              <li>
                
              <p className="text-dark">

                Valencia, Spain
                </p>
              </li>
            </ul>
          </div>

          
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0  d-flex flex-column justify-content-start align-items-stretch">
          
                    <ul className="list-unstyled mb-0 d-flex justify-content-between  align-items-stretch flex-row">
                        <li>
                            <a className='text-black' ><Instagram /> </a>
                        </li>
                        <li>
                            <a className='text-black' ><Facebook /></a>
                        </li>
                        <li>
                            <a className='text-black' ><Twitter /></a>
                        </li>
                        <li>
                            <a className='text-black' ><Youtube /></a>
                        </li>
                        <li>
                            <a className='text-black' href="https://www.linkedin.com/in/ram%C3%B3n-folguera-0ab32776/"><Linkedin /></a>
                        </li>
                    </ul>
           
            <div className="text-center">Art Hive © 2023</div>
        </div>
      
        </div>
      </div>
    </footer>
  );
};
