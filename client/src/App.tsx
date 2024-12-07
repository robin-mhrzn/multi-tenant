import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/layouts/authLayout/layout";
import AuthPage from "./pages/auth.page";

function App() {
  const host = window.location.host;
  const subdomain = host.split(".")[0];
  const isSubdomain = host !== subdomain;
  console.log(isSubdomain);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
