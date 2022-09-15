import React from 'react'
import HomeNav from '../../components/HomeNav';
import Homefooter from '../../components/Homefooter';


export default function Home() {
  return (<>
    <div>
      <HomeNav/>
      <br/><br/><br/><br/>
      
      <div className="image">
            <img src="https://community.developer.bosch.com/html/@DC0534EDF5EF7A8E926CBD9195E83407/assets/devcommunity.jpg" />
          </div>
        
    </div>
    <Homefooter/>
    </>

  )
}