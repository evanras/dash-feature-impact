# AUTO GENERATED FILE - DO NOT EDIT

#' @export
aGGridFeatureTable <- function(contributions=NULL, data=NULL, gridOptions=NULL, height=NULL, hoveredId=NULL, idColumn=NULL, onClick=NULL, onHover=NULL, onScroll=NULL, style=NULL, width=NULL) {
    
    props <- list(contributions=contributions, data=data, gridOptions=gridOptions, height=height, hoveredId=hoveredId, idColumn=idColumn, onClick=onClick, onHover=onHover, onScroll=onScroll, style=style, width=width)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'AGGridFeatureTable',
        namespace = 'dash_feature_impact',
        propNames = c('contributions', 'data', 'gridOptions', 'height', 'hoveredId', 'idColumn', 'onClick', 'onHover', 'onScroll', 'style', 'width'),
        package = 'dashFeatureImpact'
        )

    structure(component, class = c('dash_component', 'list'))
}
