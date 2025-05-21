import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import classNames from "classnames";
import "./_form-text-field.scss";
import { useForm, useFormContext } from "react-hook-form";

const FormTextField = ({
  label,
  error,
  placeholder,
  helperText,
  className,
  registerName,
  ...props
}) => {
  const { register } = useFormContext();
  return (
    <Box>
      <Typography>{label}</Typography>
      <TextField
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        className={classNames("form-text-field", className)}
        {...register(registerName)}
        {...props}
      />
    </Box>
  );
};

export default FormTextField;
