import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, YAxis, ReferenceLine } from 'recharts';
import { max, min } from 'lodash';

/**
 * DistributionPlot creates a vertical density plot showing the distribution
 * of model predictions. The density spreads horizontally while the prediction
 * values run vertically.
 * 
 * Key features:
 * - Vertical orientation with prediction values on Y-axis
 * - Smoothed density calculation using Gaussian kernel
 * - Current prediction value marker
 * - Responsive sizing
 */
const DistributionPlot = ({ data, currentValue, height, width, color }) => {
    // Calculate the density distribution data with Gaussian smoothing
    const plotData = useMemo(() => {
        // Find the range of our data
        const minVal = min(data);
        const maxVal = max(data);
        const range = maxVal - minVal;
        
        // Create bins for density calculation
        // More bins = smoother curve, but more computational overhead
        const binCount = 100;
        const binSize = range / binCount;
        const bins = new Array(binCount).fill(0);
        
        // Calculate optimal bandwidth (Silverman's rule of thumb)
        const standardDev = Math.sqrt(
            data.reduce((sum, x) => sum + Math.pow(x - data.reduce((a, b) => a + b) / data.length, 2), 0) 
            / (data.length - 1)
        );
        const bandwidth = 0.9 * standardDev * Math.pow(data.length, -0.2);

        // Apply Gaussian kernel smoothing
        data.forEach(value => {
            for (let i = 0; i < binCount; i++) {
                const binCenter = minVal + (i * binSize);
                const distance = value - binCenter;
                // Gaussian kernel function
                bins[i] += (1 / (bandwidth * Math.sqrt(2 * Math.PI))) * 
                          Math.exp(-(distance * distance) / (2 * bandwidth * bandwidth));
            }
        });
        
        // Normalize the density values
        const maxDensity = max(bins);
        
        // Create the final plot data structure
        // Note: We reverse the density to match the screenshot's orientation
        return bins.map((density, i) => ({
            value: maxVal - (i * binSize),  // Reverse the value scale
            density: (density / maxDensity)  // Normalize density to [0,1]
        }));
    }, [data]);

    return (
        <div className="relative" style={{ width, height }}>
            <AreaChart
                data={plotData}
                width={width}
                height={height}
                margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
            >
                {/* Y-axis configuration for prediction values */}
                <YAxis
                    type="number"
                    domain={[min(data), max(data)]}
                    orientation="left"
                    axisLine={true}
                    tickLine={true}
                    fontSize={12}
                    tickFormatter={value => value.toFixed(0)}
                />
                
                {/* The distribution curve itself */}
                <Area
                    type="monotone"
                    dataKey="density"
                    stroke="none"
                    fill={color}
                    fillOpacity={0.7}
                    // Mirror the area to create symmetric density plot
                    baseValue={0.5}
                    orientation="horizontal"
                />

                {/* Current prediction value marker */}
                <ReferenceLine
                    y={currentValue}
                    stroke="#000000"
                    strokeWidth={2}
                    className="prediction-marker"
                >
                    {/* Add a circle at the intersection with the distribution */}
                    <circle
                        cx={width / 2}
                        cy={0}
                        r={4}
                        fill="#000000"
                    />
                </ReferenceLine>
            </AreaChart>
            
            {/* Optional: Add tooltip to show exact values on hover */}
            <div className="absolute top-0 left-0 p-2 text-xs text-gray-500">
                Distribution of Predictions
            </div>
        </div>
    );
};

DistributionPlot.propTypes = {
    /**
     * Array of prediction values used to create the distribution.
     * These should be numerical values representing model predictions.
     */
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    
    /**
     * The current prediction value to highlight on the distribution.
     * This value will be marked with a horizontal line and circle.
     */
    currentValue: PropTypes.number.isRequired,
    
    /**
     * Height of the plot in pixels.
     * This should match the parent container's height.
     */
    height: PropTypes.number.isRequired,
    
    /**
     * Width of the plot in pixels.
     * This should match the parent container's width.
     */
    width: PropTypes.number.isRequired,
    
    /**
     * Color for the distribution visualization.
     * This will be used with varying opacity for the density plot.
     */
    color: PropTypes.string
};

DistributionPlot.defaultProps = {
    color: '#808080'  // Default to a neutral gray
};

export default DistributionPlot;