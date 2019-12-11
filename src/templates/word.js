import React, { Fragment, useState, useEffect, useRef } from "react"
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
})

export default function Word({
  data,
  pageContext: { name: Title, SlideText, prev, next },
}) {
  const classes = useStyles()
  const audioEl = useRef(null)
  const [definition, setDefinition] = useState("")
  const [iconColor, setIconColor] = useState("secondary")

  useEffect(() => {
    function formatText(text) {
      const pattern = /(Definition:)\s(\2.+)/
      const regex = new RegExp(pattern, "ig")

      let array1 = regex.exec(text)

      if (array1 !== null) {
        let def = array1[2]

        if (def) {
          def = def
            .replace(/\s{5,}/g, "\n")
            .replace(/(Synonyms:)\s?\1/, "$1")
            .replace(/(Examples:)\s?\1/, "$1")
            .replace(/(Dialogue:)\s?\1/, "$1")
            .replace(/(Usage:)\s?\1/, "$1")
            .replace(/(Sample Dialogue:)\s?\1/, "$1")
          setDefinition(def)
        }
      }
    }

    formatText(SlideText)
  }, [SlideText])

  useEffect(() => {
    let ele = audioEl.current
    if (ele) {
      ele.addEventListener("ended", reset)
    }

    function reset() {
      setIconColor("secondary")
    }

    return () => {
      if (ele) {
        ele.removeEventListener("ended", reset)
      }
    }
  }, [])

  function onPlay() {
    if (audioEl.current.canplay || audioEl.current.paused) {
      audioEl.current.play()
      setIconColor("primary")
    } else {
      audioEl.current.pause()
      setIconColor("secondary")
    }
  }
  return (
    <Layout>
      <SEO title="Home" />
      {data.allFile.edges.map(({ node }) => (
        <Card key={node.name} className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {Title}{" "}
              <IconButton
                size="small"
                color={iconColor}
                aria-label="play"
                onClick={onPlay}
              >
                <AudiotrackIcon />
              </IconButton>
              <audio ref={audioEl}>
                Your browser does not support the <code>audio</code> element.
                <source src={node.publicURL} type="audio/mpeg" />
              </audio>
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
