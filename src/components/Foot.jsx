import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Nav = () => {
  return (
    
        <div class="fixed-bottom">
        <MDBFooter color="black" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Dev comunity</h5>
            <p>
            “Trust is built with Friendship.” 
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title" >Admin contact </h5>
            <ul>
              {/* <li className="list-unstyled">
                <a href="/admin/AdminLogin">Spec</a>
              </li> */}
              <li className="list-unstyled">
                <a href="/AddCourse">About us</a>
              </li>
              <li className="list-unstyled">
                <a href="/Allcourse">share</a>
              </li>
              <li className="list-unstyled">
                <a href="/">scoial media</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> Devcom.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
        </div>
        
       
    
  )
}

export default Nav