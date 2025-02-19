% Auto-generated: do not edit by hand
\name{dashFeatureImpact}

\alias{dashFeatureImpact}

\title{DashFeatureImpact component}

\description{
DashFeatureImpact Component  Main component for visualizing feature impacts from machine learning models. Combines KDE plot, force plot, and AG Grid table with a responsive layout. Provides interactive features including hover synchronization and auto-scrolling.
}

\usage{
dashFeatureImpact(contributions=NULL, dimensions=NULL, gridOptions=NULL,
idColumn=NULL, kdeData=NULL, onClick=NULL, onHover=NULL,
predictionTooltip=NULL, style=NULL, tableData=NULL)
}

\arguments{
\item{contributions}{List of lists containing elements 'id', 'value'.
those elements have the following types:
  - id (character; required)
  - value (numeric; required)s. The contributions of features. Array of objects with 'id' and 'value' fields}

\item{dimensions}{Lists containing elements 'height', 'kdeplotwidth', 'forceplotwidth', 'tablewidth', 'margins'.
those elements have the following types:
  - height (numeric; optional)
  - kdeplotwidth (numeric; optional)
  - forceplotwidth (numeric; optional)
  - tablewidth (numeric | a value equal to: 'auto'; optional)
  - margins (optional): . margins has the following type: lists containing elements 'top', 'right', 'bottom', 'left'.
those elements have the following types:
  - top (numeric; optional)
  - right (numeric; optional)
  - bottom (numeric; optional)
  - left (numeric; optional). Size/dimension configuration}

\item{gridOptions}{Named list. Additional options to pass directly to AG Grid}

\item{idColumn}{Character. Name of the column in tableData that matches the 'id' field from contributions}

\item{kdeData}{Lists containing elements 'points', 'prediction', 'predictiondate'.
those elements have the following types:
  - points (list of list of numericss; required)
  - prediction (numeric; required)
  - predictiondate (character; optional). Data to build the KDE Plot visualization}

\item{onClick}{Callback when a feature is clicked}

\item{onHover}{Callback when a feature is hovered}

\item{predictionTooltip}{Character. Text to display in the tooltip for the prediction point}

\item{style}{Lists containing elements 'colors'.
those elements have the following types:
  - colors (optional): . colors has the following type: lists containing elements 'positive', 'negative', 'connecting', 'background', 'text', 'predictioncolor'.
those elements have the following types:
  - positive (character; optional)
  - negative (character; optional)
  - connecting (character; optional)
  - background (character; optional)
  - text (character; optional)
  - predictioncolor (character; optional). Styling configuration}

\item{tableData}{List of named lists. Data to display in table format. Must include the column specified by idColumn}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

