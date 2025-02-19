# AUTO GENERATED FILE - DO NOT EDIT

export distributionplot

"""
    distributionplot(;kwargs...)

A DistributionPlot component.
DistributionPlot creates a vertical density plot showing the distribution
of model predictions. The density spreads horizontally while the prediction
values run vertically.

Key features:
- Vertical orientation with prediction values on Y-axis
- Smoothed density calculation using Gaussian kernel
- Current prediction value marker
- Responsive sizing
Keyword arguments:
- `color` (String; optional): Color for the distribution visualization.
This will be used with varying opacity for the density plot.
- `currentValue` (Real; required): The current prediction value to highlight on the distribution.
This value will be marked with a horizontal line and circle.
- `data` (Array of Reals; required): Array of prediction values used to create the distribution.
These should be numerical values representing model predictions.
- `height` (Real; required): Height of the plot in pixels.
This should match the parent container's height.
- `width` (Real; required): Width of the plot in pixels.
This should match the parent container's width.
"""
function distributionplot(; kwargs...)
        available_props = Symbol[:color, :currentValue, :data, :height, :width]
        wild_props = Symbol[]
        return Component("distributionplot", "DistributionPlot", "dash_feature_impact", available_props, wild_props; kwargs...)
end

