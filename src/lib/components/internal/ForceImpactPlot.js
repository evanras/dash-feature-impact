import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { max, min, sum } from 'lodash';

/**
 * ForceImpactPlot visualizes how each feature contributes to the final prediction,
 * showing positive and negative impacts with colored bars and connecting lines to
 * the feature table.
 *
 * @param {Object} props
 * @param {number} props.baseValue - Starting value before feature impacts
 * @param {Array<Object>} props.features - Array of features with their contributions
 * @param {number} props.height - Height of the plot
 * @param {number} props.width - Width of the plot
 * @param {Object} props.colors - Colors for positive/negative impacts
 * @param {number} props.tableScrollPosition - Current scroll position of feature table
 */
const ForceImpactPlot = ({ 
    baseValue, 
    features, 
    height, 
    width, 
    colors,
    tableScrollPosition 
}) => {
    // Calculate dimensions and scales
    const padding = { top: 20, right: 20, bottom: 20, left: 20 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;
    
    // Calculate scaling factors and positions
    const calculations = useMemo(() => {
        const contributions = features.map(f => f.contribution);
        const maxImpact = max([Math.abs(min(contributions)), max(contributions)]);
        const scale = (plotWidth / 2) / maxImpact; // Changed scaling calculation
        
        // Calculate bar positions and dimensions
        const spacing = plotHeight / (features.length + 1); // Even spacing
        return features.map((feature, index) => {
            const barWidth = Math.abs(feature.contribution * scale);
            const barX = feature.contribution < 0 
                ? plotWidth/2 - barWidth 
                : plotWidth/2;
            
            return {
                x: barX,
                y: spacing * (index + 1) - 10, // Center bars vertically
                width: barWidth,
                height: 20,
                contribution: feature.contribution
            };
        });
    }, [features, plotWidth, plotHeight]);

    // Calculate connecting line positions
    const rowHeight = 40; // Match this with table row height
    const getLineEndY = (index) => {
        const rowPosition = (index * rowHeight) - tableScrollPosition;
        return rowPosition + (rowHeight/2);
    };

    return (
        <svg 
            width={width} 
            height={height}
            className="overflow-visible" // Allow lines to extend outside
        >
            <g transform={`translate(${padding.left},${padding.top})`}>
                {/* Base value line */}
                <line
                    x1={plotWidth/2}
                    y1={0}
                    x2={plotWidth/2}
                    y2={plotHeight}
                    stroke="#ccc"
                    strokeDasharray="4,4"
                />
                
                {/* Impact bars */}
                {calculations.map((calc, index) => (
                    <g key={`force-${index}`}>
                        {/* Bar */}
                        <rect
                            x={calc.x}
                            y={calc.y}
                            width={calc.width}
                            height={calc.height}
                            fill={calc.contribution > 0 ? colors.positive : colors.negative}
                            className="transition-all duration-200"
                        />
                        
                        {/* Connecting line */}
                        <line
                            x1={calc.contribution > 0 ? calc.x + calc.width : calc.x}
                            y1={calc.y + calc.height/2}
                            x2={width}
                            y2={getLineEndY(index)}
                            stroke="#999"
                            strokeWidth={1}
                            className="transition-all duration-200"
                        />
                    </g>
                ))}
                
                {/* Value labels */}
                {calculations.map((calc, index) => (
                    <text
                        key={`label-${index}`}
                        x={calc.contribution > 0 ? calc.x + calc.width + 5 : calc.x - 5}
                        y={calc.y + calc.height/2}
                        textAnchor={calc.contribution > 0 ? "start" : "end"}
                        alignmentBaseline="middle"
                        fontSize={12}
                        fill="#666"
                    >
                        {calc.contribution.toFixed(2)}
                    </text>
                ))}
            </g>
        </svg>
    );
};

ForceImpactPlot.propTypes = {
    /**
     * Starting value before feature impacts are applied
     */
    baseValue: PropTypes.number.isRequired,
    
    /**
     * Array of features with their contribution values
     */
    features: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            contribution: PropTypes.number.isRequired
        })
    ).isRequired,
    
    /**
     * Height of the plot in pixels
     */
    height: PropTypes.number.isRequired,
    
    /**
     * Width of the plot in pixels
     */
    width: PropTypes.number.isRequired,
    
    /**
     * Colors for positive and negative impacts
     */
    colors: PropTypes.shape({
        positive: PropTypes.string,
        negative: PropTypes.string
    }),
    
    /**
     * Current scroll position of the feature table
     */
    tableScrollPosition: PropTypes.number
};

ForceImpactPlot.defaultProps = {
    colors: {
        positive: '#31acde',
        negative: '#f73751'
    },
    tableScrollPosition: 0
};

export default ForceImpactPlot;