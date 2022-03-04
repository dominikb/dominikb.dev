import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Bio from "./Bio"
import "./sidebar.css"

import SocialLinks from "./SocialLinks"
import TechTag from "../tags/TechTag"

const Sidebar = () => {
    return (
        <StaticQuery
            query={graphql`
                query SiteBioQuery {
                    site {
                        siteMetadata {
                            title
                            tagline
                            author
                            contacts {
                                github
                                stackoverflow
                                twitter
                            }
                            labels {
                                tag
                                tech
                                name 
                                size 
                                color
                            }
                        }
                    }
                    allMarkdownRemark(
                        limit: 10
                        sort: { fields: [frontmatter___date], order: DESC }
                        filter: { frontmatter: { published: { eq: true } } }
                    ) {
                        edges {
                            node {
                                frontmatter {
                                    tags
                                }
                            }
                        }
                    }
                }
            `}
            render={data => (
                <>
                    <div className="sidebar-main border-right">
                        <Bio author={data.site.siteMetadata.author} tagline={data.site.siteMetadata.tagline} />
                        <SocialLinks contacts={data.site.siteMetadata.contacts} />
                        <div className="page-links">
                            <Link to="/"><span className="text-dark d-block py-1">All Posts</span></Link>
                            <Link to="/til"><span className="text-dark d-block py-1">Today I Learned (TIL)</span></Link>
                            <Link to="/blog"><span className="text-dark d-block py-1">Blog</span></Link>
                        </div>
                        <div className="tech-tags mt-4">
                            {data.site.siteMetadata.labels.map(label => <TechTag key={label.tag} tag={label.tag} />)}
                        </div>
                    </div>
                </>
            )}
        />
    )
}

export default Sidebar