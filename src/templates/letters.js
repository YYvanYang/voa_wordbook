import React from "react"
import ButtonLink from "../components/ButtonLink"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { graphql } from "gatsby"

import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"

import Avatar from "@material-ui/core/Avatar"
import Chip from "@material-ui/core/Chip"

const useStyles = makeStyles(() => ({
  label: {
    textTransform: "capitalize",
    cursor: "pointer",
  },
  letter: {
    marginRight: 10,
    marginBottom: 10,
  },
}))

const IndexPage = ({ data }) => {
  const classes = useStyles()

  return (
    <Layout>
      <SEO title="Home" />
      {data.allPresentationXml.edges.map(({ node }) => (
        <ButtonLink key={node.name} to={`/${node.letter}/${node.Title}/`}>
          <Chip
            key={node.Title}
            color="primary"
            label={node.Title}
            className={clsx(classes.label, classes.letter)}
            avatar={<Avatar>{node.letter}</Avatar>}
          />
        </ButtonLink>
      ))}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query($letter: String) {
    allPresentationXml(filter: { letter: { eq: $letter } }) {
      edges {
        node {
          Title
          SlideText
          letter
        }
      }
      totalCount
    }
  }
`
