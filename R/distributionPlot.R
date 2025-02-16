# AUTO GENERATED FILE - DO NOT EDIT

#' @export
distributionPlot <- function(color=NULL, currentValue=NULL, data=NULL, height=NULL, width=NULL) {
    
    props <- list(color=color, currentValue=currentValue, data=data, height=height, width=width)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DistributionPlot',
        namespace = 'dash_feature_impact',
        propNames = c('color', 'currentValue', 'data', 'height', 'width'),
        package = 'dashFeatureImpact'
        )

    structure(component, class = c('dash_component', 'list'))
}
