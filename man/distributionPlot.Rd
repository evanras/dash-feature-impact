% Auto-generated: do not edit by hand
\name{distributionPlot}

\alias{distributionPlot}

\title{DistributionPlot component}

\description{
DistributionPlot creates a vertical density plot showing the distribution of model predictions. The density spreads horizontally while the prediction values run vertically.  Key features: - Vertical orientation with prediction values on Y-axis - Smoothed density calculation using Gaussian kernel - Current prediction value marker - Responsive sizing
}

\usage{
distributionPlot(color=NULL, currentValue=NULL, data=NULL, height=NULL,
width=NULL)
}

\arguments{
\item{color}{Character. Color for the distribution visualization.
This will be used with varying opacity for the density plot.}

\item{currentValue}{Numeric. The current prediction value to highlight on the distribution.
This value will be marked with a horizontal line and circle.}

\item{data}{List of numerics. Array of prediction values used to create the distribution.
These should be numerical values representing model predictions.}

\item{height}{Numeric. Height of the plot in pixels.
This should match the parent container's height.}

\item{width}{Numeric. Width of the plot in pixels.
This should match the parent container's width.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

