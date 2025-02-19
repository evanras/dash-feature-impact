# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dashFeatureImpact <- function(contributions=NULL, dimensions=NULL, idColumn=NULL, kdeData=NULL, onClick=NULL, onHover=NULL, predictionTooltip=NULL, style=NULL, tableData=NULL) {
    
    props <- list(contributions=contributions, dimensions=dimensions, idColumn=idColumn, kdeData=kdeData, onClick=onClick, onHover=onHover, predictionTooltip=predictionTooltip, style=style, tableData=tableData)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashFeatureImpact',
        namespace = 'dash_feature_impact',
        propNames = c('contributions', 'dimensions', 'idColumn', 'kdeData', 'onClick', 'onHover', 'predictionTooltip', 'style', 'tableData'),
        package = 'dashFeatureImpact'
        )

    structure(component, class = c('dash_component', 'list'))
}
