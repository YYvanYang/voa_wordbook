import React from "react"
import ButtonLink from "../components/ButtonLink"
import Avatar from "@material-ui/core/Avatar"
import Chip from "@material-ui/core/Chip"

export default function Phrase({ node, cls }) {
  return (
    <ButtonLink key={node.name} to={`/${node.letter}/${node.Title}/`}>
      <Chip
        color="primary"
        label={node.Title}
        className={cls}
        avatar={<Avatar>{node.letter}</Avatar>}
      />
    </ButtonLink>
  )
}
