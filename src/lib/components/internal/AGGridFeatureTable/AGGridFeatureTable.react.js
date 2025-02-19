const React = require('react');
const PropTypes = require('prop-types');
const { AgGridReact } = require('ag-grid-react');
const { AllCommunityModule, ModuleRegistry } = require('ag-grid-community');
ModuleRegistry.registerModules([AllCommunityModule]);

// Import AG Grid styles
require('ag-grid-community/styles/ag-grid.css');
require('ag-grid-community/styles/ag-theme-alpine.css');

/**
 * AGGridFeatureTable Component
 * 
 * A feature-rich grid component that:
 * 1. Synchronizes bidirectionally with ForcePlot for highlighting
 * 2. Supports programmatic scrolling to specific rows
 * 3. Allows configurable width
 * 
 * @param {Object[]} data - Array of data objects to display in the table
 * @param {string} idColumn - Name of the column that serves as the unique identifier
 * @param {Map} contributions - Map of feature IDs to contribution values
 * @param {number} height - Height of the table container in pixels
 * @param {number} width - Width of the table container (optional)
 * @param {Object} style - Styling configuration
 * @param {Function} onScroll - Callback when table scrolls, provides visible rows info
 * @param {Function} onHover - Callback when row is hovered
 * @param {Function} onClick - Callback when row is clicked
 * @param {string} hoveredId - ID of currently hovered element
 * @param {Object} gridOptions - Additional AG Grid options
 */
