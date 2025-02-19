const React = require('react');
const PropTypes = require('prop-types');
const ForcePlot = require('./internal/ForecePlot/ForcePlot.react');
const FeatureTable = require('./internal/FeatureTable/FeatureTable.react');
const KDEPlot = require('./internal/KDEPlot/KDEPlot.react');
require('./DashFeatureImpact.css');

/**
 * DashFeatureImpact Component
 * 
 * Main component for visualizing feature impacts from machine learning models.
 * Provides a responsive layout combining KDE plot, force plot, and feature table
 * with connecting elements for interactive data exploration.
 * 
 * The component maintains consistent visual relationships between plots while
 * adapting to different screen sizes through horizontal scrolling when needed.
 */
const DashFeatureImpact = ({
    contributions,
    tableData,
    idColumn,
    kdeData,
    style = {},
    dimensions = {},
    predictionTooltip,
    onHover,
    onClick,
    setProps
}) => {
    const [transitionPoint, setTransitionPoint] = React.useState(null);
    const [segmentPositions, setSegmentPositions] = React.useState([]);
    const [visibleRows, setVisibleRows] = React.useState([]);
    const [hoveredId, setHoveredId] = React.useState(null);
    // We don't need to track container width since we're using fixed widths
    const containerRef = React.useRef(null);
    const NOTCH_HEIGHT = 15;

    // Get dimensions with simpler handling
    const {
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

    // Use fixed widths to maintain consistency
    const kdeWidth = kdePlotWidth;
    const forceWidth = forcePlotWidth;
    
    // Update CSS variables to match provided dimensions
    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.setProperty('--kde-width', `${kdePlotWidth}px`);
            containerRef.current.style.setProperty('--force-width', `${forcePlotWidth}px`);
        }
    }, [kdePlotWidth, forcePlotWidth]);

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

    /**
     * Create contributions map for efficient lookup by ID
     * 
     * Transforms the contributions array into a Map where:
     * - Keys are feature IDs
     * - Values are the corresponding contribution values
     * 
     * This improves performance when checking contributions in the table
     */
    const contributionsMap = React.useMemo(() => {
        return new Map(contributions.map(c => [c.id, c.value]));
    }, [contributions]);

    /**
     * Handle hover interactions across all visualization components
     * 
     * Updates the shared hoveredId state and triggers the onHover callback
     * with the full contribution object for the hovered element
     * 
     * @param {string} id - ID of the hovered element
     */
    const handleHover = (id) => {
        setHoveredId(id);
        if (onHover) {
            const contribution = contributions.find(c => c.id === id);
            onHover(contribution);
        }
    };

    /**
     * Handle click interactions across all visualization components
     * 
     * Triggers the onClick callback with the full contribution object
     * for the clicked element
     * 
     * @param {string} id - ID of the clicked element
     */
    const handleClick = (id) => {
        if (onClick) {
            const contribution = contributions.find(c => c.id === id);
            onClick(contribution);
        }
    };

    // We no longer need complex resize monitoring since we're using fixed widths
    // and horizontal scrolling for responsiveness

    /**
     * Handle updates to the prediction point position from KDE plot
     * Preserves the original functionality while fixing variable naming
     * 
     * @param {Object} position - Position data from KDE plot
     */
    const setPredictionPosition = (position) => {
        // Original function stub preserved
        // Implementation would go here if needed
    };

    return (
        <div 
            className="dash-feature-impact" 
            ref={containerRef}
            style={{ height }}
        >
            <div className="visualization-grid">
                <div className="kde-section">
                    <KDEPlot 
                        data={kdeData}
                        width={kdeWidth}
                        height={height}
                        predictionTooltip={predictionTooltip}
                        onPredictionPointFound={setPredictionPosition}
                        margins={margins}
                        style={{
                            areaColor: colors.positive,
                            areaStroke: colors.connecting,
                            predictionColor: colors.connecting,
                            gridColor: '#e2e8f0',
                            textColor: colors.text,
                            background: colors.background
                        }}
                    />
                </div>

                <div className="force-section">
                    <ForcePlot 
                        data={contributions}
                        width={forceWidth}
                        height={height}
                        style={{
                            positive: colors.positive,
                            negative: colors.negative,
                            background: colors.background
                        }}
                        notchHeight={NOTCH_HEIGHT}
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
                        style={{
                            textColor: colors.text,
                            background: colors.background,
                            headerBackground: '#f8fafc',
                            highlightBackground: '#f1f5f9'
                        }}
                        onScroll={setVisibleRows}
                        onHover={handleHover}
                        onClick={handleClick}
                        hoveredId={hoveredId}
                    />
                </div>
            </div>
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

    /** Data to display in a tabular format to the right of the force plot. */
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,

    /** Name of the column in 'tableData' that matches the 'id' field from 'contributions' */
    idColumn: PropTypes.string.isRequired,

    /** Data to build the KDE Plot from. */
    kdeData: PropTypes.shape({
        points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
        prediction: PropTypes.number.isRequired,
        predictionDate: PropTypes.oneOfType([
            PropTypes.instanceOf(Date),
            PropTypes.string
        ])
    }).isRequired,

    /** Text to display in the line connecting the prediction point to Force Plot */
    predictionTooltip: PropTypes.string,

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