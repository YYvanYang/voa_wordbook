import React, { useRef, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import AudiotrackIcon from "@material-ui/icons/Audiotrack"
import IconButton from "@material-ui/core/IconButton"

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
  pageContext: { name: Title, SlideText },
}) {
  const classes = useStyles()
  const audioEl = useRef(null)

  //   https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
  // TODO
  //   useEffect(() => {
  // myAudioElement.addEventListener("canplaythrough", event => {
  //     /* the audio is now playable; play it if permissions allow */
  //     myAudioElement.play();
  //   });
  //   })
  function onPlay() {
    if (audioEl.current.canplay || audioEl.current.paused) {
      audioEl.current.play()
    } else {
      audioEl.current.pause()
    }
  }
  return (
    <Layout>
      <SEO title="Home" />
      {data.allFile.edges.map(({ node }) => (
        <Card key={node.name} className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {Title}

              <IconButton
                size="small"
                color="secondary"
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
            <Typography className={classes.pos} color="textSecondary">
              adjective
            </Typography>
            <Typography variant="body2" component="p">
              {SlideText}
            </Typography>
          </CardContent>
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
