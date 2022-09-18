import React from 'react'

export default function HomeNav() {
  return (
    <div>
       
<nav class="navbar navbar-expand-lg fixed-top bg-light navbar-light">
  <div class="container">
    <a class="navbar-brand" href="/"
      ><img
        id="MDB-logo"
        src="https://w7.pngwing.com/pngs/973/11/png-transparent-phoenix-logo-design-mark-phoenix-fire-thumbnail.png"
        alt="MDB Logo"
        draggable="false"
        height="30"
    /></a>
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
      <li class="nav-item ms-3">
          <a class="btn btn-black btn-rounded" href="/register">Register </a>
      </li>
      <li class="nav-item ms-3">
          <a class="btn btn-black btn-rounded" href="/login">Login </a>
      </li>
      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}