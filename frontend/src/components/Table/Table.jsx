import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Table = ({
  rowData,
  columnDefs,
  hasPagination,
  noDataDisplay,
  ...props
}) => {
  const defaultColDef = {
    editable: true,
    flex: 1,
    minWidth: 150,
    filter: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
  };
  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        pagination={hasPagination}
        noRowsOverlayComponent={noDataDisplay}
        {...props}
      />
    </div>
  );
};

export default Table;
