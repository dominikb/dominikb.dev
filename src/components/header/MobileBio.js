import React from "react"

import "./header.css"
import dominik from "../../images/dominik.jpg"

const MobileBio = (props) => {

    return (
        <div className="mobile-bio-main">
            <img src={dominik} style={{ maxHeight: `75px`}} alt="author-pic" />
            <h4 >{props.author}</h4>
        </div>
    )
}

export default MobileBio