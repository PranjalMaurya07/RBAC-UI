import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/pagenotfound";
import Homepage from "./pages/homepage";
import Register from "./pages/registerUser";
import AddRole from "./pages/role";
import RolePermissionsList from "./pages/getRole";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role" element={<AddRole />} />
        <Route path="/permissions" element={<RolePermissionsList />} />
        <Route path="/*" element={< PageNotFound/>} />
      </Routes>
    </>
  );
}

export default App;
