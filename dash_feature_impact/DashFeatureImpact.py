# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashFeatureImpact(Component):
    """A DashFeatureImpact component.
Main component for visualizing feature impacts from machine learning models.
Combines KDE plot, force plot, and feature table with connecting elements.

Keyword arguments:

- contributions (list of dicts; required):
    The contributions of features. Dict with keys 'id' and 'value'
    where 'id' is expected to match the 'idColumn' in 'tableData'.

    `contributions` is a list of dicts with keys:

    - id (string; required)

    - value (number; required)

- dimensions (dict; optional):
    Size configurations for components in the visual.

- idColumn (string; required):
    Name of the column in 'tableData' that matches the 'id' field from
    'contributions'.

- kdeData (dict; required):
    Data to build the KDE Plot from.

    `kdeData` is a dict with keys:

    - points (list of list of numberss; required)

    - prediction (number; required)

    - predictionDate (optional)

- predictionTooltip (string; optional):
    Text to display in the line connecting the prediction point to
    Force Plot.

- style (dict; optional):
    Style components.

- tableData (list of dicts; required):
    Data to display in a tabular format to the rigth of the force
    plot."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_feature_impact'
    _type = 'DashFeatureImpact'
    @_explicitize_args
    def __init__(self, contributions=Component.REQUIRED, tableData=Component.REQUIRED, idColumn=Component.REQUIRED, kdeData=Component.REQUIRED, predictionTooltip=Component.UNDEFINED, style=Component.UNDEFINED, dimensions=Component.UNDEFINED, onHover=Component.UNDEFINED, onClick=Component.UNDEFINED, **kwargs):
        self._prop_names = ['contributions', 'dimensions', 'idColumn', 'kdeData', 'predictionTooltip', 'style', 'tableData']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['contributions', 'dimensions', 'idColumn', 'kdeData', 'predictionTooltip', 'style', 'tableData']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['contributions', 'idColumn', 'kdeData', 'tableData']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(DashFeatureImpact, self).__init__(**args)
