/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

"use strict"

const { resolve } = require("path")

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Used to detect and prevent duplicate redirects
  // const redirectToSlugMap = {};

  const wordTemplate = resolve(__dirname, "../src/templates/word.js")
  const lettersTemplate = resolve(__dirname, "../src/templates/letters.js")

  // // Redirect /index.html to root.
  // createRedirect({
  //   fromPath: '/index.html',
  //   redirectInBrowser: true,
  //   toPath: '/',
  // });

  const allLetters = await graphql(
    `
      {
        allDirectory(
          filter: {
            sourceInstanceName: { eq: "words" }
            relativeDirectory: { eq: "" }
          }
        ) {
          edges {
            node {
              name
            }
          }
        }
      }
    `
  )

  if (allLetters.errors) {
    console.error(allLetters.errors)

    throw Error(allLetters.errors)
  }

  allLetters.data.allDirectory.edges.forEach(edge => {
    const letter = edge.node.name
    const createLettersPage = path =>
      createPage({
        path: path,
        component: lettersTemplate,
        context: {
          letter,
        },
      })

    // Register primary URL.
    createLettersPage(letter)
  })

  ///----
  const allWords = await graphql(
    `
      {
        allPresentationXml {
          edges {
            node {
              Title
              SlideText
              letter
            }
          }
          totalCount
        }
      }
    `
  )

  if (allWords.errors) {
    console.error(allWords.errors)

    throw Error(allWords.errors)
  }

  allWords.data.allPresentationXml.edges.forEach(edge => {
    const { Title, SlideText, letter } = edge.node
    const createwordPage = path =>
      createPage({
        path: path,
        component: wordTemplate,
        context: {
          name: Title,
          SlideText,
          letter,
        },
      })

    // Register primary URL.
    createwordPage(`/${letter}/${Title}`)
  })
}
