import { createContext, useState } from "react";
import { Snackbar, Alert, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const showSnackbar = (message, severity = "info") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeSnackBar = (
    <IconButton
      aria-label="close"
      size="small"
      color="inherit"
      onClick={handleClose}
    >
      <Close fontSize="small" />
    </IconButton>
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={closeSnackBar}
      >
        <Alert severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
