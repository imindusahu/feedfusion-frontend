import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Articles from "./components/pages/Articles";
import CreateArticle from "./components/pages/CreateArticle";
import EditArticle from "./components/pages/EditArticle";



function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<ProtectedRoute> <Dashboard /> <ToastContainer position="top-right" autoClose={3000} /> </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/articles" element={<ProtectedRoute><Articles /></ProtectedRoute>} />
        <Route path="/create-article" element={<ProtectedRoute>  <CreateArticle /> </ProtectedRoute>} />
        <Route path="/edit-article/:id" element={<ProtectedRoute>  <EditArticle /> </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
