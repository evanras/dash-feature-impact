const React = require('react');
const PropTypes = require('prop-types');
// require('./FeatureTable.css');

/**
 * FeatureTable Component
 * Displays feature data in a scrollable table with dynamic columns and interaction
 */
const FeatureTable = ({
    data,
    idColumn,
    contributions,
    height,
    style = {},
    onScroll,
    onHover,
    onClick,
    hoveredId
}) => {
    const tableBodyRef = React.useRef(null);
    const [columnWidths, setColumnWidths] = React.useState({});
    const [visibleRows, setVisibleRows] = React.useState([]);

    // Get all unique columns from data
    const columns = React.useMemo(() => {
        const cols = new Set();
        data.forEach(row => {
            Object.keys(row).forEach(key => cols.add(key));
        });
        return Array.from(cols);
    }, [data]);

    // Calculate optimal column widths
    React.useEffect(() => {
        const widths = {};
        columns.forEach(col => {
            // Get maximum content width for the column
            const maxContentWidth = Math.max(
                // Column header width
                col.length * 8,
                // Maximum data width
                ...data.map(row => {
                    const value = row[col];
                    return (value !== undefined ? String(value) : '').length * 8;
                })
            );
            widths[col] = Math.min(Math.max(maxContentWidth + 32, 100), 300);
        });
        setColumnWidths(widths);
    }, [columns, data]);

    // Handle scroll events
    // const handleScroll = () => {
    //     if (!tableBodyRef.current) return;
    
    //     const tableBody = tableBodyRef.current;
    //     const scrollTop = tableBody.scrollTop;
    //     const clientHeight = tableBody.clientHeight;
    //     const rowHeight = 40; // Assuming fixed row height
    
    //     // Calculate visible rows
    //     const startIndex = Math.floor(scrollTop / rowHeight);
    //     const endIndex = Math.ceil((scrollTop + clientHeight) / rowHeight);
        
    //     const visible = data
    //         .slice(startIndex, endIndex + 1)
    //         .map((row, index) => ({
    //             index: startIndex + index,
    //             y: (startIndex + index) * rowHeight + (rowHeight * 2), // Center of row
    //             x: tableBody.getBoundingClientRect().left // Left edge of table
    //         }));
    
    //     setVisibleRows(visible);
    //     onScroll?.(visible);
    // };
    const handleScroll = () => {
        if (!tableBodyRef.current) return;
    
        const tableBody = tableBodyRef.current;
        const scrollTop = tableBody.scrollTop;
        const clientHeight = tableBody.clientHeight;
        const headerHeight = 48; // Height of the header
        const rowHeight = 40; // Height of each row
    
        // Calculate visible rows
        const startIndex = Math.floor(scrollTop / rowHeight);
        const endIndex = Math.ceil((scrollTop + clientHeight) / rowHeight);
        
        const visible = data
            .slice(startIndex, endIndex + 1)
            .map((row, index) => ({
                index: startIndex + index,
                // Include scroll position in y calculation
                y: (headerHeight + ((startIndex + index) * rowHeight)) + rowHeight - scrollTop,
                x: tableBody.getBoundingClientRect().left
            }));
    
        setVisibleRows(visible);
        onScroll?.(visible);
    };

    // Format cell value for display
    const formatCellValue = (value, column) => {
        if (value === undefined || value === null) return '-';
        if (typeof value === 'number') {
            // Format contribution values with sign and fixed decimals
            if (column === 'contribution') {
                return `${value > 0 ? '+' : ''}${value.toFixed(2)}`;
            }
            // Format other numeric values
            return value.toFixed(2);
        }
        return String(value);
    };

    React.useEffect(() => {
        handleScroll();
        // Add resize observer for responsive handling
        const observer = new ResizeObserver(handleScroll);
        if (tableBodyRef.current) {
            observer.observe(tableBodyRef.current);
        }
        return () => observer.disconnect();
    }, [data]);

    return (
        <div className="feature-table-container" style={{ height }}>
            {/* Header */}
            <div 
                className="table-header"
                style={{ 
                    color: style.textColor || '#333',
                    background: style.headerBackground || '#f8fafc'
                }}
            >
                <div className="header-row">
                    {columns.map(column => (
                        <div
                            key={column}
                            className="header-cell"
                            style={{ 
                                width: columnWidths[column],
                                minWidth: columnWidths[column]
                            }}
                        >
                            {column}
                        </div>
                    ))}
                </div>
            </div>

            {/* Scrollable body */}
            <div 
                ref={tableBodyRef}
                className="table-body"
                onScroll={handleScroll}
                style={{ background: style.background || '#fff' }}
            >
                {data.map((row) => {
                    const rowId = row[idColumn];
                    const contribution = contributions.get(rowId);
                    const isHighlighted = hoveredId === rowId;

                    return (
                        <div
                            key={rowId}
                            className={`table-row ${isHighlighted ? 'highlighted' : ''}`}
                            onMouseEnter={() => onHover?.(rowId)}
                            onMouseLeave={() => onHover?.(null)}
                            onClick={() => onClick?.(rowId)}
                            style={{
                                background: isHighlighted ? 
                                    (style.highlightBackground || '#f1f5f9') : 
                                    'transparent'
                            }}
                        >
                            {columns.map(column => (
                                <div
                                    key={`${rowId}-${column}`}
                                    className={`table-cell ${column === idColumn ? 'id-column' : ''}`}
                                    style={{ 
                                        width: columnWidths[column],
                                        minWidth: columnWidths[column],
                                        color: style.textColor || '#333'
                                    }}
                                >
                                    {formatCellValue(row[column], column)}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

FeatureTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    idColumn: PropTypes.string.isRequired,
    contributions: PropTypes.instanceOf(Map).isRequired,
    height: PropTypes.number,
    style: PropTypes.shape({
        textColor: PropTypes.string,
        background: PropTypes.string,
        headerBackground: PropTypes.string,
        highlightBackground: PropTypes.string
    }),
    onScroll: PropTypes.func,
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    hoveredId: PropTypes.string
};

module.exports = FeatureTable;