% Auto-generated: do not edit by hand
\name{connectingLine}

\alias{connectingLine}

\title{ConnectingLine component}

\description{
ConnectingLine Component Creates SVG paths connecting different elements of the visualization with optional labels and styling.
}

\usage{
connectingLine(end=NULL, pathStyle=NULL, start=NULL, style=NULL,
tooltipContent=NULL)
}

\arguments{
\item{end}{Lists containing elements 'x', 'y'.
those elements have the following types:
  - x (numeric; required)
  - y (numeric; required). }

\item{pathStyle}{A value equal to: 'kde-to-force', 'force-to-table'. }

\item{start}{Lists containing elements 'x', 'y'.
those elements have the following types:
  - x (numeric; required)
  - y (numeric; required). }

\item{style}{Lists containing elements 'strokewidth', 'stroke', 'background', 'opacity'.
those elements have the following types:
  - strokewidth (numeric; optional)
  - stroke (character; optional)
  - background (character; optional)
  - opacity (numeric; optional). }

\item{tooltipContent}{Character. }
}

\value{named list of JSON elements corresponding to React.js properties and their values}

