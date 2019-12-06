import React from "react"
import {
    FaGithubSquare,
    FaStackOverflow,
    FaTwitterSquare
} from "react-icons/fa"


const SocialLinks = ({ contacts }) => {
    return (
        <div className="social-links float-right mr-4">
            <a className="text-light ml-4"
                href={contacts.github}>
                <span title="GitHub">
                    <FaGithubSquare size={40} style={{ color: "light" }} />
                </span>
            </a>
            <a className="text-warning ml-4"
                href={contacts.stackoverflow}>
                <span title="Stack Overflow">
                    <FaStackOverflow size={40} style={{ color: "#f48025" }} />
                </span>
            </a>
            <a className="text-info ml-4"
                href={contacts.twitter}>
                <span title="Twitter">
                    <FaTwitterSquare size={40} style={{ color: "#1da1f2" }} />
                </span>
            </a>
        </div>
    )
}

export default SocialLinks