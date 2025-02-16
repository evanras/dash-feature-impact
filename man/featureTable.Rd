% Auto-generated: do not edit by hand
\name{featureTable}

\alias{featureTable}

\title{FeatureTable component}

\description{
FeatureTable displays the details of each feature including its name, value, and contribution to the model's prediction.
}

\usage{
featureTable(features=NULL, height=NULL, onScroll=NULL, width=NULL)
}

\arguments{
\item{features}{List of lists containing elements 'name', 'value', 'contribution'.
those elements have the following types:
  - name (character; required)
  - value (numeric | character; required)
  - contribution (numeric; required)s. Array of features with their details}

\item{height}{Numeric | character. Height of the table container}

\item{onScroll}{Callback function for scroll position updates}

\item{width}{Numeric | character. Width of the table container}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

