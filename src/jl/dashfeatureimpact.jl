# AUTO GENERATED FILE - DO NOT EDIT

export dashfeatureimpact

"""
    dashfeatureimpact(;kwargs...)

A DashFeatureImpact component.
Main component for visualizing feature impacts from machine learning models.
Combines KDE plot, force plot, and feature table with connecting elements.
Keyword arguments:
- `contributions` (required): The contributions of features. Dict with keys 'id' and 'value' where 'id' is expected to match the 'idColumn' in 'tableData'.. contributions has the following type: Array of lists containing elements 'id', 'value'.
Those elements have the following types:
  - `id` (String; required)
  - `value` (Real; required)s
- `dimensions` (Dict; optional): Size configurations for components in the visual.
- `idColumn` (String; required): Name of the column in 'tableData' that matches the 'id' field from 'contributions'
- `kdeData` (required): Data to build the KDE Plot from.. kdeData has the following type: lists containing elements 'points', 'prediction', 'predictionDate'.
Those elements have the following types:
  - `points` (Array of Array of Realss; required)
  - `prediction` (Real; required)
  - `predictionDate` (optional)
- `style` (Dict; optional): Style components
- `tableData` (Array of Dicts; required): Data to display in a tabular format to the rigth of the force plot.
"""
function dashfeatureimpact(; kwargs...)
        available_props = Symbol[:contributions, :dimensions, :idColumn, :kdeData, :style, :tableData]
        wild_props = Symbol[]
        return Component("dashfeatureimpact", "DashFeatureImpact", "dash_feature_impact", available_props, wild_props; kwargs...)
end

