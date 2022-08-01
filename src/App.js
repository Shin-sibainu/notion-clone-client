import Loading from "./components/common/Loading";
import AuthLayout from "./components/layout/AuthLayout";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Memo from "./pages/Memo";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const theme = createTheme({
    palette: { mode: "dark" },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="memo" element={<Home />} />
              <Route path="memo/:boardId" element={<Memo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
