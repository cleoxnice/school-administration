import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Add } from "@mui/icons-material";
import "./_no-data-display.scss";
import classNames from "classnames";

const NoDataDisplay = ({
  tableName,
  customMessage,
  className,
  onClickButton,
  ...props
}) => {
  return (
    <Box className="no-data-display__container">
      <Typography variant="body2" fontWeight="bold">
        {customMessage}
      </Typography>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={onClickButton}
        className={classNames("no-data-display__button", className)}
        {...props}
      >
        <Add fontSize="small" />
        {`Add ${tableName}`}
      </Button>
    </Box>
  );
};

export default NoDataDisplay;
