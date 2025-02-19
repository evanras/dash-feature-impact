# AUTO GENERATED FILE - DO NOT EDIT

#' @export
forcePlot <- function(data=NULL, height=NULL, hoveredId=NULL, notchHeight=NULL, onClick=NULL, onHover=NULL, onSegmentPositionsUpdate=NULL, onTransitionPointFound=NULL, style=NULL, width=NULL) {
    
    props <- list(data=data, height=height, hoveredId=hoveredId, notchHeight=notchHeight, onClick=onClick, onHover=onHover, onSegmentPositionsUpdate=onSegmentPositionsUpdate, onTransitionPointFound=onTransitionPointFound, style=style, width=width)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'ForcePlot',
        namespace = 'dash_feature_impact',
        propNames = c('data', 'height', 'hoveredId', 'notchHeight', 'onClick', 'onHover', 'onSegmentPositionsUpdate', 'onTransitionPointFound', 'style', 'width'),
        package = 'dashFeatureImpact'
        )

    structure(component, class = c('dash_component', 'list'))
}
