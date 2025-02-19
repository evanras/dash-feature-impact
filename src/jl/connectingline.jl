# AUTO GENERATED FILE - DO NOT EDIT

export connectingline

"""
    connectingline(;kwargs...)

A ConnectingLine component.
ConnectingLine Component
Creates SVG paths connecting different elements of the visualization
with optional labels and styling.
Keyword arguments:
- `end` (required): . end has the following type: lists containing elements 'x', 'y'.
Those elements have the following types:
  - `x` (Real; required)
  - `y` (Real; required)
- `pathStyle` (a value equal to: 'kde-to-force', 'force-to-table'; required)
- `start` (required): . start has the following type: lists containing elements 'x', 'y'.
Those elements have the following types:
  - `x` (Real; required)
  - `y` (Real; required)
- `style` (optional): . style has the following type: lists containing elements 'strokeWidth', 'stroke', 'background', 'opacity'.
Those elements have the following types:
  - `strokeWidth` (Real; optional)
  - `stroke` (String; optional)
  - `background` (String; optional)
  - `opacity` (Real; optional)
- `tooltipContent` (String; optional)
"""
function connectingline(; kwargs...)
        available_props = Symbol[:pathStyle, :start, :style, :tooltipContent]
        wild_props = Symbol[]
        return Component("connectingline", "ConnectingLine", "dash_feature_impact", available_props, wild_props; kwargs...)
end

