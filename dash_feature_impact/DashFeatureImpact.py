# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashFeatureImpact(Component):
    """A DashFeatureImpact component.
DashFeatureImpact is a component that visualizes ML model feature importance
and their contributions to a prediction, combining distribution, force impact,
and feature table visualizations.

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- baseValue (number; required):
    The model's base/average prediction value.

- colors (dict; default {    positive: '#4299E1',    negative: '#F56565',    distribution: '#A0AEC0'}):
    Custom colors for visualization elements.

    `colors` is a dict with keys:

    - positive (string; optional)

    - negative (string; optional)

    - distribution (string; optional)

- distributionData (list of numbers; required):
    Array of prediction values used to create the distribution plot.

- features (list of dicts; required):
    Array of feature objects that contribute to the prediction.

    `features` is a list of dicts with keys:

    - name (string; required)

    - value (number | string; required)

    - contribution (number; required)

- finalPrediction (number; required):
    The final prediction value after all feature contributions.

- height (number | string; default 600):
    Height of the component (number for pixels, string for %, vh).

- width (number | string; default '100%'):
    Width of the component (number for pixels, string for %, vh)."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_feature_impact'
    _type = 'DashFeatureImpact'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, baseValue=Component.REQUIRED, features=Component.REQUIRED, distributionData=Component.REQUIRED, finalPrediction=Component.REQUIRED, colors=Component.UNDEFINED, width=Component.UNDEFINED, height=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'baseValue', 'colors', 'distributionData', 'features', 'finalPrediction', 'height', 'width']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'baseValue', 'colors', 'distributionData', 'features', 'finalPrediction', 'height', 'width']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['baseValue', 'distributionData', 'features', 'finalPrediction']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(DashFeatureImpact, self).__init__(**args)
