import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  </BrowserRouter>
}