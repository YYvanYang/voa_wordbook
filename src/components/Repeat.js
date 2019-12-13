import React from "react"
import { connect } from "react-redux"

import IconButton from "@material-ui/core/IconButton"
import RepeatOneIcon from "@material-ui/icons/RepeatOne"
import RepeatIcon from "@material-ui/icons/Repeat"
import SyncDisabledIcon from "@material-ui/icons/SyncDisabled"
import Tooltip from "@material-ui/core/Tooltip"

const Repeat = ({ repeatType, repeat }) => {
  let component = (
    <IconButton color="inherit" aria-label="Disable Repeat" onClick={repeat}>
      <SyncDisabledIcon />
    </IconButton>
  )

  if (repeatType === "one") {
    component = (
      <IconButton color="inherit" aria-label="Repeat One" onClick={repeat}>
        <RepeatOneIcon />
      </IconButton>
    )
  }

  if (repeatType === "all") {
    component = (
      <IconButton color="inherit" aria-label="Repeat" onClick={repeat}>
        <RepeatIcon />
      </IconButton>
    )
  }

  return <Tooltip title="Repeat Setting">{component}</Tooltip>
}

const mapStateToProps = ({ repeatType }) => {
  return { repeatType }
}

const mapDispatchToProps = dispatch => {
  return { repeat: () => dispatch({ type: `REPEAT_TYPE` }) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Repeat)
