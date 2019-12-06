import React from "react";
import {
    FaGithubSquare,
    FaStackOverflow,
    FaTwitterSquare
} from "react-icons/fa"

import "../layout.css"

const MobileSocialLinks = ({ contacts }) => {
    return (
        <div className="bottom-bar py-1">
            <a className="text-light"
                href={contacts.github}>
                <span title="GitHub">
                    <FaGithubSquare size={26} style={{ color: "light" }} />
                </span>
            </a>
            <a className="text-warning"
                href={contacts.stackoverflow}>
                <span title="Stack Overflow">
                    <FaStackOverflow size={26} style={{ color: "#f48025" }} />
                </span>
            </a>
            <a className="text-info"
                href={contacts.twitter}>
                <span title="Twitter">
                    <FaTwitterSquare size={26} style={{ color: "#1da1f2" }} />
                </span>
            </a>
        </div>
    )
}

export default MobileSocialLinks;