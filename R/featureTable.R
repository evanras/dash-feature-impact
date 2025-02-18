# AUTO GENERATED FILE - DO NOT EDIT

#' @export
featureTable <- function(contributions=NULL, data=NULL, height=NULL, hoveredId=NULL, idColumn=NULL, onClick=NULL, onHover=NULL, onScroll=NULL, style=NULL) {
    
    props <- list(contributions=contributions, data=data, height=height, hoveredId=hoveredId, idColumn=idColumn, onClick=onClick, onHover=onHover, onScroll=onScroll, style=style)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'FeatureTable',
        namespace = 'dash_feature_impact',
        propNames = c('contributions', 'data', 'height', 'hoveredId', 'idColumn', 'onClick', 'onHover', 'onScroll', 'style'),
        package = 'dashFeatureImpact'
        )

    structure(component, class = c('dash_component', 'list'))
}