const AGGridFeatureTable = React.forwardRef(({
    data,
    idColumn,
    contributions,
    height,
    width,
    style = {},
    onScroll,
    onHover,
    onClick,
    hoveredId,
    gridOptions = {}
}, ref) => {
    const gridRef = React.useRef();
    const [highlightedRowId, setHighlightedRowId] = React.useState(null);
    
    // Automatically track when hoveredId changes from external components
    React.useEffect(() => {
        if (hoveredId !== null) {
            setHighlightedRowId(hoveredId);
            
            // Only scroll to row if the hover came from outside (like ForcePlot)
            // and the row isn't already visible
            if (gridRef.current?.api) {
                const api = gridRef.current.api;
                const rowNode = api.getRowNode(hoveredId);
                if (rowNode) {
                    const rowIndex = rowNode.rowIndex;
                    const firstVisibleRow = api.getFirstDisplayedRowIndex();
                    const lastVisibleRow = api.getLastDisplayedRowIndex();
                    
                    // Check if row is not currently visible
                    if (rowIndex < firstVisibleRow || rowIndex > lastVisibleRow) {
                        api.ensureNodeVisible(rowNode, 'middle');
                    }
                }
            }
        } else {
            setHighlightedRowId(null);
        }
    }, [hoveredId]);

    // Generate column definitions dynamically from the data
    const columnDefs = React.useMemo(() => {
        if (!data || data.length === 0) return [];
        
        const sampleRow = data[0];
        return Object.keys(sampleRow).map(field => {
            const isIdColumn = field === idColumn;
            const isNumeric = typeof sampleRow[field] === 'number';
            
            // Basic column definition
            const colDef = {
                field,
                headerName: field,
                sortable: true,
                filter: true,
                resizable: true,
                minWidth: 50,
                flex: 1,
            };
            
            // Configure value formatting for numeric values
            if (isNumeric) {
                colDef.type = 'numericColumn';
                
                // For contribution column specifically
                if (field === 'contribution') {
                    colDef.cellStyle = params => {
                        const value = params.value;
                        if (value > 0) return { color: '#4299E1' };
                        if (value < 0) return { color: '#F56565' };
                        return null;
                    };
                    
                    colDef.valueFormatter = params => {
                        if (params.value === null || params.value === undefined) return '-';
                        return `${params.value > 0 ? '+' : ''}${params.value}`;
                    };
                } else if (Math.abs(sampleRow[field]) > 1000) {
                    // Format large numbers with commas
                    colDef.valueFormatter = params => {
                        if (params.value === null || params.value === undefined) return '-';
                        return params.value.toLocaleString();
                    };
                } else if (Number.isInteger(sampleRow[field])) {
                    // Integer values - display as is
                    colDef.valueFormatter = params => {
                        if (params.value === null || params.value === undefined) return '-';
                        return params.value.toString();
                    };
                } else {
                    // Default number formatting with 2 decimal places
                    colDef.valueFormatter = params => {
                        if (params.value === null || params.value === undefined) return '-';
                        return params.value;
                    };
                }
            }
            
            return colDef;
        });
    }, [data, idColumn]);

    // Create row class rules for highlighting rows
    const rowClassRules = React.useMemo(() => {
        return {
            'highlight-pulse-row': params => params.data && params.data[idColumn] === highlightedRowId
        };
    }, [highlightedRowId, idColumn]);

    // Row styling based on hover state
    const getRowStyle = React.useCallback(params => {
        const rowId = params.data?.[idColumn];
        if (rowId === hoveredId) {
            return { 
                background: style.highlightBackground || '#f1f5f9'
            };
        }
        return null;
    }, [hoveredId, style, idColumn]);

    // Handle row hover events
    const onRowMouseOver = React.useCallback(event => {
        if (event.data && onHover) {
            onHover(event.data[idColumn]);
        }
    }, [onHover, idColumn]);

    // Handle row mouse out events
    const onRowMouseOut = React.useCallback(() => {
        if (onHover) {
            onHover(null);
        }
    }, [onHover]);

    // Handle row click events
    const onRowClicked = React.useCallback(event => {
        if (event.data && onClick) {
            onClick(event.data[idColumn]);
        }
    }, [onClick, idColumn]);

    // Handle viewport changed to report visible rows
    const onViewportChanged = React.useCallback(() => {
        if (!gridRef.current?.api || !onScroll) return;
        
        const api = gridRef.current.api;
        const rowHeight = api.getRowHeight();
        const firstRow = api.getFirstDisplayedRowIndex();
        const lastRow = api.getLastDisplayedRowIndex();
        
        if (firstRow === null || lastRow === null) return;
        
        // Get visible rows information
        const visibleRows = [];
        for (let i = firstRow; i <= lastRow; i++) {
            const rowNode = api.getDisplayedRowAtIndex(i);
            if (rowNode && rowNode.data) {
                const rowTop = rowNode.rowIndex * rowHeight;
                visibleRows.push({
                    id: rowNode.data[idColumn],
                    index: rowNode.rowIndex,
                    y: rowTop + (rowHeight / 2)
                });
            }
        }
        
        onScroll(visibleRows);
    }, [onScroll, idColumn]);

    // Scroll to a specific row with animation
    const scrollToRow = React.useCallback(id => {
        if (!gridRef.current?.api) return;
        
        const api = gridRef.current.api;
        
        // First, ensure the row is loaded
        const rowNode = api.getRowNode(id);
        if (!rowNode) {
            console.warn(`Row with ID ${id} not found`);
            return;
        }
        
        // Scroll to the row with animation
        api.ensureNodeVisible(rowNode, 'middle');
        
        // Highlight the row temporarily 
        setHighlightedRowId(id);
        setTimeout(() => setHighlightedRowId(null), 1500);
        
        // Flash cells for additional feedback
        api.flashCells({
            rowNodes: [rowNode],
            flashDuration: 500,
            fadeDuration: 1000
        });
    }, []);

    // First load and resize handler
    React.useEffect(() => {
        const handleFirstLoad = () => {
            if (gridRef.current?.api) {
                // Adjust all columns to fit content
                gridRef.current.api.sizeColumnsToFit();
                // Update visible rows info
                onViewportChanged();
            }
        };

        // Wait for grid to be ready
        if (gridRef.current?.api) {
            handleFirstLoad();
        }

        // Handle window resize
        const handleResize = () => {
            if (gridRef.current?.api) {
                gridRef.current.api.sizeColumnsToFit();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [onViewportChanged]);

    // Expose methods to parent via ref
    React.useImperativeHandle(ref, () => ({
        scrollToRow,
        getApi: () => gridRef.current?.api,
        getColumnApi: () => gridRef.current?.api
    }));

    return (
        (<div 
            className="ag-grid-feature-table" 
            style={{ 
                height, 
                width: width || '100%'
            }}
        >
            <div 
                className="ag-theme-alpine" 
                style={{ 
                    height: '100%', 
                    width: '100%',
                    '--ag-header-background-color': style.headerBackground || '#f8fafc',
                    '--ag-background-color': style.background || '#ffffff',
                    '--ag-header-foreground-color': style.textColor || '#333333',
                    '--ag-foreground-color': style.textColor || '#333333',
                    '--ag-row-hover-color': style.highlightBackground || '#f1f5f9',
                    '--ag-selected-row-background-color': style.highlightBackground || '#f1f5f9',
                }}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={data}
                    columnDefs={columnDefs}
                    rowClassRules={rowClassRules}
                    getRowStyle={getRowStyle}
                    getRowId={params => params.data[idColumn]}
                    onRowMouseOver={onRowMouseOver}
                    onRowMouseOut={onRowMouseOut}
                    onRowClicked={onRowClicked}
                    onViewportChanged={onViewportChanged}
                    onGridReady={params => {
                        params.api.sizeColumnsToFit();
                    }}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        resizable: true,
                        suppressMovable: false
                    }}
                    domLayout="normal"
                    animateRows={true}
                    rowSelection={{
                        mode: 'singleRow'
                    }}
                    suppressCellFocus={false}
                    enableCellTextSelection={true}
                    tooltipShowDelay={300}
                    {...gridOptions}
                />
            </div>
        </div>)
    );
});

// Add display name for better debugging
AGGridFeatureTable.displayName = 'AGGridFeatureTable';

AGGridFeatureTable.propTypes = {
    /** Array of data objects to display in the table */
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    
    /** Name of the column in tableData that matches the 'id' field from contributions */
    idColumn: PropTypes.string.isRequired,
    
    /** Map of feature IDs to contribution values */
    contributions: PropTypes.instanceOf(Map).isRequired,
    
    /** Height of the table container in pixels */
    height: PropTypes.number,
    
    /** Width of the table container (optional, defaults to 100%) */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    
    /** Styling configuration */
    style: PropTypes.shape({
        textColor: PropTypes.string,
        background: PropTypes.string,
        headerBackground: PropTypes.string,
        highlightBackground: PropTypes.string
    }),
    
    /** Callback fired when table scrolls with viewport info */
    onScroll: PropTypes.func,
    
    /** Callback fired when row is hovered, provides row ID */
    onHover: PropTypes.func,
    
    /** Callback fired when row is clicked, provides row ID */
    onClick: PropTypes.func,
    
    /** ID of currently hovered row for highlighting */
    hoveredId: PropTypes.string,
    
    /** Additional AG Grid options to pass through */
    gridOptions: PropTypes.object
};

module.exports = AGGridFeatureTable;