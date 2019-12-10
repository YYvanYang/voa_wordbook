/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import Tooltip from "@material-ui/core/Tooltip"
import Button from "@material-ui/core/Button"
import ExtensionIcon from "@material-ui/icons/Extension"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import NoSsr from "@material-ui/core/NoSsr"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

const useStyles = makeStyles(theme => ({
  vocaburary: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}))

const VOCABURARY_LIST = [
  {
    code: "interactive",
    text: "Interactive Wordbook",
    link: "https://voa.yvan.top",
  },
  {
    code: "business",
    text: "Business Wordbook",
    link: "https://business.yvan.top",
  },
  {
    code: "health",
    text: "Health Wordbook",
    link: "https://health.yvan.top",
  },
  {
    code: "idiom",
    text: "Idiom Dictionary",
    link: "https://idiom.yvan.top",
  },
]

const VocaburaryList = () => {
  const classes = useStyles()

  const currVocaburary = "business"
  const [vocaburaryMenu, setVocaburaryMenu] = React.useState(null)
  const handleVocaburaryIconClick = event => {
    setVocaburaryMenu(event.currentTarget)
  }
  const handleVocaburaryMenuClose = event => {
    setVocaburaryMenu(null)
  }

  return (
    <>
      <Tooltip title={"Change Vocaburary"} enterDelay={300}>
        <Button color="inherit" onClick={handleVocaburaryIconClick}>
          <ExtensionIcon />
          <span className={classes.vocaburary}>
            {
              VOCABURARY_LIST.filter(
                language => language.code === currVocaburary
              )[0].text
            }
          </span>
          <ExpandMoreIcon fontSize="small" />
        </Button>
      </Tooltip>
      <NoSsr>
        <Menu
          anchorEl={vocaburaryMenu}
          open={Boolean(vocaburaryMenu)}
          onClose={handleVocaburaryMenuClose}
        >
          {VOCABURARY_LIST.map(vocaburary => (
            <MenuItem
              component="a"
              data-no-link="true"
              href={vocaburary.link}
              key={vocaburary.code}
              selected={currVocaburary === vocaburary.code}
              onClick={handleVocaburaryMenuClose}
            >
              {vocaburary.text}
            </MenuItem>
          ))}
        </Menu>
      </NoSsr>
    </>
  )
}

export default VocaburaryList
