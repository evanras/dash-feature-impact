const React = require('react');
const PropTypes = require('prop-types');

/**
 * ForcePlot component visualizes feature contributions as stacked segments, 
 * with positive and negative contributions separated by a transition gap.
 */
const ForcePlot = ({
    data,
    width = 400,
    height = 600,
    style = {},
    hoveredId = null,
    notchHeight,
    onTransitionPointFound,
    onSegmentPositionsUpdate,
    onHover,
    onClick
}) => {
    // Constants for layout calculations
    const VERTICAL_PADDING = 40;
    const TRANSITION_GAP = 45;
    const BASE_GAP = 5;
    const SEGMENT_WIDTH = Math.min(width * 0.3, 80); // Responsive segment width

    // Calculate scaling factors and positions
    const calculations = React.useMemo(() => {
        // First separate positive and negative values
        const positiveValues = data.filter(num => num.value > 0);
        const negativeValues = data.filter(num => num.value < 0);

        // Sort positive values by ascending magnitude (smaller to larger)
        const positiveSorted = positiveValues.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

        // Sort negative values by descending magnitude (smaller to larger)
        const negativeSorted = negativeValues.sort((a, b) => Math.abs(a.value) - Math.abs(b.value));

        // Combine them with largest values in the middle
        const sortedData = [...negativeSorted, ...positiveSorted];
        
        // Calculate total absolute contribution for scaling
        const totalAbsContribution = data.reduce((sum, d) => sum + Math.abs(d.value), 0);
        
        // Calculate scale factor to fit all segments
        const availableHeight = height - (2 * VERTICAL_PADDING) - 
            ((data.length - 1) * BASE_GAP) - TRANSITION_GAP;
        const scale = availableHeight / totalAbsContribution;

        // Find transition index between negative and positive values
        const transitionIndex = sortedData.findIndex(d => d.value >= 0);

        return {
            sortedData,
            scale,
            transitionIndex
        };
    }, [data, height]);

    /**
     * Generates the path for a segment
     */
    const generateSegmentPath = (value, startY) => {
        const rectHeight = Math.abs(value) * calculations.scale;
        const xCenter = width / 2;
        const isNegative = value < 0;
        
        const notchWidth = SEGMENT_WIDTH / 2;
        
        return [
            `M ${xCenter - SEGMENT_WIDTH/2} ${startY}`,
            `H ${xCenter - notchWidth}`,
            isNegative
                ? `L ${xCenter} ${startY + notchHeight} L ${xCenter + notchWidth} ${startY}`
                : `L ${xCenter} ${startY - notchHeight} L ${xCenter + notchWidth} ${startY}`,
            `H ${xCenter + SEGMENT_WIDTH/2}`,
            `V ${startY + rectHeight}`,
            `H ${xCenter + notchWidth}`,
            isNegative
                ? `L ${xCenter} ${startY + rectHeight + notchHeight} L ${xCenter - notchWidth} ${startY + rectHeight}`
                : `L ${xCenter} ${startY + rectHeight - notchHeight} L ${xCenter - notchWidth} ${startY + rectHeight}`,
            `H ${xCenter - SEGMENT_WIDTH/2}`,
            'Z'
        ].join(' ');
    };

    // Calculate and render segments
    const segments = React.useMemo(() => {
        const { sortedData, scale, transitionIndex } = calculations;
        let currentY = VERTICAL_PADDING;
        const segmentPositions = [];
        
        return sortedData.map((item, index) => {
            if (index === transitionIndex) {
                currentY += TRANSITION_GAP;
            } else if (index > 0) {
                currentY += BASE_GAP;
            }

            const segmentPath = generateSegmentPath(item.value, currentY);
            const segmentHeight = Math.abs(item.value) * scale;
            
            segmentPositions.push({
                y: currentY + segmentHeight / 2,
                height: segmentHeight
            });

            const isHighlighted = hoveredId === item.id;
            
            const segment = (
                <g 
                    key={item.id}
                    className={`segment ${isHighlighted ? 'highlighted' : ''}`}
                    onMouseEnter={() => onHover?.(item.id)}
                    onMouseLeave={() => onHover?.(null)}
                    onClick={() => onClick?.(item.id)}
                >
                    <path
                        d={segmentPath}
                        className={`segment-rect ${item.value < 0 ? 'negative' : 'positive'}`}
                        style={{
                            fill: item.value < 0 ? style.negative : style.positive,
                            opacity: isHighlighted ? 1 : 0.8
                        }}
                    />
                </g>
            );

            currentY += segmentHeight;
            return segment;
        });
    }, [calculations, hoveredId, style, SEGMENT_WIDTH]);

    // Update position info
    React.useEffect(() => {
        if (onSegmentPositionsUpdate) {
            const positions = calculations.sortedData.map((item, index) => {
                const segmentHeight = Math.abs(item.value) * calculations.scale;
                let currentY = VERTICAL_PADDING;
                
                // Calculate exact position including all gaps
                for (let i = 0; i < index; i++) {
                    currentY += Math.abs(calculations.sortedData[i].value) * calculations.scale;
                    if (i === calculations.transitionIndex - 1) {
                        currentY += TRANSITION_GAP;
                    } else {
                        currentY += BASE_GAP;
                    }
                }
            
                return {
                    y: currentY + (segmentHeight / 2), // Exact center of segment
                    height: segmentHeight
                };
            });
            
            onSegmentPositionsUpdate(positions);
        }
    }, [calculations, onSegmentPositionsUpdate]);

    // Update transition point
    React.useEffect(() => {
        if (onTransitionPointFound && calculations.transitionIndex >= 0) {
            let transitionY = VERTICAL_PADDING;
            
            for (let i = 0; i < calculations.transitionIndex; i++) {
                transitionY += Math.abs(calculations.sortedData[i].value) * calculations.scale;
                transitionY += BASE_GAP;
            }

            onTransitionPointFound({
                x: width / 2,
                y: transitionY
            });
        }
    }, [calculations, width, onTransitionPointFound]);

    return (
        <div className="force-plot-container">
            <svg 
                viewBox={`0 0 ${width} ${height}`}
                className="force-plot-svg"
                style={{ background: style.background }}
            >
                {segments}
            </svg>
        </div>
    );
};

ForcePlot.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
    })).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.shape({
        positive: PropTypes.string,
        negative: PropTypes.string,
        background: PropTypes.string
    }),
    hoveredId: PropTypes.string,
    notchHeight: PropTypes.number,
    onTransitionPointFound: PropTypes.func,
    onSegmentPositionsUpdate: PropTypes.func,
    onHover: PropTypes.func,
    onClick: PropTypes.func
};

module.exports = ForcePlot;