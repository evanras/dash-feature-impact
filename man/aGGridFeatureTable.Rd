% Auto-generated: do not edit by hand
\name{aGGridFeatureTable}

\alias{aGGridFeatureTable}

\title{AGGridFeatureTable component}

\description{
AGGridFeatureTable Component  A feature-rich grid component that: 1. Synchronizes bidirectionally with ForcePlot for highlighting 2. Supports programmatic scrolling to specific rows 3. Allows configurable width  @param {Object[]} data - Array of data objects to display in the table @param {string} idColumn - Name of the column that serves as the unique identifier @param {Map} contributions - Map of feature IDs to contribution values @param {number} height - Height of the table container in pixels @param {number} width - Width of the table container (optional) @param {Object} style - Styling configuration @param {Function} onScroll - Callback when table scrolls, provides visible rows info @param {Function} onHover - Callback when row is hovered @param {Function} onClick - Callback when row is clicked @param {string} hoveredId - ID of currently hovered element @param {Object} gridOptions - Additional AG Grid options
}

\usage{
aGGridFeatureTable(contributions=NULL, data=NULL, gridOptions=NULL,
height=NULL, hoveredId=NULL, idColumn=NULL, onClick=NULL,
onHover=NULL, onScroll=NULL, style=NULL, width=NULL)
}

\arguments{
\item{contributions}{Map of feature IDs to contribution values}

\item{data}{List of named lists. Array of data objects to display in the table}

\item{gridOptions}{Named list. Additional AG Grid options to pass through}

\item{height}{Numeric. Height of the table container in pixels}

\item{hoveredId}{Character. ID of currently hovered row for highlighting}

\item{idColumn}{Character. Name of the column in tableData that matches the 'id' field from contributions}

\item{onClick}{Callback fired when row is clicked, provides row ID}

\item{onHover}{Callback fired when row is hovered, provides row ID}

\item{onScroll}{Callback fired when table scrolls with viewport info}

\item{style}{Lists containing elements 'textcolor', 'background', 'headerbackground', 'highlightbackground'.
those elements have the following types:
  - textcolor (character; optional)
  - background (character; optional)
  - headerbackground (character; optional)
  - highlightbackground (character; optional). Styling configuration}

\item{width}{Numeric | character. Width of the table container (optional, defaults to 100\%)}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

