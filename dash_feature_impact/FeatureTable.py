# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class FeatureTable(Component):
    """A FeatureTable component.
FeatureTable displays the details of each feature including its name,
value, and contribution to the model's prediction.

Keyword arguments:

- features (list of dicts; required):
    Array of features with their details.

    `features` is a list of dicts with keys:

    - name (string; required)

    - value (number | string; required)

    - contribution (number; required)

- height (number | string; default '100%'):
    Height of the table container.

- width (number | string; default '100%'):
    Width of the table container."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_feature_impact'
    _type = 'FeatureTable'
    @_explicitize_args
    def __init__(self, features=Component.REQUIRED, onScroll=Component.REQUIRED, width=Component.UNDEFINED, height=Component.UNDEFINED, **kwargs):
        self._prop_names = ['features', 'height', 'width']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['features', 'height', 'width']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['features']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(FeatureTable, self).__init__(**args)
