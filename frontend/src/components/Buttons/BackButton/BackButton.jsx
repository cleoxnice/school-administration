import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import "./_back-button.scss";
import classNames from "classnames";

const BackButton = ({ disabled, className, ...props }) => {
  return (
    <Button
      type="button"
      variant="outlined"
      color="primary"
      disabled={disabled}
      className={classNames("back-button", className)}
      {...props}
    >
      <ArrowBack fontSize="small" />
      Back
    </Button>
  );
};

export default BackButton;
