# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DistributionPlot(Component):
    """A DistributionPlot component.
DistributionPlot creates a vertical density plot showing the distribution
of model predictions. The density spreads horizontally while the prediction
values run vertically.

Key features:
- Vertical orientation with prediction values on Y-axis
- Smoothed density calculation using Gaussian kernel
- Current prediction value marker
- Responsive sizing

Keyword arguments:

- color (string; default '#808080'):
    Color for the distribution visualization. This will be used with
    varying opacity for the density plot.

- currentValue (number; required):
    The current prediction value to highlight on the distribution.
    This value will be marked with a horizontal line and circle.

- data (list of numbers; required):
    Array of prediction values used to create the distribution. These
    should be numerical values representing model predictions.

- height (number; required):
    Height of the plot in pixels. This should match the parent
    container's height.

- width (number; required):
    Width of the plot in pixels. This should match the parent
    container's width."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_feature_impact'
    _type = 'DistributionPlot'
    @_explicitize_args
    def __init__(self, data=Component.REQUIRED, currentValue=Component.REQUIRED, height=Component.REQUIRED, width=Component.REQUIRED, color=Component.UNDEFINED, **kwargs):
        self._prop_names = ['color', 'currentValue', 'data', 'height', 'width']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['color', 'currentValue', 'data', 'height', 'width']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['currentValue', 'data', 'height', 'width']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(DistributionPlot, self).__init__(**args)
