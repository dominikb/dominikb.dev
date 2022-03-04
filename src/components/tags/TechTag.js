import React from "react"
import * as FontAwesome from "react-icons/fa"
import * as Devicons from "react-icons/di"
import * as SimpleIcon from "react-icons/si"

import "./tags.css"
import { graphql, Link, useStaticQuery } from "gatsby";

const TechTag = (args) => {
    const { tag } = args;

    const data = useStaticQuery(
        graphql`
        query AvailableLabels {
            site {
            siteMetadata {
                labels {
                tag
                tech
                name
                size
                color
                }
            }
            }
        }
        `
    )

    const label = data.site.siteMetadata.labels.find(it => it.tag === tag)
    if (!label) return (<></>);

    const { tech, name, size, color } = label;

    let icon;
    if (/^Fa/.test(name)) icon = React.createElement(FontAwesome[name]);
    if (/^Si/.test(name)) icon = React.createElement(SimpleIcon[name]);
    if (/^Di/.test(name)) icon = React.createElement(Devicons[name])

    return (
        <div className="d-inline-block p-1">
            <Link to={`/tags/${tag}/`}>
                <button
                    className="tech-tag text-white">
                    <p className="d-inline">{tech} </p>
                    <div className="d-inline" style={{ fontSize: size, color: color }}>{icon}</div>
                </button>
            </Link>

        </div>

    )
}

export default TechTag