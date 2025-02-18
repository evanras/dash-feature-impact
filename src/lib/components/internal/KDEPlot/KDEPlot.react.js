const React = require('react');
const PropTypes = require('prop-types');
const d3 = require('d3');

/**
 * KDEPlot Component
 * Renders a kernel density estimation plot showing the distribution of predictions
 * with the current prediction highlighted.
 */
const KDEPlot = ({
    data,
    width = 300,
    height = 600,
    margins = {
        top: 20,
        right: 30,
        bottom: 20,
        left: 60
    },
    style = {}
}) => {
    // Calculate inner dimensions
    const innerWidth = width - margins.left - margins.right;
    const innerHeight = height - margins.top - margins.bottom;

    // Create scales and calculate paths
    const plotData = React.useMemo(() => {
        // Create scales
        const xScale = d3.scaleLinear()
            .domain([0, 1]) // Density on x-axis
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([
                Math.min(...data.points.map(d => d[0])),
                Math.max(...data.points.map(d => d[0]))
            ])
            .range([innerHeight, 0])
            .nice();

        // Generate area path
        const areaPath = data.points.reduce((path, [value, density], i) => {
            const x = xScale(density);
            const y = yScale(value);
            const command = i === 0 ? 'M' : 'L';
            return `${path} ${command} ${x},${y}`;
        }, '');

        // Find density at prediction point
        const predictionPoint = data.points.reduce((closest, point) => {
            if (Math.abs(point[0] - data.prediction) < Math.abs(closest[0] - data.prediction)) {
                return point;
            }
            return closest;
        }, data.points[0]);

        return {
            xScale,
            yScale,
            areaPath,
            predictionPoint: {
                x: xScale(predictionPoint[1]),
                y: yScale(data.prediction)
            }
        };
    }, [data, innerWidth, innerHeight]);

    // Generate tick marks
    const yTicks = React.useMemo(() => {
        return plotData.yScale.ticks(10).map(tick => ({
            value: tick,
            y: plotData.yScale(tick)
        }));
    }, [plotData.yScale]);

    const xTicks = React.useMemo(() => {
        return plotData.xScale.ticks(5).map(tick => ({
            value: tick,
            x: plotData.xScale(tick)
        }));
    }, [plotData.xScale]);

    return (
        <div className="kde-plot">
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
                                style={{ stroke: style.gridColor || '#e2e8f0' }}
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
                                    className="tick-text"
                                    style={{ fill: style.textColor || '#666' }}
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
                                    style={{ fill: style.textColor || '#666' }}
                                >
                                    {tick.value.toFixed(2)}
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
                        d={`${plotData.areaPath} L ${innerWidth},${innerHeight} L 0,${innerHeight} Z`}
                        className="density-area"
                        style={{ fill: style.areaColor || '#e2e8f0' }}
                    />

                    {/* Prediction point and line */}
                    <g className="prediction-indicator">
                        <line
                            x1={0}
                            x2={plotData.predictionPoint.x}
                            y1={plotData.predictionPoint.y}
                            y2={plotData.predictionPoint.y}
                            className="prediction-line"
                            style={{ stroke: style.predictionColor || '#666' }}
                        />
                        <circle
                            cx={plotData.predictionPoint.x}
                            cy={plotData.predictionPoint.y}
                            r={4}
                            className="prediction-point"
                            style={{ 
                                fill: style.predictionColor || '#666',
                                stroke: style.background || '#fff'
                            }}
                        />
                    </g>
                </g>
            </svg>
        </div>
    );
};

KDEPlot.propTypes = {
    data: PropTypes.shape({
        points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
        prediction: PropTypes.number.isRequired
    }).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    margins: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number
    }),
    style: PropTypes.shape({
        areaColor: PropTypes.string,
        predictionColor: PropTypes.string,
        gridColor: PropTypes.string,
        textColor: PropTypes.string,
        background: PropTypes.string
    })
};

module.exports = KDEPlot;