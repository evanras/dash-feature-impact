# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class FeatureTable(Component):
    """A FeatureTable component.
FeatureTable Component
Displays feature data in a scrollable table with dynamic columns and interaction

Keyword arguments:

- data (list of dicts; required)

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
    _type = 'FeatureTable'
    @_explicitize_args
    def __init__(self, data=Component.REQUIRED, idColumn=Component.REQUIRED, contributions=Component.REQUIRED, height=Component.UNDEFINED, style=Component.UNDEFINED, onScroll=Component.UNDEFINED, onHover=Component.UNDEFINED, onClick=Component.UNDEFINED, hoveredId=Component.UNDEFINED, **kwargs):
        self._prop_names = ['data', 'height', 'hoveredId', 'idColumn', 'style']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['data', 'height', 'hoveredId', 'idColumn', 'style']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['data', 'idColumn']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(FeatureTable, self).__init__(**args)
