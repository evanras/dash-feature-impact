% Auto-generated: do not edit by hand
\name{aGGridFeatureTable}

\alias{aGGridFeatureTable}

\title{AGGridFeatureTable component}

\description{
AGGridFeatureTable Component  Enhanced feature table implementation using AG Grid for advanced data display, with support for synchronized highlighting and programmatic scrolling.  @param {Object[]} data - Array of data objects to display in the table @param {string} idColumn - Name of the column that serves as the unique identifier @param {Map} contributions - Map of feature IDs to contribution values @param {number} height - Height of the table container in pixels @param {Object} style - Styling configuration object @param {string} style.textColor - Color for table text @param {string} style.background - Background color for table body @param {string} style.headerBackground - Background color for table header @param {string} style.highlightBackground - Background color for highlighted rows @param {Function} onScroll - Callback fired when table scrolls with viewport info @param {Function} onHover - Callback fired when row is hovered, provides row ID @param {Function} onClick - Callback fired when row is clicked, provides row ID @param {string} hoveredId - ID of currently hovered row for highlighting @param {Object} gridOptions - Additional AG Grid options to pass through
}

\usage{
aGGridFeatureTable(contributions=NULL, data=NULL, gridOptions=NULL,
height=NULL, hoveredId=NULL, idColumn=NULL, onClick=NULL,
onHover=NULL, onScroll=NULL, style=NULL)
}

\arguments{
\item{contributions}{}

\item{data}{List of named lists. }

\item{gridOptions}{Named list. }

\item{height}{Numeric. }

\item{hoveredId}{Character. }

\item{idColumn}{Character. }

\item{onClick}{}

\item{onHover}{}

\item{onScroll}{}

\item{style}{Lists containing elements 'textcolor', 'background', 'headerbackground', 'highlightbackground'.
those elements have the following types:
  - textcolor (character; optional)
  - background (character; optional)
  - headerbackground (character; optional)
  - highlightbackground (character; optional). }
}

\value{named list of JSON elements corresponding to React.js properties and their values}

