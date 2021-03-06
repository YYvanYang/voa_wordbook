/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

"use strict"

const { resolve } = require("path")

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions

  const wordTemplate = resolve(__dirname, "../src/templates/word.js")
  const lettersTemplate = resolve(__dirname, "../src/templates/letters.js")

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

  const allWords = await graphql(
    `
      {
        allPresentationXml(sort: { fields: Title, order: DESC }) {
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

  const edges = allWords.data.allPresentationXml.edges

  for (let index = 0; index < edges.length; index++) {
    const edge = edges[index]
    let prev = null
    let next = null
    if (index > 0) {
      prev = edges[index - 1].node
    }
    if (index < edges.length - 1) {
      next = edges[index + 1].node
    }

    const { Title, SlideText, letter } = edge.node
    const createwordPage = path =>
      createPage({
        path: path,
        component: wordTemplate,
        context: {
          name: Title,
          SlideText,
          letter,
          prev,
          next,
        },
      })

    // Register primary URL.
    createwordPage(`/${letter}/${Title}`)
  }
}
