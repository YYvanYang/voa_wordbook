import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Phrase from "../components/phrase"

import { graphql } from "gatsby"

import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"

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
        <Phrase
          key={node.Title}
          node={node}
          cls={clsx(classes.label, classes.letter)}
        />
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
