# AUTO GENERATED FILE - DO NOT EDIT

export aggridfeaturetable

"""
    aggridfeaturetable(;kwargs...)

An AGGridFeatureTable component.
AGGridFeatureTable Component

Enhanced feature table implementation using AG Grid for advanced data display,
with support for synchronized highlighting and programmatic scrolling.

@param {Object[]} data - Array of data objects to display in the table
@param {string} idColumn - Name of the column that serves as the unique identifier
@param {Map} contributions - Map of feature IDs to contribution values
@param {number} height - Height of the table container in pixels
@param {Object} style - Styling configuration object
@param {string} style.textColor - Color for table text
@param {string} style.background - Background color for table body
@param {string} style.headerBackground - Background color for table header
@param {string} style.highlightBackground - Background color for highlighted rows
@param {Function} onScroll - Callback fired when table scrolls with viewport info
@param {Function} onHover - Callback fired when row is hovered, provides row ID
@param {Function} onClick - Callback fired when row is clicked, provides row ID
@param {string} hoveredId - ID of currently hovered row for highlighting
@param {Object} gridOptions - Additional AG Grid options to pass through
Keyword arguments:
- `data` (Array of Dicts; required)
- `gridOptions` (Dict; optional)
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
function aggridfeaturetable(; kwargs...)
        available_props = Symbol[:data, :gridOptions, :height, :hoveredId, :idColumn, :style]
        wild_props = Symbol[]
        return Component("aggridfeaturetable", "AGGridFeatureTable", "dash_feature_impact", available_props, wild_props; kwargs...)
end

