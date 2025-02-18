% Auto-generated: do not edit by hand
\name{forcePlot}

\alias{forcePlot}

\title{ForcePlot component}

\description{
ForcePlot component visualizes feature contributions as stacked segments,  with positive and negative contributions separated by a transition gap.
}

\usage{
forcePlot(data=NULL, height=NULL, hoveredId=NULL, onClick=NULL,
onHover=NULL, onSegmentPositionsUpdate=NULL,
onTransitionPointFound=NULL, style=NULL, width=NULL)
}

\arguments{
\item{data}{List of lists containing elements 'id', 'value'.
those elements have the following types:
  - id (character; required)
  - value (numeric; required)s. }

\item{height}{Numeric. }

\item{hoveredId}{Character. }

\item{onClick}{}

\item{onHover}{}

\item{onSegmentPositionsUpdate}{}

\item{onTransitionPointFound}{}

\item{style}{Lists containing elements 'positive', 'negative', 'background'.
those elements have the following types:
  - positive (character; optional)
  - negative (character; optional)
  - background (character; optional). }

\item{width}{Numeric. }
}

\value{named list of JSON elements corresponding to React.js properties and their values}

