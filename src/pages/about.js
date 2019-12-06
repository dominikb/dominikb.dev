import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"

import Sidebar from "../components/sidebar/Sidebar"

const AboutPage = props => {
  const yearsAsDev =
    (new Date().getTime() - new Date("2017-08-02").getTime()) /
    (1000 * 60 * 60 * 24 * 365)
  const ageInYears = Math.floor(
    (new Date().getTime() - new Date("1995-01-05").getTime()) /
      (1000 * 60 * 60 * 24 * 365)
  )

  return (
    <Layout>
      <SEO title="About" />
      <div className="post-page-main">
        <div className="sidebar px-4 py-2">
          <Sidebar />
        </div>

        <div className="post-main">
          <SEO title="About" />
          <div className="mt-3">
            <h1 className="heading">About</h1>
            <p>
              I started out as a professional developer{" "}
              <span class="strike-through">about</span> {yearsAsDev} years ago,
              after having been a hobbyist long before.
            </p>

            <p>
              My main proficiency lies with PHP and Laravel, as well as
              everything related to Javascript.
            </p>

            <p>
              I love building APIs and services for others to use and really
              enable their full potential.
            </p>
          </div>

          <h2>Motto</h2>

          <div className="mt-3">
            <p>
              At { ageInYears } years old I’m looking forward to everything we will
              accomplish.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
