# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class AGGridFeatureTable(Component):
    """An AGGridFeatureTable component.
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

- data (list of dicts; required)

- gridOptions (dict; optional)

- height (number; optional)

- hoveredId (string; optional)

- idColumn (string; required)

- style (dict; optional)

    `style` is a dict with keys:

    - textColor (string; optional)

    - background (string; optional)

    - headerBackground (string; optional)

    - highlightBackground (string; optional)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_feature_impact'
    _type = 'AGGridFeatureTable'
    @_explicitize_args
    def __init__(self, data=Component.REQUIRED, idColumn=Component.REQUIRED, contributions=Component.REQUIRED, height=Component.UNDEFINED, style=Component.UNDEFINED, onScroll=Component.UNDEFINED, onHover=Component.UNDEFINED, onClick=Component.UNDEFINED, hoveredId=Component.UNDEFINED, gridOptions=Component.UNDEFINED, **kwargs):
        self._prop_names = ['data', 'gridOptions', 'height', 'hoveredId', 'idColumn', 'style']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['data', 'gridOptions', 'height', 'hoveredId', 'idColumn', 'style']
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
