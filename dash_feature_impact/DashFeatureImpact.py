# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashFeatureImpact(Component):
    """A DashFeatureImpact component.
DashFeatureImpact Component

Main component for visualizing feature impacts from machine learning models.
Combines KDE plot, force plot, and AG Grid table with a responsive layout.
Provides interactive features including hover synchronization and auto-scrolling.

Keyword arguments:

- contributions (list of dicts; required):
    The contributions of features. Array of objects with 'id' and
    'value' fields.

    `contributions` is a list of dicts with keys:

    - id (string; required)

    - value (number; required)

- dimensions (dict; optional):
    Size/dimension configuration.

    `dimensions` is a dict with keys:

    - height (number; optional)

    - kdePlotWidth (number; optional)

    - forcePlotWidth (number; optional)

    - tableWidth (number | a value equal to: 'auto'; optional)

    - margins (dict; optional)

        `margins` is a dict with keys:

        - top (number; optional)

        - right (number; optional)

        - bottom (number; optional)

        - left (number; optional)

- gridOptions (dict; optional):
    Additional options to pass directly to AG Grid.

- idColumn (string; required):
    Name of the column in tableData that matches the 'id' field from
    contributions.

- kdeData (dict; required):
    Data to build the KDE Plot visualization.

    `kdeData` is a dict with keys:

    - points (list of list of numberss; required)

    - prediction (number; required)

    - predictionDate (string; optional)

- predictionTooltip (string; optional):
    Text to display in the tooltip for the prediction point.

- style (dict; optional):
    Styling configuration.

    `style` is a dict with keys:

    - colors (dict; optional)

        `colors` is a dict with keys:

        - positive (string; optional)

        - negative (string; optional)

        - connecting (string; optional)

        - background (string; optional)

        - text (string; optional)

        - predictionColor (string; optional)

- tableData (list of dicts; required):
    Data to display in table format. Must include the column specified
    by idColumn."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_feature_impact'
    _type = 'DashFeatureImpact'
    @_explicitize_args
    def __init__(self, contributions=Component.REQUIRED, tableData=Component.REQUIRED, idColumn=Component.REQUIRED, kdeData=Component.REQUIRED, predictionTooltip=Component.UNDEFINED, style=Component.UNDEFINED, dimensions=Component.UNDEFINED, gridOptions=Component.UNDEFINED, onHover=Component.UNDEFINED, onClick=Component.UNDEFINED, **kwargs):
        self._prop_names = ['contributions', 'dimensions', 'gridOptions', 'idColumn', 'kdeData', 'predictionTooltip', 'style', 'tableData']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['contributions', 'dimensions', 'gridOptions', 'idColumn', 'kdeData', 'predictionTooltip', 'style', 'tableData']
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
