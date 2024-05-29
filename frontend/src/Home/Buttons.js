//previous used for testig the ui currently not in functioning phase
import React from 'react'
import "./Button.css"

const Buttons = () => {
  return (
    <>
        <div className='container'>
            <div>
                <img src={require("./images/temperature.png")} alt="temperature" width="300px" height="300px"/>
            </div>
            <div>
                <img src={require("./images/watericon.png")} alt="water" width="300px" height="300px"/>
            </div>
            <div>
                <img src={require("./images/humidity.png")} alt="humidity"  width="300px" height="300px"/>
            </div>
            <div>
                <img src={require("./images/growlighticon.png")} alt="grow light" width="300px" height="300px"/>
            </div>
        </div>
    </>
  )
}

export default Buttons
