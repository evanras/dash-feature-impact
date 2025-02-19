# AUTO GENERATED FILE - DO NOT EDIT

#' @export
forceImpactPlot <- function(baseValue=NULL, colors=NULL, features=NULL, height=NULL, tableScrollPosition=NULL, width=NULL) {
    
    props <- list(baseValue=baseValue, colors=colors, features=features, height=height, tableScrollPosition=tableScrollPosition, width=width)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'ForceImpactPlot',
        namespace = 'dash_feature_impact',
        propNames = c('baseValue', 'colors', 'features', 'height', 'tableScrollPosition', 'width'),
        package = 'dashFeatureImpact'
        )

    structure(component, class = c('dash_component', 'list'))
}
