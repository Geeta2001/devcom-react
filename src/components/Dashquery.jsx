import React from 'react'

import Query from './Query'
import BottomAppBar from './QuickFeed'

export default function Dashquery() {
  return (
<div className="row">
  
  <div className="col-md-8">
    <BottomAppBar/>
    </div>
  <div className="col-md-4"><Query/></div>
  
  

</div>

  )
}