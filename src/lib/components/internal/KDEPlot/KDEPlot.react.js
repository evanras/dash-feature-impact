const React = require('react');
const PropTypes = require('prop-types');
const d3 = require('d3');

/**
 * KDEPlot Component
 * Renders a kernel density estimation plot with a tooltip that can break out of containers
 */
const KDEPlot = ({
    data,
    width = 300,
    height = 600,
    predictionTooltip,
    margins = {
        top: 20,
        right: 30,
        bottom: 20,
        left: 60
    },
    style = {}
}) => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    const containerRef = React.useRef(null);
    const predictionPointRef = React.useRef(null);
    
    // Calculate inner dimensions
    const innerWidth = width - margins.left - margins.right;
    const innerHeight = height - margins.top - margins.bottom;

    // Create scales and calculate paths
    const plotData = React.useMemo(() => {
        // Get data boundaries
        const valueMin = Math.min(...data.points.map(d => d[0]));
        const valueMax = Math.max(...data.points.map(d => d[0]));

        // Create scales
        const xScale = d3.scaleLinear()
            .domain([0, 1]) // Density on x-axis
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([valueMin, valueMax])
            .range([innerHeight, 0])
            .nice();

        // Generate area path using d3.area
        const areaGenerator = d3.area()
            .y(d => yScale(d[0]))     // Value on y-axis
            .x0(0)                     // Start from left edge
            .x1(d => xScale(d[1]));    // Density determines width

        const areaPath = areaGenerator(data.points);

        // Find the density value for the prediction point using interpolation
        let predictionDensity;
        
        // Find the two points that bracket our prediction value
        const index = data.points.findIndex(point => point[0] >= data.prediction);
        
        // If prediction is outside our data range, use closest endpoint
        if (index === -1) {
            predictionDensity = data.points[data.points.length - 1][1];
        } else if (index === 0) {
            predictionDensity = data.points[0][1];
        } else {
            // Get the two bracketing points
            const pointAfter = data.points[index];
            const pointBefore = data.points[index - 1];
            
            // Linear interpolation
            const t = (data.prediction - pointBefore[0]) / (pointAfter[0] - pointBefore[0]);
            predictionDensity = pointBefore[1] + t * (pointAfter[1] - pointBefore[1]);
        }

        return {
            xScale,
            yScale,
            areaPath,
            predictionPoint: {
                x: xScale(predictionDensity),
                y: yScale(data.prediction),
                predictionValue: data.prediction
            }
        };
    }, [data, innerWidth, innerHeight]);

    // Calculate tooltip position using window coordinates
    const updateTooltipPosition = React.useCallback(() => {
        if (predictionPointRef.current && containerRef.current) {
            const pointRect = predictionPointRef.current.getBoundingClientRect();
            setTooltipPosition({
                x: pointRect.left + pointRect.width/2,
                y: pointRect.top
            });
        }
    }, []);

    // Update position when showing tooltip
    React.useEffect(() => {
        if (showTooltip) {
            updateTooltipPosition();
            
            // Add window resize listener
            window.addEventListener('resize', updateTooltipPosition);
            window.addEventListener('scroll', updateTooltipPosition);
            
            return () => {
                window.removeEventListener('resize', updateTooltipPosition);
                window.removeEventListener('scroll', updateTooltipPosition);
            };
        }
    }, [showTooltip, updateTooltipPosition]);

    // Generate tick marks
    const yTicks = React.useMemo(() => {
        return plotData.yScale.ticks(5).map(tick => ({
            value: tick,
            y: plotData.yScale(tick)
        }));
    }, [plotData.yScale]);

    const xTicks = React.useMemo(() => {
        return plotData.xScale.ticks(3).map(tick => ({
            value: tick,
            x: plotData.xScale(tick)
        }));
    }, [plotData.xScale]);

    // Format the tooltip text
    const getTooltipContent = () => {
        if (predictionTooltip) {
            return predictionTooltip;
        }
        return `Prediction: ${data.prediction.toFixed(2)}`;
    };

    return (
        <div className="kde-plot" ref={containerRef} style={{ position: 'relative' }}>
            <svg width={width} height={height}>
                <g transform={`translate(${margins.left},${margins.top})`}>
                    {/* Background grid */}
                    <g className="grid-lines">
                        {yTicks.map(tick => (
                            <line
                                key={tick.value}
                                x1={0}
                                x2={innerWidth}
                                y1={tick.y}
                                y2={tick.y}
                                className="grid-line"
                                style={{ stroke: style.gridColor || '#e2e8f0', strokeDasharray: '2,2' }}
                            />
                        ))}
                    </g>

                    {/* Y-axis */}
                    <g className="y-axis">
                        {yTicks.map(tick => (
                            <g key={tick.value} transform={`translate(0,${tick.y})`}>
                                <line
                                    x1={-6}
                                    x2={0}
                                    className="tick-line"
                                    style={{ stroke: style.textColor || '#666' }}
                                />
                                <text
                                    x={-10}
                                    dy=".32em"
                                    textAnchor="end"
                                    className="tick-text"
                                    style={{ fill: style.textColor || '#666', fontSize: '12px' }}
                                >
                                    {tick.value.toFixed(1)}
                                </text>
                            </g>
                        ))}
                        <line
                            y1={0}
                            y2={innerHeight}
                            className="axis-line"
                            style={{ stroke: style.textColor || '#666' }}
                        />
                    </g>

                    {/* X-axis */}
                    <g className="x-axis" transform={`translate(0,${innerHeight})`}>
                        {xTicks.map(tick => (
                            <g key={tick.value} transform={`translate(${tick.x},0)`}>
                                <line
                                    y1={0}
                                    y2={6}
                                    className="tick-line"
                                    style={{ stroke: style.textColor || '#666' }}
                                />
                                <text
                                    y={20}
                                    textAnchor="middle"
                                    className="tick-text"
                                    style={{ fill: style.textColor || '#666', fontSize: '12px' }}
                                >
                                    {tick.value.toFixed(1)}
                                </text>
                            </g>
                        ))}
                        <line
                            x1={0}
                            x2={innerWidth}
                            className="axis-line"
                            style={{ stroke: style.textColor || '#666' }}
                        />
                    </g>

                    {/* Density area */}
                    <path
                        d={plotData.areaPath}
                        className="density-area"
                        style={{ 
                            fill: style.areaColor || '#e2e8f0',
                            stroke: style.areaStroke || '#94a3b8',
                            strokeWidth: 1.5
                        }}
                    />

                    {/* Prediction point and line */}
                    <g className="prediction-indicator">
                        <line
                            x1={0}
                            x2={plotData.predictionPoint.x}
                            y1={plotData.predictionPoint.y}
                            y2={plotData.predictionPoint.y}
                            className="prediction-line"
                            style={{ 
                                stroke: style.predictionColor || '#3b82f6',
                                strokeWidth: 1.5,
                                strokeDasharray: '4,2' 
                            }}
                        />
                        <circle
                            ref={predictionPointRef}
                            cx={plotData.predictionPoint.x}
                            cy={plotData.predictionPoint.y}
                            r={5}
                            className="prediction-point"
                            style={{ 
                                fill: style.predictionColor || '#3b82f6',
                                stroke: style.background || '#fff',
                                strokeWidth: 2,
                                cursor: 'pointer'
                            }}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        />
                    </g>
                </g>
            </svg>
            
            {/* Portal-based tooltip that can break out of containers */}
            {showTooltip && createPortal(
                <div 
                    className="kde-tooltip-portal"
                    style={{
                        position: 'fixed',
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y}px`,
                        transform: 'translate(0%, -100%)',
                        backgroundColor: 'rgb(255, 255, 255)',
                        color: 'black',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        // border: '1px solid black',
                        fontSize: '12px',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                        zIndex: 10000,
                        boxShadow: '1px 3px 5px rgba(0,0,0,0.6)',
                        maxWidth: '250px',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                    }}
                >
                    {getTooltipContent()}
                    <div 
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '100%',
                            transform: 'translateX(-50%)',
                            width: '0',
                            height: '0',
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderTop: '6px solid rgb(241, 237, 237)',
                            filter: 'drop-shadow(0 1px 0 rgba(0,0,0,0.2))'
                        }}
                    />
                </div>,
                document.body
            )}
        </div>
    );
};

// Import at the top of your file
const { createPortal } = require('react-dom');

KDEPlot.propTypes = {
    data: PropTypes.shape({
        points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
        prediction: PropTypes.number.isRequired
    }).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    predictionTooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    margins: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number
    }),
    style: PropTypes.shape({
        areaColor: PropTypes.string,
        areaStroke: PropTypes.string,
        predictionColor: PropTypes.string,
        gridColor: PropTypes.string,
        textColor: PropTypes.string,
        background: PropTypes.string
    })
};

module.exports = KDEPlot;