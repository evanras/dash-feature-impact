# AUTO GENERATED FILE - DO NOT EDIT

export dashfeatureimpact

"""
    dashfeatureimpact(;kwargs...)

A DashFeatureImpact component.
DashFeatureImpact is a component that visualizes ML model feature importance
and their contributions to a prediction, combining distribution, force impact,
and feature table visualizations.
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `baseValue` (Real; required): The model's base/average prediction value.
- `colors` (optional): Custom colors for visualization elements.. colors has the following type: lists containing elements 'positive', 'negative', 'distribution'.
Those elements have the following types:
  - `positive` (String; optional)
  - `negative` (String; optional)
  - `distribution` (String; optional)
- `distributionData` (Array of Reals; required): Array of prediction values used to create the distribution plot.
- `features` (required): Array of feature objects that contribute to the prediction.. features has the following type: Array of lists containing elements 'name', 'value', 'contribution'.
Those elements have the following types:
  - `name` (String; required)
  - `value` (Real | String; required)
  - `contribution` (Real; required)s
- `finalPrediction` (Real; required): The final prediction value after all feature contributions.
- `height` (Real | String; optional): Height of the component (number for pixels, string for %, vh).
- `width` (Real | String; optional): Width of the component (number for pixels, string for %, vh).
"""
function dashfeatureimpact(; kwargs...)
        available_props = Symbol[:id, :baseValue, :colors, :distributionData, :features, :finalPrediction, :height, :width]
        wild_props = Symbol[]
        return Component("dashfeatureimpact", "DashFeatureImpact", "dash_feature_impact", available_props, wild_props; kwargs...)
end

