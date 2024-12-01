import Home from "./Pages/Student/Home";
import Login from "./Pages/Student/Login";
import Signup from "./Pages/Student/Signup";
import CompanySignup from "./Pages/Company/CompanySignup";
import CompanyDashboard from "./Pages/Company/CompanyDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/CompanySignup" element={<CompanySignup />} />
          <Route path="/CompanyDashboard" element={<CompanyDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
