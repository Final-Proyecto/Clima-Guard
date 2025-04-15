import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PaginaInicial from "./pages/PaginaInicial";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={PaginaInicial} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
      </Routes>
    </Router>
  );
}
