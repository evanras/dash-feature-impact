# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class AGGridFeatureTable(Component):
    """An AGGridFeatureTable component.
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

- data (list of dicts; required):
    Array of data objects to display in the table.

- gridOptions (dict; optional):
    Additional AG Grid options to pass through.

- height (number; optional):
    Height of the table container in pixels.

- hoveredId (string; optional):
    ID of currently hovered row for highlighting.

- idColumn (string; required):
    Name of the column in tableData that matches the 'id' field from
    contributions.

- style (dict; optional):
    Styling configuration.

    `style` is a dict with keys:

    - textColor (string; optional)

    - background (string; optional)

    - headerBackground (string; optional)

    - highlightBackground (string; optional)

- width (number | string; optional):
    Width of the table container (optional, defaults to 100%)."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_feature_impact'
    _type = 'AGGridFeatureTable'
    @_explicitize_args
    def __init__(self, data=Component.REQUIRED, idColumn=Component.REQUIRED, contributions=Component.REQUIRED, height=Component.UNDEFINED, width=Component.UNDEFINED, style=Component.UNDEFINED, onScroll=Component.UNDEFINED, onHover=Component.UNDEFINED, onClick=Component.UNDEFINED, hoveredId=Component.UNDEFINED, gridOptions=Component.UNDEFINED, **kwargs):
        self._prop_names = ['data', 'gridOptions', 'height', 'hoveredId', 'idColumn', 'style', 'width']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['data', 'gridOptions', 'height', 'hoveredId', 'idColumn', 'style', 'width']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['data', 'idColumn']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(AGGridFeatureTable, self).__init__(**args)
