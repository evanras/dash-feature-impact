% Auto-generated: do not edit by hand
\name{kDEPlot}

\alias{kDEPlot}

\title{KDEPlot component}

\description{
KDEPlot Component Renders a kernel density estimation plot showing the distribution of predictions with the current prediction highlighted.
}

\usage{
kDEPlot(data=NULL, height=NULL, margins=NULL, style=NULL, width=NULL)
}

\arguments{
\item{data}{Lists containing elements 'points', 'prediction'.
those elements have the following types:
  - points (list of list of numericss; required)
  - prediction (numeric; required). }

\item{height}{Numeric. }

\item{margins}{Lists containing elements 'top', 'right', 'bottom', 'left'.
those elements have the following types:
  - top (numeric; optional)
  - right (numeric; optional)
  - bottom (numeric; optional)
  - left (numeric; optional). }

\item{style}{Lists containing elements 'areacolor', 'predictioncolor', 'gridcolor', 'textcolor', 'background'.
those elements have the following types:
  - areacolor (character; optional)
  - predictioncolor (character; optional)
  - gridcolor (character; optional)
  - textcolor (character; optional)
  - background (character; optional). }

\item{width}{Numeric. }
}

\value{named list of JSON elements corresponding to React.js properties and their values}

