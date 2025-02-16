# AUTO GENERATED FILE - DO NOT EDIT

#' @export
featureTable <- function(features=NULL, height=NULL, onScroll=NULL, width=NULL) {
    
    props <- list(features=features, height=height, onScroll=onScroll, width=width)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'FeatureTable',
        namespace = 'dash_feature_impact',
        propNames = c('features', 'height', 'onScroll', 'width'),
        package = 'dashFeatureImpact'
        )

    structure(component, class = c('dash_component', 'list'))
}
