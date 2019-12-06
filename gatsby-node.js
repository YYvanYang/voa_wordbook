/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// exports.onCreateNode = ({ node, actions }) => {
//     const { createNodeField } = actions;

//     if ([`application/xml`, `text/xml`].includes(node.internal.mediaType)) {
//         const letter = node.relativePath.split('/')[0]
//         createNodeField({ node, letter });
//     }

// };

// exports.onCreatePage = ({ page, actions, ...rest }) => {
//     const { createPage, deletePage } = actions
//     // const oldPage = Object.assign({}, page)
//     // // Remove trailing slash unless page is /
//     // page.path = replacePath(page.path)
//     // if (page.path !== oldPage.path) {
//     //   // Replace new page with old page
//     //   deletePage(oldPage)
//     //   createPage(page)
//     // }

//     console.log('rest:', rest, page)

//     if (page.path.match(/^\//)) {
//         deletePage(page)
//         // You can access the variable "letter" in your page queries now
//         createPage({
//             ...page,
//             context: {
//                 ...page.context,
//                 letter: `b`,
//             },
//         })
//     }

// }

exports.createPages = require("./gatsby/createPages")
