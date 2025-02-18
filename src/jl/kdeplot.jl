# AUTO GENERATED FILE - DO NOT EDIT

export kdeplot

"""
    kdeplot(;kwargs...)

A KDEPlot component.
KDEPlot Component
Renders a kernel density estimation plot showing the distribution of predictions
with the current prediction highlighted.
Keyword arguments:
- `data` (required): . data has the following type: lists containing elements 'points', 'prediction'.
Those elements have the following types:
  - `points` (Array of Array of Realss; required)
  - `prediction` (Real; required)
- `height` (Real; optional)
- `margins` (optional): . margins has the following type: lists containing elements 'top', 'right', 'bottom', 'left'.
Those elements have the following types:
  - `top` (Real; optional)
  - `right` (Real; optional)
  - `bottom` (Real; optional)
  - `left` (Real; optional)
- `style` (optional): . style has the following type: lists containing elements 'areaColor', 'predictionColor', 'gridColor', 'textColor', 'background'.
Those elements have the following types:
  - `areaColor` (String; optional)
  - `predictionColor` (String; optional)
  - `gridColor` (String; optional)
  - `textColor` (String; optional)
  - `background` (String; optional)
- `width` (Real; optional)
"""
function kdeplot(; kwargs...)
        available_props = Symbol[:data, :height, :margins, :style, :width]
        wild_props = Symbol[]
        return Component("kdeplot", "KDEPlot", "dash_feature_impact", available_props, wild_props; kwargs...)
end

