import React, { Fragment, useState, useEffect } from "react"
import { connect } from "react-redux"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import AudiotrackIcon from "@material-ui/icons/Audiotrack"
import IconButton from "@material-ui/core/IconButton"
import CardActions from "@material-ui/core/CardActions"
import Phrase from "../components/phrase"
import clsx from "clsx"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import Grid from "@material-ui/core/Grid"
import { navigate } from "@reach/router"
// or import { navigate } from "gatsby"
import { play, stop } from "../play"

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  label: {
    textTransform: "capitalize",
    cursor: "pointer",
  },
  letter: {
    marginRight: 10,
    marginBottom: 10,
  },
})

function Word({
  data,
  pageContext: { name: Title, SlideText, prev, next },
  repeatType,
}) {
  const classes = useStyles()
  const [definition, setDefinition] = useState("")
  const [iconColor, setIconColor] = useState("secondary")

  useEffect(() => {
    function formatText(text) {
      const pattern = /(.+)\s(Definition:)\s(\2.+)/
      const regex = new RegExp(pattern, "ig")

      let array1 = regex.exec(text)

      if (array1 !== null) {
        let def = array1[3]

        if (def) {
          def = def
            .replace(/\s{5,}/g, "\n")
            .replace(/(Synonyms:)\s?\1/, "$1")
            .replace(/(Examples:)\s?\1/, "$1")
          setDefinition(def)
        }
      }
    }

    formatText(SlideText)
  }, [SlideText])

  useEffect(() => {
    if (repeatType === "all") {
      let node = data.allFile.edges[0].node
      onPlay(node)
    }

    return () => {}
  }, [repeatType, data.allFile.edges[0].node])

  function onended() {
    setIconColor("secondary")
    if (repeatType === "all") {
      // go to next vocaburary card
      let node = next
      if (node) {
        setTimeout(() => {
          navigate(`/${node.letter}/${node.Title}/`)
        }, 500)
      }
    }
  }

  function onPlay(node) {
    if (iconColor === "secondary") {
      setIconColor("primary")
      setTimeout(() => {
        node && play(node.publicURL, onended)
      }, 500)
    } else {
      setIconColor("secondary")
      stop()
    }
  }
  let firstItem = data.allFile.edges[0] || {}
  let firstNode = firstItem.node || {}

  return (
    <Layout>
      <SEO title={firstNode.name || "VOA"} />
      {data.allFile.edges.map(({ node }) => (
        <Card key={node.name} className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {Title}{" "}
              <IconButton
                size="small"
                color={iconColor}
                aria-label="play"
                onClick={() => onPlay(node)}
              >
                <AudiotrackIcon />
              </IconButton>
            </Typography>
            <Typography
              className={classes.pos}
              color="textSecondary"
            ></Typography>
            <Typography variant="body2" component="p">
              {definition.split("\n").map(function(item, key) {
                return (
                  <Fragment key={key}>
                    {item}
                    <br />
                  </Fragment>
                )
              })}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              {prev && (
                <Phrase
                  node={prev}
                  avatar={<ChevronLeftIcon />}
                  cls={clsx(classes.label, classes.letter)}
                />
              )}
              {next && (
                <Phrase
                  node={next}
                  avatar={<ChevronRightIcon />}
                  cls={clsx(classes.label, classes.letter)}
                />
              )}
            </Grid>
          </CardActions>
        </Card>
      ))}
    </Layout>
  )
}

const mapStateToProps = ({ repeatType }) => {
  return { repeatType }
}

export default connect(mapStateToProps, null)(Word)

export const query = graphql`
  query($name: String) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "audio" }
        extension: { eq: "mp3" }
        name: { eq: $name }
      }
    ) {
      edges {
        node {
          name
          relativePath
          publicURL
        }
      }
    }
  }
`
