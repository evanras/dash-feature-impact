# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class ForcePlot(Component):
    """A ForcePlot component.
ForcePlot component visualizes feature contributions as stacked segments, 
with positive and negative contributions separated by a transition gap.

Keyword arguments:

- data (list of dicts; required)

    `data` is a list of dicts with keys:

    - id (string; required)

    - value (number; required)

- height (number; default 600)

- hoveredId (string; optional)

- style (dict; optional)

    `style` is a dict with keys:

    - positive (string; optional)

    - negative (string; optional)

    - background (string; optional)

- width (number; default 400)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_feature_impact'
    _type = 'ForcePlot'
    @_explicitize_args
    def __init__(self, data=Component.REQUIRED, width=Component.UNDEFINED, height=Component.UNDEFINED, style=Component.UNDEFINED, hoveredId=Component.UNDEFINED, onTransitionPointFound=Component.UNDEFINED, onSegmentPositionsUpdate=Component.UNDEFINED, onHover=Component.UNDEFINED, onClick=Component.UNDEFINED, **kwargs):
        self._prop_names = ['data', 'height', 'hoveredId', 'style', 'width']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['data', 'height', 'hoveredId', 'style', 'width']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['data']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(ForcePlot, self).__init__(**args)
