import React from "react"
import { connect } from "react-redux"

import IconButton from "@material-ui/core/IconButton"
import RepeatOneIcon from "@material-ui/icons/RepeatOne"
import RepeatIcon from "@material-ui/icons/Repeat"
import SyncDisabledIcon from "@material-ui/icons/SyncDisabled"

const Repeat = ({ repeatType, repeat }) => {
  if (repeatType === "one") {
    return (
      <IconButton color="inherit" aria-label="Repeat One" onClick={repeat}>
        <RepeatOneIcon />
      </IconButton>
    )
  }

  if (repeatType === "all") {
    return (
      <IconButton color="inherit" aria-label="Repeat" onClick={repeat}>
        <RepeatIcon />
      </IconButton>
    )
  }

  return (
    <IconButton color="inherit" aria-label="Disable Repeat" onClick={repeat}>
      <SyncDisabledIcon />
    </IconButton>
  )
}

const mapStateToProps = ({ repeatType }) => {
  return { repeatType }
}

const mapDispatchToProps = dispatch => {
  return { repeat: () => dispatch({ type: `REPEAT_TYPE` }) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Repeat)
