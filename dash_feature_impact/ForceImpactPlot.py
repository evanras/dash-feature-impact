# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class ForceImpactPlot(Component):
    """A ForceImpactPlot component.
ForceImpactPlot visualizes how each feature contributes to the final prediction,
showing positive and negative impacts with colored bars and connecting lines to
the feature table.

@param {Object} props
@param {number} props.baseValue - Starting value before feature impacts
@param {Array<Object>} props.features - Array of features with their contributions
@param {number} props.height - Height of the plot
@param {number} props.width - Width of the plot
@param {Object} props.colors - Colors for positive/negative impacts
@param {number} props.tableScrollPosition - Current scroll position of feature table

Keyword arguments:

- baseValue (number; required):
    Starting value before feature impacts are applied.

- colors (dict; default {    positive: '#31acde',    negative: '#f73751'}):
    Colors for positive and negative impacts.

    `colors` is a dict with keys:

    - positive (string; optional)

    - negative (string; optional)

- features (list of dicts; required):
    Array of features with their contribution values.

    `features` is a list of dicts with keys:

    - name (string; required)

    - contribution (number; required)

- height (number; required):
    Height of the plot in pixels.

- tableScrollPosition (number; default 0):
    Current scroll position of the feature table.

- width (number; required):
    Width of the plot in pixels."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_feature_impact'
    _type = 'ForceImpactPlot'
    @_explicitize_args
    def __init__(self, baseValue=Component.REQUIRED, features=Component.REQUIRED, height=Component.REQUIRED, width=Component.REQUIRED, colors=Component.UNDEFINED, tableScrollPosition=Component.UNDEFINED, **kwargs):
        self._prop_names = ['baseValue', 'colors', 'features', 'height', 'tableScrollPosition', 'width']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['baseValue', 'colors', 'features', 'height', 'tableScrollPosition', 'width']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['baseValue', 'features', 'height', 'width']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(ForceImpactPlot, self).__init__(**args)
