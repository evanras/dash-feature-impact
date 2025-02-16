% Auto-generated: do not edit by hand
\name{dashFeatureImpact}

\alias{dashFeatureImpact}

\title{DashFeatureImpact component}

\description{
DashFeatureImpact is a component that visualizes ML model feature importance and their contributions to a prediction, combining distribution, force impact, and feature table visualizations.
}

\usage{
dashFeatureImpact(id=NULL, baseValue=NULL, colors=NULL, distributionData=NULL,
features=NULL, finalPrediction=NULL, height=NULL, width=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{baseValue}{Numeric. The model's base/average prediction value.}

\item{colors}{Lists containing elements 'positive', 'negative', 'distribution'.
those elements have the following types:
  - positive (character; optional)
  - negative (character; optional)
  - distribution (character; optional). Custom colors for visualization elements.}

\item{distributionData}{List of numerics. Array of prediction values used to create the distribution plot.}

\item{features}{List of lists containing elements 'name', 'value', 'contribution'.
those elements have the following types:
  - name (character; required)
  - value (numeric | character; required)
  - contribution (numeric; required)s. Array of feature objects that contribute to the prediction.}

\item{finalPrediction}{Numeric. The final prediction value after all feature contributions.}

\item{height}{Numeric | character. Height of the component (number for pixels, string for \%, vh).}

\item{width}{Numeric | character. Width of the component (number for pixels, string for \%, vh).}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

