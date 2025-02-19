const React = require('react');
const PropTypes = require('prop-types');
const { AgGridReact } = require('ag-grid-react');
require('ag-grid-community/styles/ag-grid.css');
require('ag-grid-community/styles/ag-theme-alpine.css');

/**
 * AGGridFeatureTable Component
 * 
 * Enhanced feature table implementation using AG Grid for advanced data display,
 * with support for synchronized highlighting and programmatic scrolling.
 * 
 * @param {Object[]} data - Array of data objects to display in the table
 * @param {string} idColumn - Name of the column that serves as the unique identifier
 * @param {Map} contributions - Map of feature IDs to contribution values
 * @param {number} height - Height of the table container in pixels
 * @param {Object} style - Styling configuration object
 * @param {string} style.textColor - Color for table text
 * @param {string} style.background - Background color for table body
 * @param {string} style.headerBackground - Background color for table header
 * @param {string} style.highlightBackground - Background color for highlighted rows
 * @param {Function} onScroll - Callback fired when table scrolls with viewport info
 * @param {Function} onHover - Callback fired when row is hovered, provides row ID
 * @param {Function} onClick - Callback fired when row is clicked, provides row ID
 * @param {string} hoveredId - ID of currently hovered row for highlighting
 * @param {Object} gridOptions - Additional AG Grid options to pass through
 */
