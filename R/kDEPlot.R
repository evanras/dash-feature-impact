# AUTO GENERATED FILE - DO NOT EDIT

#' @export
kDEPlot <- function(data=NULL, height=NULL, margins=NULL, predictionTooltip=NULL, style=NULL, width=NULL) {
    
    props <- list(data=data, height=height, margins=margins, predictionTooltip=predictionTooltip, style=style, width=width)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'KDEPlot',
        namespace = 'dash_feature_impact',
        propNames = c('data', 'height', 'margins', 'predictionTooltip', 'style', 'width'),
        package = 'dashFeatureImpact'
        )

    structure(component, class = c('dash_component', 'list'))
}
