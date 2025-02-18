const React = require('react');
const PropTypes = require('prop-types');
// require('./ConnectingLine.css');

/**
 * ConnectingLine Component
 * Creates SVG paths connecting different elements of the visualization
 * with optional labels and styling.
 */
const ConnectingLine = ({
    start,
    end,
    pathStyle,
    tooltipContent,
    style = {
        strokeWidth: 1.5,
        stroke: '#666',
        background: 'white'
    }
}) => {
    /**
     * Generates a path from KDE plot to force plot
     */
    const generateKdeToForcePath = (start, end) => {
        const midX = start.x + (end.x - start.x) / 2;
        return {
            path: `
                M ${start.x} ${start.y}
                L ${midX - 40} ${start.y}
                M ${midX + 40} ${start.y}
                L ${midX + 40} ${end.y}
                L ${end.x} ${end.y}
            `,
            labelPosition: { x: midX, y: start.y }
        };
    };

    /**
     * Generates a path from force plot to table
     */
    const generateForceToTablePath = (start, end) => {
        // Calculate control points for a smooth curve
        const controlPoint1X = start.x + (end.x - start.x) * 0.3;
        const controlPoint2X = start.x + (end.x - start.x) * 0.7;
    
        return {
            path: `
                M ${start.x} ${start.y}
                C ${controlPoint1X} ${start.y},
                  ${controlPoint2X} ${end.y},
                  ${end.x} ${end.y}
            `,
            labelPosition: null
        };
    };

    // Generate appropriate path based on style
    const pathData = pathStyle === 'kde-to-force' 
        ? generateKdeToForcePath(start, end)
        : generateForceToTablePath(start, end);

    return (
        <g className="connecting-line">
            {/* Connection path */}
            <path
                d={pathData.path}
                className="connection-path"
                style={{
                    stroke: style.stroke,
                    strokeWidth: style.strokeWidth,
                    opacity: style.opacity || 1,
                    transition: 'opacity 0.2s ease'
                }}
            />
            
            {/* Tooltip/label if provided */}
            {tooltipContent && pathData.labelPosition && (
                <g transform={`translate(${pathData.labelPosition.x}, ${pathData.labelPosition.y})`}>
                    <rect
                        x={-35}
                        y={-12}
                        width={70}
                        height={24}
                        rx={4}
                        className="label-background"
                        style={{ fill: style.background }}
                    />
                    <text
                        className="label-text"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ fill: style.stroke }}
                    >
                        {tooltipContent}
                    </text>
                </g>
            )}
        </g>
    );
};

ConnectingLine.propTypes = {
    start: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }).isRequired,
    end: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }).isRequired,
    pathStyle: PropTypes.oneOf(['kde-to-force', 'force-to-table']).isRequired,
    tooltipContent: PropTypes.string,
    style: PropTypes.shape({
        strokeWidth: PropTypes.number,
        stroke: PropTypes.string,
        background: PropTypes.string,
        opacity: PropTypes.number
    })
};

module.exports = ConnectingLine;