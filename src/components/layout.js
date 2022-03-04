/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import "bootstrap/dist/css/bootstrap.css"
import Header from "./header/header"
import "./layout.css"
import ConsentBanner from "./consent-banner/ConsentBanner"

const Layout = ({ children }) => {
  const data = useStaticQuery(
    graphql`
    query SiteTitleQuery {
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
        }
      }
    }
    `
  )

  const { title, tagline, author, contacts } = data.site.siteMetadata;

  return (<>
    <Header
      siteTitle={title}
      tagline={tagline}
      author={author}
      contacts={contacts}
    />
    <div
      style={{
        margin: `0 auto`,
        padding: `0px 1.0875rem 1.45rem`,
        paddingTop: 0,
      }}
    >
      <main className="p-4" style={{
        maxWidth: `2000px`
      }}
      >{children}</main>
    </div>
    <ConsentBanner />
  </>);
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
