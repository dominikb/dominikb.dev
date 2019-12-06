import React from "react"
import "./sidebar.css"

import dominik from "../../images/dominik.jpg"

const Bio = ({ author, tagline }) => {

    return (
        <div className="bio-main w-75">
            <img src={dominik} alt="Dominik Bauernfeind" />
            <h3 className="mt-2 author-bio">{author}</h3>
            <small className="text-muted">{tagline}</small>
        </div>
    )
}

export default Bio