/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

import { Link } from "gatsby"
import React from "react"

const ButtonLink = ({ children, ...rest }) => {
  return (
    <Link {...rest} style={buttonStyle}>
      {children}
    </Link>
  )
}

const buttonStyle = {
  color: "inherit",
  transition: "color 0.2s ease-out",
  textDecoration: "none",
}

export default ButtonLink
