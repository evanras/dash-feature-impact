# AUTO GENERATED FILE - DO NOT EDIT

export featuretable

"""
    featuretable(;kwargs...)

A FeatureTable component.
FeatureTable displays the details of each feature including its name,
value, and contribution to the model's prediction.
Keyword arguments:
- `features` (required): Array of features with their details. features has the following type: Array of lists containing elements 'name', 'value', 'contribution'.
Those elements have the following types:
  - `name` (String; required)
  - `value` (Real | String; required)
  - `contribution` (Real; required)s
- `height` (Real | String; optional): Height of the table container
- `width` (Real | String; optional): Width of the table container
"""
function featuretable(; kwargs...)
        available_props = Symbol[:features, :height, :width]
        wild_props = Symbol[]
        return Component("featuretable", "FeatureTable", "dash_feature_impact", available_props, wild_props; kwargs...)
end

