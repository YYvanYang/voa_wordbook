// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import clsx from "clsx"
import { makeStyles, useTheme } from "@material-ui/core/styles"
// import Drawer from "@material-ui/core/Drawer"
// import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
// import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
// import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
// import ChevronRightIcon from "@material-ui/icons/ChevronRight"
// import ListItem from "@material-ui/core/ListItem"
// import ListItemIcon from "@material-ui/core/ListItemIcon"
// import ListItemText from "@material-ui/core/ListItemText"
// import InboxIcon from "@material-ui/icons/MoveToInbox"
// import MailIcon from "@material-ui/icons/Mail"
// import QueueMusicIcon from "@material-ui/icons/QueueMusic"
// import Avatar from '@material-ui/core/Avatar';
// import Chip from '@material-ui/core/Chip';

// const Header = ({ siteTitle }) => (
//   <header
//     style={{
//       background: `rebeccapurple`,
//       marginBottom: `1.45rem`,
//     }}
//   >
//     <div
//       style={{
//         margin: `0 auto`,
//         maxWidth: 960,
//         padding: `1.45rem 1.0875rem`,
//       }}
//     >
//       <h1 style={{ margin: 0 }}>
//         <Link
//           to="/"
//           style={{
//             color: `white`,
//             textDecoration: `none`,
//           }}
//         >
//           {siteTitle}
//         </Link>
//       </h1>
//     </div>
//   </header>
// )

const drawerWidth = 120

const useStyles = makeStyles(theme => ({
  // root: {
  //   display: "flex",
  // },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  // drawer: {
  //   width: drawerWidth,
  //   flexShrink: 0,
  // },
  // drawerPaper: {
  //   width: drawerWidth,
  // },
  // drawerHeader: {
  //   display: "flex",
  //   alignItems: "center",
  //   padding: theme.spacing(0, 1),
  //   ...theme.mixins.toolbar,
  //   justifyContent: "flex-end",
  // },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  //   transition: theme.transitions.create("margin", {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   marginLeft: -drawerWidth,
  // },
  // contentShift: {
  //   transition: theme.transitions.create("margin", {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginLeft: 0,
  // },
  // label: {
  //   textTransform: "capitalize",
  // },
  // letter: {
  //   marginRight: 10,
  //   marginBottom: 10
  // }
}))

const Header = ({ siteTitle }) => (
  <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
      [classes.appBarShift]: open,
    })}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap>
        {siteTitle}
      </Typography>
    </Toolbar>
  </AppBar>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
