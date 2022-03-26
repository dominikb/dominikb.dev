import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Sidebar from "../components/sidebar/Sidebar";
import TechTag from "../components/tags/TechTag";

const til = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <div className="index-main">
        <div className="sidebar px-4 py-2">
          <Sidebar />
        </div>
        <div className="post-list-main">
          <h1>Today I learned</h1>
          <div>
            {posts.map(post => (
              <div key={post.node.id} className="container mt-5">
                <Link to={post.node.fields.slug} className="text-dark">
                  <h2 className="title">{post.node.frontmatter.title}</h2>
                </Link>
                <small className="d-block text-info">
                  <i>Posted on {post.node.frontmatter.date}</i>
                </small>
                <p className="mt-3 d-inline">{post.node.frontmatter.excerpt || post.node.excerpt}</p>
                <Link to={post.node.fields.slug} className="text-primary">
                  <small className="d-inline-block ml-3"> Read full post</small>
                </Link>
                <div className="d-block">
                  {post.node.frontmatter.tags.map(tag => <TechTag key={tag} tag={tag} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const tilQuery = graphql`
query TilQuery {
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {fileAbsolutePath: {regex: "/til/"}, frontmatter: {published: {eq: true}}}) {
    totalCount
    edges {
      node {
        excerpt(pruneLength: 200)
        html
        id
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          tags
          excerpt
        }
        fields {
          slug
        }
      }
    }
  }
}
`;

export default til;