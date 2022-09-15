import DeveloperService from "../../services/DeveloperService";
import {useState, useEffect } from "react";

export default function AddResponse() {
    
    const[devId,setDevId] = useState('');
    const[feedId,setFeedId] = useState('');
    const[answer,setAnswer] = useState('');
  
    const saveResponse= (e) => {
        e.preventDefault();
    
       
     const responses = { answer,devId, feedId};
     DeveloperService.addResponse(responses)
     .then(response => {
     console.log('Response added successfully',response.data);
     
     } )
    .catch(error => {
        console.log('something went wrong',error);
     })
        
     }
    

    return ( 
        <div className="container">
            <h2>adding new response</h2>
            <form>
                <div className="form-group">
                    <input
                    type="text"
                    className="form-control col-4"
                    id="devId"
                    value={devId}
                    onChange= {(e) => setDevId(e.target.value)}
                    placeholder="Enter devkey"
                    />
                    </div>
                    <br/>
                    <div className="form-group">
                    <input
                    type="text"
                    className="form-control col-4"
                    id="feedId"
                    value={feedId}
                    onChange= {(e) => setFeedId(e.target.value)}
                    placeholder="Enter feedkey"
                    />
                    </div>
                    <br/>
                    
                    <div className="form-group">
                    <input
                    type="text"
                    className="form-control col-4"
                    id="answer"
                    value={answer}
                    onChange= {(e) => setAnswer(e.target.value)}
                    placeholder="Enter Answer"
                    />
                    </div>
                    <br/>
                <div>
                    <button className="btn btn-primary" onClick={(e)=>saveResponse(e)}>save</button>
                </div>
            </form>
        </div>
     );
}