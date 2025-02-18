# AUTO GENERATED FILE - DO NOT EDIT

export featuretable

"""
    featuretable(;kwargs...)

A FeatureTable component.
FeatureTable Component
Displays feature data in a scrollable table with dynamic columns and interaction
Keyword arguments:
- `data` (Array of Dicts; required)
- `height` (Real; optional)
- `hoveredId` (String; optional)
- `idColumn` (String; required)
- `style` (optional): . style has the following type: lists containing elements 'textColor', 'background', 'headerBackground', 'highlightBackground'.
Those elements have the following types:
  - `textColor` (String; optional)
  - `background` (String; optional)
  - `headerBackground` (String; optional)
  - `highlightBackground` (String; optional)
"""
function featuretable(; kwargs...)
        available_props = Symbol[:data, :height, :hoveredId, :idColumn, :style]
        wild_props = Symbol[]
        return Component("featuretable", "FeatureTable", "dash_feature_impact", available_props, wild_props; kwargs...)
end

