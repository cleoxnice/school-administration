import { Suspense } from "react";
import "./styles/main.scss";
import NavBar from "./components/NavBar/NavBar";
import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";
import { CircularProgress, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <Box>
      <CssBaseline />
      <div className="app-container">
        <NavBar />
        <main className="main-content">
          <Suspense
            fallback={
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
              >
                <CircularProgress />
              </Box>
            }
          >
            {useRoutes(routes)}
          </Suspense>
        </main>
      </div>
    </Box>
  );
}

export default App;
