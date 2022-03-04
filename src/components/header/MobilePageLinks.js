import React from "react"
import { Link } from "gatsby"

const MobilePages = () => {
    return (
        <div className="mobile-pages-main">
            <div className="text-center">
                <Link to="/"><p className="text-dark d-block py-1">All Posts</p></Link>
                <Link to="/til"><p className="text-dark d-block py-1">Today I Learned (TIL)</p></Link>
                <Link to="/blog"><p className="text-dark d-block py-1">Blog</p></Link>
            </div>
        </div>
    )
}

export default MobilePages


