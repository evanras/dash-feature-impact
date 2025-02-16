# AUTO GENERATED FILE - DO NOT EDIT

export forceimpactplot

"""
    forceimpactplot(;kwargs...)

A ForceImpactPlot component.
ForceImpactPlot visualizes how each feature contributes to the final prediction,
showing positive and negative impacts with colored bars and connecting lines to
the feature table.

@param {Object} props
@param {number} props.baseValue - Starting value before feature impacts
@param {Array<Object>} props.features - Array of features with their contributions
@param {number} props.height - Height of the plot
@param {number} props.width - Width of the plot
@param {Object} props.colors - Colors for positive/negative impacts
@param {number} props.tableScrollPosition - Current scroll position of feature table
Keyword arguments:
- `baseValue` (Real; required): Starting value before feature impacts are applied
- `colors` (optional): Colors for positive and negative impacts. colors has the following type: lists containing elements 'positive', 'negative'.
Those elements have the following types:
  - `positive` (String; optional)
  - `negative` (String; optional)
- `features` (required): Array of features with their contribution values. features has the following type: Array of lists containing elements 'name', 'contribution'.
Those elements have the following types:
  - `name` (String; required)
  - `contribution` (Real; required)s
- `height` (Real; required): Height of the plot in pixels
- `tableScrollPosition` (Real; optional): Current scroll position of the feature table
- `width` (Real; required): Width of the plot in pixels
"""
function forceimpactplot(; kwargs...)
        available_props = Symbol[:baseValue, :colors, :features, :height, :tableScrollPosition, :width]
        wild_props = Symbol[]
        return Component("forceimpactplot", "ForceImpactPlot", "dash_feature_impact", available_props, wild_props; kwargs...)
end

