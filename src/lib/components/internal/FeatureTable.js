import React from 'react';
import PropTypes from 'prop-types';

/**
 * FeatureTable displays the details of each feature including its name,
 * value, and contribution to the model's prediction.
 */
const FeatureTable = ({ features, onScroll, width, height }) => {
    return (
        <div 
            className="overflow-auto"
            style={{ width, height }}
            onScroll={(e) => onScroll(e.target.scrollTop)}
        >
            <div className="table-container">
                <table className="w-full">
                    <thead className="table-header">
                        <tr>
                            <th className="table-cell text-left">Feature</th>
                            <th className="table-cell text-left">Value</th>
                            <th className="table-cell text-left">Contribution</th>
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature, index) => (
                            <tr key={feature.name} className="table-row">
                                <td className="table-cell">{feature.name}</td>
                                <td className="table-cell">
                                    {typeof feature.value === 'number' 
                                        ? feature.value.toFixed(2) 
                                        : feature.value}
                                </td>
                                <td className={`table-cell ${
                                    feature.contribution > 0 
                                        ? 'text-blue-600' 
                                        : 'text-orange-600'
                                }`}>
                                    {feature.contribution.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

FeatureTable.propTypes = {
    /**
     * Array of features with their details
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
     * Callback function for scroll position updates
     */
    onScroll: PropTypes.func.isRequired,
    
    /**
     * Width of the table container
     */
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    
    /**
     * Height of the table container
     */
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

FeatureTable.defaultProps = {
    width: '100%',
    height: '100%'
};

export default FeatureTable;