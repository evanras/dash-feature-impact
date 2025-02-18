const React = require('react');
const PropTypes = require('prop-types');
const ForcePlot = require('./internal/ForecePlot/ForcePlot.react');
const FeatureTable = require('./internal/FeatureTable/FeatureTable.react');
const KDEPlot = require('./internal/KDEPlot/KDEPlot.react');
const ConnectingLine = require('./internal/ConnectingLine/ConnectingLine.react');
require('./DashFeatureImpact.css');

/**
 * Main component for visualizing feature impacts from machine learning models.
 * Combines KDE plot, force plot, and feature table with connecting elements.
 */
const DashFeatureImpact = ({
    contributions,
    tableData,
    idColumn,
    kdeData,
    style = {},
    dimensions = {},
    onHover,
    onClick,
    setProps
}) => {
    const [transitionPoint, setTransitionPoint] = React.useState(null);
    const [segmentPositions, setSegmentPositions] = React.useState([]);
    const [visibleRows, setVisibleRows] = React.useState([]);
    const [hoveredId, setHoveredId] = React.useState(null);

    // Get default dimensions
    const {
        width = 1200,
        height = 600,
        kdePlotWidth = 300,
        forcePlotWidth = 400,
        margins = {
            top: 20,
            right: 30,
            bottom: 20,
            left: 60
        }
    } = dimensions;

    // Get default styles
    const {
        colors = {
            positive: '#b4d9ff',
            negative: '#ffb4b4',
            connecting: '#666',
            background: '#fff',
            text: '#333'
        }
    } = style;

    // Create contributions map for efficient lookup
    const contributionsMap = React.useMemo(() => {
        return new Map(contributions.map(c => [c.id, c]));
    }, [contributions]);

    // Handle hover interactions
    const handleHover = (id) => {
        setHoveredId(id);
        if (onHover) {
            onHover(contributionsMap.get(id));
        }
    };

    // Handle click interactions
    const handleClick = (id) => {
        if (onClick) {
            onClick(contributionsMap.get(id));
        }
    };

    return (
        <div 
            className="prediction-explanation" 
            style={{ width, height }}
        >
            <div className="visualization-grid">
                <div className="kde-section">
                    <KDEPlot 
                        data={kdeData}
                        width={kdePlotWidth}
                        height={height}
                        margins={margins}
                        style={colors}
                    />
                </div>

                <div className="force-section">
                    <ForcePlot 
                        data={contributions}
                        width={forcePlotWidth}
                        height={height}
                        style={colors}
                        onTransitionPointFound={setTransitionPoint}
                        onSegmentPositionsUpdate={setSegmentPositions}
                        onHover={handleHover}
                        onClick={handleClick}
                        hoveredId={hoveredId}
                    />
                </div>

                <div className="table-section">
                    <FeatureTable 
                        data={tableData}
                        idColumn={idColumn}
                        contributions={contributionsMap}
                        height={height}
                        style={colors}
                        onScroll={setVisibleRows}
                        onHover={handleHover}
                        onClick={handleClick}
                        hoveredId={hoveredId}
                    />
                </div>
            </div>

            {/* Connections overlay */}
            <svg className="connections-overlay" width={width} height={height}>
                {/* KDE to Force Plot connection */}
                {transitionPoint && (
                    <ConnectingLine
                        start={{
                            x: kdePlotWidth - margins.right,
                            y: height / 2
                        }}
                        end={{
                            x: transitionPoint.x + kdePlotWidth,
                            y: transitionPoint.y
                        }}
                        pathStyle="kde-to-force"
                        style={{
                            stroke: colors.connecting,
                            background: colors.background
                        }}
                    />
                )}

                {/* Force Plot to Table connections */}
                {segmentPositions.map((segment, index) => {
                    const visibleRow = visibleRows.find(row => row.index === index);
                    const forceSegmentWidth = Math.min(forcePlotWidth * 0.3, 80) - 15; // same calculation
                    if (!visibleRow) return null;

                    // Calculate the correct midpoint of the segment including caret
                    const segmentMidpoint = {
                        x: kdePlotWidth + forcePlotWidth/2 + forceSegmentWidth,  // Center of force plot
                        y: segment.y  // Using the midpoint y-position provided by ForcePlot
                    };

                    // Calculate table row position
                    const rowPosition = {
                        x: kdePlotWidth + forcePlotWidth + 15, // Start of table section
                        y: visibleRow.y // Using the midpoint y-position provided by FeatureTable
                    };

                    return (
                        <ConnectingLine
                            key={`force-table-connection-${index}`}
                            start={segmentMidpoint}
                            end={rowPosition}
                            pathStyle="force-to-table"
                            style={{
                                stroke: colors.connecting,
                                opacity: hoveredId === contributions[index].id ? 1 : 0.5
                            }}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

DashFeatureImpact.propTypes = {
    /** The contributions of features. Dict with keys 'id' and 'value' where 'id' is expected to match the 'idColumn' in 'tableData'. */
    contributions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        })
    ).isRequired,

    /** Data to display in a tabular format to the rigth of the force plot. */
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,

    /** Name of the column in 'tableData' that matches the 'id' field from 'contributions' */
    idColumn: PropTypes.string.isRequired,

    /** Data to build the KDE Plot from. */
    kdeData: PropTypes.shape({
        points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
        prediction: PropTypes.number.isRequired,
        predictionDate: PropTypes.instanceOf(Date)
    }).isRequired,

    /** Style components */
    style: PropTypes.object,

    /** Size configurations for components in the visual.  */
    dimensions: PropTypes.object,
    onHover: PropTypes.func,
    onClick: PropTypes.func,

    /** Optional Dash callback property */
    setProps: PropTypes.func
};

module.exports = DashFeatureImpact;