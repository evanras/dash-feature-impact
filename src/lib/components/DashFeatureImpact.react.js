import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DistributionPlot from './internal/DistributionPlot';
import ForceImpactPlot from './internal/ForceImpactPlot';
import FeatureTable from './internal/FeatureTable';

/**
 * DashFeatureImpact is a component that visualizes ML model feature importance
 * and their contributions to a prediction, combining distribution, force impact,
 * and feature table visualizations.
 */
const DashFeatureImpact = (props) => {
    const {
        id,
        baseValue,
        features,
        distributionData,
        finalPrediction,
        colors,
        width,
        height,
        setProps
    } = props;

    // State for table scroll position
    const [tableScrollPosition, setTableScrollPosition] = useState(0);

    // Calculate component dimensions
    const componentWidth = typeof width === 'number' ? width : '100%';
    const componentHeight = typeof height === 'number' ? height : 600;

    // Calculate section widths
    const distributionWidth = typeof width === 'number' ? width * 0.25 : '20%';
    const forcePlotWidth = typeof width === 'number' ? width * 0.45 : '30%';
    const tableWidth = typeof width === 'number' ? width * 0.30 : '50%';

    return (
        <div 
            id={id}
            className="dash-feature-impact"
            style={{ 
                width: componentWidth, 
                height: componentHeight,
                minHeight: '400px'
            }}
        >
            {/* Distribution Plot Section */}
            <div className="distribution-section" style={{ width: distributionWidth }}>
                <div className="section-header">Distribution of Predictions</div>
                <DistributionPlot
                    data={distributionData}
                    currentValue={finalPrediction}
                    height={componentHeight - 40}
                    width={typeof distributionWidth === 'string' 
                        ? parseInt(distributionWidth) * window.innerWidth / 100 
                        : distributionWidth}
                    color={colors.distribution}
                />
            </div>

            {/* Force Impact Plot Section */}
            <div className="force-plot-section" style={{ width: forcePlotWidth }}>
                <ForceImpactPlot
                    baseValue={baseValue}
                    features={features}
                    height={componentHeight - 40}
                    width={typeof forcePlotWidth === 'string' 
                        ? parseInt(forcePlotWidth) * window.innerWidth / 100 
                        : forcePlotWidth}
                    colors={{
                        positive: colors.positive,
                        negative: colors.negative
                    }}
                    tableScrollPosition={tableScrollPosition}
                />
            </div>

            {/* Feature Table Section */}
            <div className="table-section" style={{ width: tableWidth }}>
                <div className="table-header">
                    <span>Feature</span>
                    <span>Value</span>
                    <span>Contribution</span>
                </div>
                <FeatureTable
                    features={features}
                    onScroll={setTableScrollPosition}
                    width={tableWidth}
                    height={componentHeight - 40}
                />
            </div>
        </div>
    );
};

DashFeatureImpact.defaultProps = {
    width: '100%',
    height: 600,
    colors: {
        positive: '#4299E1',
        negative: '#F56565',
        distribution: '#A0AEC0'
    }
};

DashFeatureImpact.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * The model's base/average prediction value.
     */
    baseValue: PropTypes.number.isRequired,

    /**
     * Array of feature objects that contribute to the prediction.
     */
    features: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]).isRequired,
            contribution: PropTypes.number.isRequired
        })
    ).isRequired,

    /**
     * Array of prediction values used to create the distribution plot.
     */
    distributionData: PropTypes.arrayOf(PropTypes.number).isRequired,

    /**
     * The final prediction value after all feature contributions.
     */
    finalPrediction: PropTypes.number.isRequired,

    /**
     * Custom colors for visualization elements.
     */
    colors: PropTypes.shape({
        positive: PropTypes.string,
        negative: PropTypes.string,
        distribution: PropTypes.string
    }),

    /**
     * Width of the component (number for pixels, string for %, vh).
     */
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),

    /**
     * Height of the component (number for pixels, string for %, vh).
     */
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),

    /**
     * Dash-assigned callback that should be called to report property changes.
     */
    setProps: PropTypes.func
};

export default DashFeatureImpact;