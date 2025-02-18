# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class KDEPlot(Component):
    """A KDEPlot component.
KDEPlot Component
Renders a kernel density estimation plot showing the distribution of predictions
with the current prediction highlighted.

Keyword arguments:

- data (dict; required)

    `data` is a dict with keys:

    - points (list of list of numberss; required)

    - prediction (number; required)

- height (number; default 600)

- margins (dict; default {    top: 20,    right: 30,    bottom: 20,    left: 60})

    `margins` is a dict with keys:

    - top (number; optional)

    - right (number; optional)

    - bottom (number; optional)

    - left (number; optional)

- style (dict; optional)

    `style` is a dict with keys:

    - areaColor (string; optional)

    - predictionColor (string; optional)

    - gridColor (string; optional)

    - textColor (string; optional)

    - background (string; optional)

- width (number; default 300)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_feature_impact'
    _type = 'KDEPlot'
    @_explicitize_args
    def __init__(self, data=Component.REQUIRED, width=Component.UNDEFINED, height=Component.UNDEFINED, margins=Component.UNDEFINED, style=Component.UNDEFINED, **kwargs):
        self._prop_names = ['data', 'height', 'margins', 'style', 'width']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['data', 'height', 'margins', 'style', 'width']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['data']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(KDEPlot, self).__init__(**args)
