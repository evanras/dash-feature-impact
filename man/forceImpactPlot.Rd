% Auto-generated: do not edit by hand
\name{forceImpactPlot}

\alias{forceImpactPlot}

\title{ForceImpactPlot component}

\description{
ForceImpactPlot visualizes how each feature contributes to the final prediction, showing positive and negative impacts with colored bars and connecting lines to the feature table.  @param {Object} props @param {number} props.baseValue - Starting value before feature impacts @param {Array<Object>} props.features - Array of features with their contributions @param {number} props.height - Height of the plot @param {number} props.width - Width of the plot @param {Object} props.colors - Colors for positive/negative impacts @param {number} props.tableScrollPosition - Current scroll position of feature table
}

\usage{
forceImpactPlot(baseValue=NULL, colors=NULL, features=NULL, height=NULL,
tableScrollPosition=NULL, width=NULL)
}

\arguments{
\item{baseValue}{Numeric. Starting value before feature impacts are applied}

\item{colors}{Lists containing elements 'positive', 'negative'.
those elements have the following types:
  - positive (character; optional)
  - negative (character; optional). Colors for positive and negative impacts}

\item{features}{List of lists containing elements 'name', 'contribution'.
those elements have the following types:
  - name (character; required)
  - contribution (numeric; required)s. Array of features with their contribution values}

\item{height}{Numeric. Height of the plot in pixels}

\item{tableScrollPosition}{Numeric. Current scroll position of the feature table}

\item{width}{Numeric. Width of the plot in pixels}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

