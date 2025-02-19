const React = require('react');
const PropTypes = require('prop-types');
const ForcePlot = require('./internal/ForecePlot/ForcePlot.react');
const AGGridFeatureTable = require('./internal/AGGridFeatureTable/AGGridFeatureTable.react');
const KDEPlot = require('./internal/KDEPlot/KDEPlot.react');
require('./DashFeatureImpact.css');

/**
 * DashFeatureImpact Component
 * 
 * Main component for visualizing feature impacts from machine learning models.
 * Combines KDE plot, force plot, and AG Grid table with a responsive layout.
 * Provides interactive features including hover synchronization and auto-scrolling.
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
    gridOptions = {},
    setProps
}) => {
    const tableRef = React.useRef(null);
    const [transitionPoint, setTransitionPoint] = React.useState(null);
    const [segmentPositions, setSegmentPositions] = React.useState([]);
    const [visibleRows, setVisibleRows] = React.useState([]);
    const [hoveredId, setHoveredId] = React.useState(null);
    const containerRef = React.useRef(null);
    const NOTCH_HEIGHT = 15;

    // Adjust component dimensions based on props or container
    const {
        height: propHeight,
        kdePlotWidth = 300,
        forcePlotWidth = 200,
        tableWidth = 'auto',
        margins = {
            top: 20,
            right: 30,
            bottom: 20,
            left: 60
        }
    } = dimensions;

    // Use container ref to fit to parent element
    const [containerDimensions, setContainerDimensions] = React.useState({
        height: propHeight || 600,
        width: 0
    });
    
    // Update CSS variables to match provided dimensions
    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.setProperty('--kde-width', `${kdePlotWidth}px`);
            containerRef.current.style.setProperty('--force-width', `${forcePlotWidth}px`);
            containerRef.current.style.setProperty('--table-width', 
                tableWidth === 'auto' ? 'auto' : `${tableWidth}px`);
            
            // Measure container if we're in a Dash wrapper
            const updateDimensions = () => {
                const parent = containerRef.current.parentElement;
                if (parent) {
                    setContainerDimensions({
                        height: propHeight || parent.clientHeight,
                        width: parent.clientWidth
                    });
                }
            };
            
            updateDimensions();
            
            // Set up resize observer for Dash integration
            const resizeObserver = new ResizeObserver(updateDimensions);
            resizeObserver.observe(containerRef.current.parentElement);
            
            return () => {
                if (containerRef.current && containerRef.current.parentElement) {
                    resizeObserver.unobserve(containerRef.current.parentElement);
                }
                resizeObserver.disconnect();
            };
        }
    }, [kdePlotWidth, forcePlotWidth, tableWidth, propHeight]);

    // Get default styles
    const {
        colors = {
            positive: '#4299E1',
            negative: '#F56565',
            connecting: '#666666',
            background: '#FFFFFF',
            text: '#333333',
            predictionColor: '#666666'
        }
    } = style;

    // Create contributions map for efficient lookup
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
     * 1. Triggers the onClick callback with the full contribution object
     * 2. Scrolls the AG Grid table to the corresponding row
     * 
     * @param {string} id - ID of the clicked element
     */
    const handleClick = (id) => {
        if (onClick) {
            const contribution = contributions.find(c => c.id === id);
            onClick(contribution);
        }
        
        // Scroll to the corresponding row in the table
        if (tableRef.current && tableRef.current.scrollToRow) {
            tableRef.current.scrollToRow(id);
        }
    };

    /**
     * Handle updates to the prediction point position from KDE plot
     * 
     * @param {Object} position - Position data from KDE plot
     */
    const setPredictionPosition = (position) => {
        // Implementation would go here if needed
    };

    // Calculate table width 
    const calculatedTableWidth = React.useMemo(() => {
        if (tableWidth === 'auto') {
            // When auto, it will fill remaining space via CSS
            return 'auto';
        } else if (typeof tableWidth === 'number') {
            return tableWidth;
        } else {
            // Default width if not specified
            return 300;
        }
    }, [tableWidth]);

    return (
        <div 
            className="dash-feature-impact" 
            ref={containerRef}
            style={{ height: propHeight }}
        >
            <div className="visualization-grid">
                <div className="kde-section">
                    <KDEPlot 
                        data={kdeData}
                        width={kdePlotWidth}
                        height={containerDimensions.height}
                        predictionTooltip={predictionTooltip}
                        onPredictionPointFound={setPredictionPosition}
                        margins={margins}
                        style={{
                            areaColor: colors.positive,
                            areaStroke: colors.connecting,
                            predictionColor: colors.predictionColor || colors.connecting,
                            gridColor: '#e2e8f0',
                            textColor: colors.text,
                            background: colors.background
                        }}
                    />
                </div>

                <div className="force-section">
                    <ForcePlot 
                        data={contributions}
                        width={forcePlotWidth}
                        height={containerDimensions.height}
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

                <div 
                    className="table-section"
                    style={{
                        flex: tableWidth === 'auto' ? '1 1 auto' : '0 0 auto',
                        minWidth: tableWidth === 'auto' ? '300px' : `${tableWidth}px`
                    }}
                >
                    <AGGridFeatureTable 
                        ref={tableRef}
                        data={tableData}
                        idColumn={idColumn}
                        contributions={contributionsMap}
                        height={containerDimensions.height}
                        width={calculatedTableWidth}
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
                        gridOptions={gridOptions}
                    />
                </div>
            </div>
        </div>
    );
};

DashFeatureImpact.propTypes = {
    /** The contributions of features. Array of objects with 'id' and 'value' fields */
    contributions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        })
    ).isRequired,

    /** Data to display in table format. Must include the column specified by idColumn */
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,

    /** Name of the column in tableData that matches the 'id' field from contributions */
    idColumn: PropTypes.string.isRequired,

    /** Data to build the KDE Plot visualization */
    kdeData: PropTypes.shape({
        points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
        prediction: PropTypes.number.isRequired,
        predictionDate: PropTypes.oneOfType([
            PropTypes.instanceOf(Date),
            PropTypes.string
        ])
    }).isRequired,

    /** Text to display in the tooltip for the prediction point */
    predictionTooltip: PropTypes.string,

    /** Styling configuration */
    style: PropTypes.shape({
        colors: PropTypes.shape({
            positive: PropTypes.string,
            negative: PropTypes.string,
            connecting: PropTypes.string,
            background: PropTypes.string,
            text: PropTypes.string,
            predictionColor: PropTypes.string
        })
    }),

    /** Size/dimension configuration */
    dimensions: PropTypes.shape({
        height: PropTypes.number,
        kdePlotWidth: PropTypes.number,
        forcePlotWidth: PropTypes.number,
        tableWidth: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.oneOf(['auto'])
        ]),
        margins: PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number
        })
    }),

    /** Additional options to pass directly to AG Grid */
    gridOptions: PropTypes.object,

    /** Callback when a feature is hovered */
    onHover: PropTypes.func,
    
    /** Callback when a feature is clicked */
    onClick: PropTypes.func,

    /** Dash callback property */
    setProps: PropTypes.func
};

module.exports = DashFeatureImpact;