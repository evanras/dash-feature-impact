% Auto-generated: do not edit by hand
\name{kDEPlot}

\alias{kDEPlot}

\title{KDEPlot component}

\description{
KDEPlot Component Renders a kernel density estimation plot with a tooltip that can break out of containers
}

\usage{
kDEPlot(data=NULL, height=NULL, margins=NULL,
onPredictionPointFound=NULL, predictionTooltip=NULL,
style=NULL, width=NULL)
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

\item{onPredictionPointFound}{}

\item{predictionTooltip}{Character | a list of or a singular dash component, string or number. }

\item{style}{Lists containing elements 'areacolor', 'areastroke', 'predictioncolor', 'gridcolor', 'textcolor', 'background'.
those elements have the following types:
  - areacolor (character; optional)
  - areastroke (character; optional)
  - predictioncolor (character; optional)
  - gridcolor (character; optional)
  - textcolor (character; optional)
  - background (character; optional). }

\item{width}{Numeric. }
}

\value{named list of JSON elements corresponding to React.js properties and their values}

