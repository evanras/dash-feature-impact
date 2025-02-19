# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class ConnectingLine(Component):
    """A ConnectingLine component.
ConnectingLine Component
Creates SVG paths connecting different elements of the visualization
with optional labels and styling.

Keyword arguments:

- end (dict; required)

    `end` is a dict with keys:

    - x (number; required)

    - y (number; required)

- pathStyle (a value equal to: 'kde-to-force', 'force-to-table'; required)

- start (dict; required)

    `start` is a dict with keys:

    - x (number; required)

    - y (number; required)

- style (dict; default {    strokeWidth: 1.5,    stroke: '#666',    background: 'white'})

    `style` is a dict with keys:

    - strokeWidth (number; optional)

    - stroke (string; optional)

    - background (string; optional)

    - opacity (number; optional)

- tooltipContent (string; optional)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_feature_impact'
    _type = 'ConnectingLine'
    @_explicitize_args
    def __init__(self, start=Component.REQUIRED, end=Component.REQUIRED, pathStyle=Component.REQUIRED, tooltipContent=Component.UNDEFINED, style=Component.UNDEFINED, **kwargs):
        self._prop_names = ['end', 'pathStyle', 'start', 'style', 'tooltipContent']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['end', 'pathStyle', 'start', 'style', 'tooltipContent']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['end', 'pathStyle', 'start']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(ConnectingLine, self).__init__(**args)
