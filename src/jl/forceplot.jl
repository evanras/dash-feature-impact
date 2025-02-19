# AUTO GENERATED FILE - DO NOT EDIT

export forceplot

"""
    forceplot(;kwargs...)

A ForcePlot component.
ForcePlot component visualizes feature contributions as stacked segments, 
with positive and negative contributions separated by a transition gap.
Keyword arguments:
- `data` (required): . data has the following type: Array of lists containing elements 'id', 'value'.
Those elements have the following types:
  - `id` (String; required)
  - `value` (Real; required)s
- `height` (Real; optional)
- `hoveredId` (String; optional)
- `notchHeight` (Real; optional)
- `style` (optional): . style has the following type: lists containing elements 'positive', 'negative', 'background'.
Those elements have the following types:
  - `positive` (String; optional)
  - `negative` (String; optional)
  - `background` (String; optional)
- `width` (Real; optional)
"""
function forceplot(; kwargs...)
        available_props = Symbol[:data, :height, :hoveredId, :notchHeight, :style, :width]
        wild_props = Symbol[]
        return Component("forceplot", "ForcePlot", "dash_feature_impact", available_props, wild_props; kwargs...)
end

