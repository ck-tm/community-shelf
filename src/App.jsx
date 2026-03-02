import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import TitleDetail from "./pages/TitleDetail";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-cream transition-colors duration-300 dark:bg-night-950">
      <Navbar />
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/title/:id" element={<TitleDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
