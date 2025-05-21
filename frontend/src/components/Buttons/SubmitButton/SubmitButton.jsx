import { Button } from "@mui/material";
import React from "react";
const SubmitButton = ({ disabled, buttonName, className, ...props }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={disabled}
      className={className}
      {...props}
    >
      {buttonName}
    </Button>
  );
};

export default SubmitButton;
