# AUTO GENERATED FILE - DO NOT EDIT

export aggridfeaturetable

"""
    aggridfeaturetable(;kwargs...)

An AGGridFeatureTable component.
AGGridFeatureTable Component

A feature-rich grid component that:
1. Synchronizes bidirectionally with ForcePlot for highlighting
2. Supports programmatic scrolling to specific rows
3. Allows configurable width

@param {Object[]} data - Array of data objects to display in the table
@param {string} idColumn - Name of the column that serves as the unique identifier
@param {Map} contributions - Map of feature IDs to contribution values
@param {number} height - Height of the table container in pixels
@param {number} width - Width of the table container (optional)
@param {Object} style - Styling configuration
@param {Function} onScroll - Callback when table scrolls, provides visible rows info
@param {Function} onHover - Callback when row is hovered
@param {Function} onClick - Callback when row is clicked
@param {string} hoveredId - ID of currently hovered element
@param {Object} gridOptions - Additional AG Grid options
Keyword arguments:
- `data` (Array of Dicts; required): Array of data objects to display in the table
- `gridOptions` (Dict; optional): Additional AG Grid options to pass through
- `height` (Real; optional): Height of the table container in pixels
- `hoveredId` (String; optional): ID of currently hovered row for highlighting
- `idColumn` (String; required): Name of the column in tableData that matches the 'id' field from contributions
- `style` (optional): Styling configuration. style has the following type: lists containing elements 'textColor', 'background', 'headerBackground', 'highlightBackground'.
Those elements have the following types:
  - `textColor` (String; optional)
  - `background` (String; optional)
  - `headerBackground` (String; optional)
  - `highlightBackground` (String; optional)
- `width` (Real | String; optional): Width of the table container (optional, defaults to 100%)
"""
function aggridfeaturetable(; kwargs...)
        available_props = Symbol[:data, :gridOptions, :height, :hoveredId, :idColumn, :style, :width]
        wild_props = Symbol[]
        return Component("aggridfeaturetable", "AGGridFeatureTable", "dash_feature_impact", available_props, wild_props; kwargs...)
end

