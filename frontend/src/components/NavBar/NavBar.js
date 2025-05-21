import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { SchoolOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar className="nav-bar__toolbar">
        <Button
          color="inherit"
          component={Link}
          to="/"
          startIcon={<SchoolOutlined />}
          sx={{ mr: 2 }}
        >
          <Typography variant="h6" component="div">
            School Portal
          </Typography>
        </Button>
        <Button color="inherit" component={Link} to="/classes">
          Classes
        </Button>
        <Button color="inherit" component={Link} to="/teachers">
          Teachers
        </Button>
      </Toolbar>
      {/* Placeholder for future login/logout buttons */}
      {/* <Button color="inherit">Login</Button> */}
    </AppBar>
  );
};

export default NavBar;
