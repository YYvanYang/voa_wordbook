import React from "react"

import IconButton from "@material-ui/core/IconButton"
import RepeatOneIcon from "@material-ui/icons/RepeatOne"
import RepeatIcon from "@material-ui/icons/Repeat"

export default ({ repeatOne = false, onRepeat }) => {
  if (repeatOne) {
    return (
      <IconButton color="inherit" aria-label="Repeat One" onClick={onRepeat}>
        <RepeatOneIcon />
      </IconButton>
    )
  }

  return (
    <IconButton color="inherit" aria-label="Repeat" onClick={onRepeat}>
      <RepeatIcon />
    </IconButton>
  )
}
