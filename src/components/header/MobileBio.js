import React from "react"

import "./header.css"
import dominik from "../../images/dominik.jpg"

const MobileBio = (props) => {

    return (
        <div className="mobile-bio-main">
            <img src={dominik} alt="author-pic" />
        </div>
    )
}

export default MobileBio