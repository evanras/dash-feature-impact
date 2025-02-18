% Auto-generated: do not edit by hand
\name{dashFeatureImpact}

\alias{dashFeatureImpact}

\title{DashFeatureImpact component}

\description{
Main component for visualizing feature impacts from machine learning models. Combines KDE plot, force plot, and feature table with connecting elements.
}

\usage{
dashFeatureImpact(contributions=NULL, dimensions=NULL, idColumn=NULL,
kdeData=NULL, onClick=NULL, onHover=NULL, style=NULL,
tableData=NULL)
}

\arguments{
\item{contributions}{List of lists containing elements 'id', 'value'.
those elements have the following types:
  - id (character; required)
  - value (numeric; required)s. The contributions of features. Dict with keys 'id' and 'value' where 'id' is expected to match the 'idColumn' in 'tableData'.}

\item{dimensions}{Named list. Size configurations for components in the visual.}

\item{idColumn}{Character. Name of the column in 'tableData' that matches the 'id' field from 'contributions'}

\item{kdeData}{Lists containing elements 'points', 'prediction', 'predictiondate'.
those elements have the following types:
  - points (list of list of numericss; required)
  - prediction (numeric; required)
  - predictiondate (optional). Data to build the KDE Plot from.}

\item{onClick}{}

\item{onHover}{}

\item{style}{Named list. Style components}

\item{tableData}{List of named lists. Data to display in a tabular format to the rigth of the force plot.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

