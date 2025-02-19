# AUTO GENERATED FILE - DO NOT EDIT

#' @export
connectingLine <- function(end=NULL, pathStyle=NULL, start=NULL, style=NULL, tooltipContent=NULL) {
    
    props <- list(end=end, pathStyle=pathStyle, start=start, style=style, tooltipContent=tooltipContent)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'ConnectingLine',
        namespace = 'dash_feature_impact',
        propNames = c('end', 'pathStyle', 'start', 'style', 'tooltipContent'),
        package = 'dashFeatureImpact'
        )

    structure(component, class = c('dash_component', 'list'))
}
