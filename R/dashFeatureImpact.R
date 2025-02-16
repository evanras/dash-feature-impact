# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dashFeatureImpact <- function(id=NULL, baseValue=NULL, colors=NULL, distributionData=NULL, features=NULL, finalPrediction=NULL, height=NULL, width=NULL) {
    
    props <- list(id=id, baseValue=baseValue, colors=colors, distributionData=distributionData, features=features, finalPrediction=finalPrediction, height=height, width=width)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashFeatureImpact',
        namespace = 'dash_feature_impact',
        propNames = c('id', 'baseValue', 'colors', 'distributionData', 'features', 'finalPrediction', 'height', 'width'),
        package = 'dashFeatureImpact'
        )

    structure(component, class = c('dash_component', 'list'))
}
