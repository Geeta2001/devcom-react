import React from 'react'
import Swal from 'sweetalert2';

export default function AdminNav() {

  const LogOut = (e) => {
    localStorage.clear();
    Swal.fire({
      icon: 'success',
      title: 'Logged Out!',
      text: `LogOut is successfull`,
      showConfirmButton: false,
      timer: 4000
    });
  }

  return (
    <div>
  
<nav class="navbar navbar-expand-lg fixed-top bg-light navbar-light">
  <div class="container">
    <a class="navbar-brand" href="#"
      ><img
        id="MDB-logo"
        src="https://w7.pngwing.com/pngs/973/11/png-transparent-phoenix-logo-design-mark-phoenix-fire-thumbnail.png"
        alt="MDB Logo"
        draggable="false"
        height="30"
    /></a>
    <h3>DevCom</h3>
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto align-items-center">
        <li class="nav-item">
          <a class="nav-link mx-2" href="/ViewDeveloper"><i class="fas fa-plus-circle pe-2"></i>View Developers</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mx-2" href="/DeleteQuery"><i class="fas fa-bell pe-2"></i>View Queries</a>
        </li>
        <li class="nav-item">
          <a class="nav-link mx-2" href="/DeleteResponse"><i class="fas fa-heart pe-2"></i>View Responses</a>
        </li>
        <li className="nav-item ms-3">
                <a className="btn btn-black btn-rounded" href="/" onClick={LogOut}>Log Out</a>
        </li>

      </ul>
    </div>
  </div>
</nav>
 
    </div>
  )
}