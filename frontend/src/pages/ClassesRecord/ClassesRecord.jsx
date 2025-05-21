import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useClassesRecordQuery } from "../../api/classApi";
import Table from "../../components/Table/Table";
import NoDataDisplay from "../../components/Table/noDataDisplay/noDataDisplay";

const ClassesRecord = () => {
  const navigate = useNavigate();
  const { data: classes, isLoading } = useClassesRecordQuery({
    select: (data) =>
      data.map((eachClass) => ({
        ...eachClass,
        formTeacher: eachClass.formTeacher.name,
      })),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }
  const columnDefs = [
    {
      headerName: "#",
      valueGetter: "node.rowIndex + 1",
      maxWidth: 70,
      sortable: false,
      filter: false,
      resizable: false,
    },
    { headerName: "Class Level", field: "level", sort: "asc" },
    { headerName: "Class Name", field: "name", sort: "asc" },
    { headerName: "Form Teacher", field: "formTeacher", filter: false },
  ];
  const noDataDisplayed = () => (
    <NoDataDisplay
      tableName="Class"
      customMessage="There are no existing classes yet."
      onClickButton={() => navigate("/classes/new")}
    />
  );

  if (isLoading) return <CircularProgress />;

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Classes</Typography>
        {!!classes.length && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => navigate("/classes/new")}
          >
            Add Class
          </Button>
        )}
      </Box>
      <Table
        rowData={classes}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        noDataDisplay={noDataDisplayed}
      />
    </Box>
  );
};

export default ClassesRecord;
