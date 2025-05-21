import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  styled,
  InputLabel,
} from "@mui/material";
import classNames from "classnames";
import "./_form-drop-down.scss";
import { useFormContext } from "react-hook-form";

const FormDropDown = ({
  label,
  error,
  placeholder,
  helperText,
  className,
  options,
  registerName,
  customEmptyList,
  setValue,
  defaultValue,
  ...props
}) => {
  const { register } = useFormContext();
  const PlaceholderItem = styled("em")(({ theme }) => ({
    color: error ? "rgba(211, 47, 47, 0.5)" : theme.palette.text.disabled, // Matches TextField's placeholder color
  }));

  return (
    <Box>
      <Typography>{label}</Typography>
      <FormControl error={error}>
        <InputLabel label={label}></InputLabel>
        <Select
          className={classNames("form-drop-down", className)}
          defaultValue={defaultValue}
          {...register(registerName)}
          onChange={(e) => {
            if (setValue && e.target) {
              setValue(`${e.target.name}.${e.target.value}`); // Set form values
            }
          }}
          {...props}
        >
          <MenuItem value={placeholder}>
            <PlaceholderItem>{placeholder}</PlaceholderItem>
          </MenuItem>
          {options.length
            ? options.map(({ key, display }) => (
                <MenuItem key={key} value={key}>
                  {display}
                </MenuItem>
              ))
            : customEmptyList}
        </Select>
        {helperText && (
          <Typography variant="caption" color="error">
            {helperText}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default FormDropDown;
