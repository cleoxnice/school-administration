import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useTeachersRecordQuery } from "../../api/teacherApi";
import Table from "../../components/Table/Table";
import NoDataDisplay from "../../components/Table/noDataDisplay/noDataDisplay";

const TeachersRecord = () => {
  const navigate = useNavigate();
  const { data: teachers, isLoading } = useTeachersRecordQuery();

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
    { headerName: "Name", field: "name", filter: false, sortable: true },
    { headerName: "Subject", field: "subject" },
    { headerName: "Email", field: "email", filter: false },
    {
      headerName: "Work Contact",
      field: "contactNumber",
      filter: false,
      maxWidth: 150,
    },
  ];

  if (isLoading) return <CircularProgress />;

  const noDataDisplayed = () => (
    <NoDataDisplay
      tableName="Teacher"
      customMessage="There are no existing teachers yet."
      onClickButton={() => navigate("/teachers/new")}
    />
  );

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Teachers</Typography>
        {!!teachers.length && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => navigate("/teachers/new")}
          >
            Add Teacher
          </Button>
        )}
      </Box>
      <Table
        rowData={teachers}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        noDataDisplay={noDataDisplayed}
      />
    </Box>
  );
};

export default TeachersRecord;
