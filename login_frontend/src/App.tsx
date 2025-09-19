import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ViewOTP from "./components/Auth/ViewOTP";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/view-otp"
          element={<ViewOTP email="john.doe@example.com" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
