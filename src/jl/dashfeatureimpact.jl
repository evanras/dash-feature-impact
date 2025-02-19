# AUTO GENERATED FILE - DO NOT EDIT

export dashfeatureimpact

"""
    dashfeatureimpact(;kwargs...)

A DashFeatureImpact component.
DashFeatureImpact Component

Main component for visualizing feature impacts from machine learning models.
Combines KDE plot, force plot, and AG Grid table with a responsive layout.
Provides interactive features including hover synchronization and auto-scrolling.
Keyword arguments:
- `contributions` (required): The contributions of features. Array of objects with 'id' and 'value' fields. contributions has the following type: Array of lists containing elements 'id', 'value'.
Those elements have the following types:
  - `id` (String; required)
  - `value` (Real; required)s
- `dimensions` (optional): Size/dimension configuration. dimensions has the following type: lists containing elements 'height', 'kdePlotWidth', 'forcePlotWidth', 'tableWidth', 'margins'.
Those elements have the following types:
  - `height` (Real; optional)
  - `kdePlotWidth` (Real; optional)
  - `forcePlotWidth` (Real; optional)
  - `tableWidth` (Real | a value equal to: 'auto'; optional)
  - `margins` (optional): . margins has the following type: lists containing elements 'top', 'right', 'bottom', 'left'.
Those elements have the following types:
  - `top` (Real; optional)
  - `right` (Real; optional)
  - `bottom` (Real; optional)
  - `left` (Real; optional)
- `gridOptions` (Dict; optional): Additional options to pass directly to AG Grid
- `idColumn` (String; required): Name of the column in tableData that matches the 'id' field from contributions
- `kdeData` (required): Data to build the KDE Plot visualization. kdeData has the following type: lists containing elements 'points', 'prediction', 'predictionDate'.
Those elements have the following types:
  - `points` (Array of Array of Realss; required)
  - `prediction` (Real; required)
  - `predictionDate` (String; optional)
- `predictionTooltip` (String; optional): Text to display in the tooltip for the prediction point
- `style` (optional): Styling configuration. style has the following type: lists containing elements 'colors'.
Those elements have the following types:
  - `colors` (optional): . colors has the following type: lists containing elements 'positive', 'negative', 'connecting', 'background', 'text', 'predictionColor'.
Those elements have the following types:
  - `positive` (String; optional)
  - `negative` (String; optional)
  - `connecting` (String; optional)
  - `background` (String; optional)
  - `text` (String; optional)
  - `predictionColor` (String; optional)
- `tableData` (Array of Dicts; required): Data to display in table format. Must include the column specified by idColumn
"""
function dashfeatureimpact(; kwargs...)
        available_props = Symbol[:contributions, :dimensions, :gridOptions, :idColumn, :kdeData, :predictionTooltip, :style, :tableData]
        wild_props = Symbol[]
        return Component("dashfeatureimpact", "DashFeatureImpact", "dash_feature_impact", available_props, wild_props; kwargs...)
end