const AGGridFeatureTable = React.forwardRef(({
    data,
    idColumn,
    contributions,
    height,
    style = {},
    onScroll,
    onHover,
    onClick,
    hoveredId,
    gridOptions = {}
}, ref) => {
    const gridRef = React.useRef();
    const [visibleRows, setVisibleRows] = React.useState([]);
    const [pulsingRowId, setPulsingRowId] = React.useState(null);
    
    // Generate column definitions dynamically from data
    const columnDefs = React.useMemo(() => {
        if (!data || data.length === 0) return [];
        
        // Get all unique column names
        const columns = new Set();
        data.forEach(row => {
            Object.keys(row).forEach(key => columns.add(key));
        });
        
        // Create column definitions
        return Array.from(columns).map(field => {
            // Check if this is a contribution column
            const isContribution = field === 'contribution';
            
            // Basic column configuration
            const colDef = {
                field,
                headerName: field === idColumn ? 'ID' : field,
                sortable: true,
                filter: true,
                resizable: true,
                minWidth: 100,
                flex: 1,
            };
            
            // Add special formatting for ID column
            if (field === idColumn) {
                colDef.pinned = 'left';
                colDef.cellClass = 'id-column';
                colDef.minWidth = 120;
            }
            
            // Add value formatter for numeric/contribution columns
            colDef.valueFormatter = params => {
                const value = params.value;
                
                if (value === null || value === undefined) {
                    return '-';
                } 
                
                if (typeof value === 'number') {
                    // Format contribution values with sign
                    if (isContribution) {
                        return `${value > 0 ? '+' : ''}${value.toFixed(2)}`;
                    }
                    
                    // Format large numbers with commas
                    if (value > 999) {
                        return value.toLocaleString();
                    }
                    
                    // Format other numbers with 2 decimals
                    return value.toFixed(2);
                }
                
                return String(value);
            };
            
            return colDef;
        });
    }, [data, idColumn]);
    
    // Custom cell renderer for contribution indicators (optional)
    const contributionCellRenderer = React.useCallback((params) => {
        const id = params.data[idColumn];
        const contribution = contributions.get(id);
        
        if (contribution === undefined) return params.valueFormatted || params.value || '-';
        
        const isPositive = contribution > 0;
        const indicator = isPositive ? '▲' : '▼';
        const color = isPositive ? '#4299E1' : '#F56565';
        
        return (
            <div>
                <span>{params.valueFormatted || params.value || '-'}</span>
                <span style={{ color, marginLeft: '5px' }}>{indicator}</span>
            </div>
        );
    }, [contributions, idColumn]);
    
    // Get row class based on hover state
    const getRowClass = React.useCallback((params) => {
        const rowId = params.data[idColumn];
        const classes = [];
        
        if (rowId === hoveredId) {
            classes.push('highlighted-row');
        }
        
        if (rowId === pulsingRowId) {
            classes.push('highlight-pulse-row');
        }
        
        return classes.join(' ');
    }, [hoveredId, pulsingRowId, idColumn]);
    
    // Custom row style based on hover state
    const getRowStyle = React.useCallback((params) => {
        const rowId = params.data[idColumn];
        
        if (rowId === hoveredId) {
            return { 
                background: style.highlightBackground || '#f1f5f9'
            };
        }
        
        return { 
            background: style.background || '#ffffff'
        };
    }, [hoveredId, style, idColumn]);
    
    // Handle cell click events
    const handleCellClicked = React.useCallback((params) => {
        if (onClick && params.data) {
            onClick(params.data[idColumn]);
        }
    }, [onClick, idColumn]);
    
    // Handle mouse over events
    const handleRowHovered = React.useCallback((event) => {
        if (onHover && event.data) {
            onHover(event.data[idColumn]);
        }
    }, [onHover, idColumn]);
    
    // Handle mouse out events
    const handleMouseOut = React.useCallback(() => {
        if (onHover) {
            onHover(null);
        }
    }, [onHover]);
    
    // Handle scroll events to determine visible rows
    const handleBodyScroll = React.useCallback(({ api }) => {
        if (!onScroll) return;
        
        const rowHeight = api.getSizesForCurrentTheme().rowHeight;
        const headerHeight = api.getHeaderHeight();
        const firstRow = api.getFirstDisplayedRow();
        const lastRow = api.getLastDisplayedRow();
        
        if (firstRow === null || lastRow === null) return;
        
        // Calculate visible row info for connecting visualizations
        const visible = [];
        for (let i = firstRow; i <= lastRow; i++) {
            const rowNode = api.getDisplayedRowAtIndex(i);
            if (rowNode) {
                const rowTop = rowNode.rowIndex * rowHeight;
                visible.push({
                    index: rowNode.rowIndex,
                    id: rowNode.data[idColumn],
                    y: headerHeight + rowTop + (rowHeight / 2),
                    // Approximate x position
                    x: 0
                });
            }
        }
        
        setVisibleRows(visible);
        onScroll(visible);
    }, [onScroll, idColumn]);
    
    // Update visible rows after initial render
    React.useEffect(() => {
        if (gridRef.current && gridRef.current.api) {
            handleBodyScroll({ api: gridRef.current.api });
        }
    }, [data, handleBodyScroll]);
    
    /**
     * Scrolls to a specific row by ID
     * Used when a user clicks a segment in ForcePlot to navigate to the corresponding row
     * 
     * @param {string} id - ID of the row to scroll to
     */
    const scrollToRow = React.useCallback((id) => {
        if (!gridRef.current || !gridRef.current.api) return;
        
        // Find the row node by ID
        const rowNode = gridRef.current.api.getRowNode(id);
        if (!rowNode) return;
        
        // Scroll to the row with animation (center it in viewport)
        gridRef.current.api.ensureNodeVisible(rowNode, 'middle');
        
        // Apply visual feedback
        setPulsingRowId(id);
        
        // Optional: flash cells for additional feedback
        gridRef.current.api.flashCells({
            rowNodes: [rowNode],
            columns: ['*'],
            flashDelay: 500,
            fadeDelay: 1000
        });
        
        // Clear pulsing effect after animation completes
        setTimeout(() => {
            setPulsingRowId(null);
        }, 1500);
    }, []);
    
    // Expose methods to parent component
    React.useImperativeHandle(ref, () => ({
        scrollToRow,
        // Expose AG Grid API for advanced usage
        getApi: () => gridRef.current?.api,
        getColumnApi: () => gridRef.current?.columnApi
    }));
    
    return (
        <div className="ag-grid-feature-table" style={{ height, width: '100%' }}>
            <div 
                className="ag-theme-alpine" 
                style={{ 
                    height: '100%', 
                    width: '100%',
                    '--ag-header-background-color': style.headerBackground || '#f8fafc',
                    '--ag-odd-row-background-color': style.background || '#ffffff',
                    '--ag-header-foreground-color': style.textColor || '#333333',
                    '--ag-foreground-color': style.textColor || '#333333',
                }}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={data}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        resizable: true
                    }}
                    getRowId={params => params.data[idColumn]}
                    getRowClass={getRowClass}
                    getRowStyle={getRowStyle}
                    onCellClicked={handleCellClicked}
                    onRowHovered={handleRowHovered}
                    onMouseOut={handleMouseOut}
                    onBodyScroll={handleBodyScroll}
                    animateRows={true}
                    rowSelection="single"
                    enableCellTextSelection={true}
                    suppressCellFocus={false}
                    {...gridOptions}
                />
            </div>
        </div>
    );
});

// Add display name for better debugging
AGGridFeatureTable.displayName = 'AGGridFeatureTable';

AGGridFeatureTable.propTypes = {
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
    hoveredId: PropTypes.string,
    gridOptions: PropTypes.object
};

module.exports = AGGridFeatureTable;