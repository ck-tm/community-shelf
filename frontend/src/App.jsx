import { Routes, Route } from "react-router-dom";
import { TENANT_SLUG } from "./api/client";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import TitleDetail from "./pages/TitleDetail";
import AccountLayout from "./pages/account/AccountLayout";
import MyRentals from "./pages/account/MyRentals";
import MyDetails from "./pages/account/MyDetails";
import About from "./pages/About";
import Lists from "./pages/Lists";
import ListDetail from "./pages/ListDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageTypes from "./pages/admin/ManageTypes";
import ManageTitles from "./pages/admin/ManageTitles";
import TitleForm from "./pages/admin/TitleForm";
import ManageLists from "./pages/admin/ManageLists";
import ListForm from "./pages/admin/ListForm";
import ManageInquiries from "./pages/admin/ManageInquiries";
import SiteConfig from "./pages/admin/SiteConfig";
import PlatformNavbar from "./components/PlatformNavbar";
import Landing from "./pages/platform/Landing";
import Dashboard from "./pages/platform/Dashboard";

function TenantApp() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-cream transition-colors duration-300 dark:bg-night-950">
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Browse />} />
          <Route path="/title/:id" element={<TitleDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/lists/:id" element={<ListDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected: user account */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<MyRentals />} />
            <Route path="details" element={<MyDetails />} />
          </Route>

          {/* Protected: admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="types" element={<ManageTypes />} />
            <Route path="titles" element={<ManageTitles />} />
            <Route path="titles/new" element={<TitleForm />} />
            <Route path="titles/:id/edit" element={<TitleForm />} />
            <Route path="lists" element={<ManageLists />} />
            <Route path="lists/new" element={<ListForm />} />
            <Route path="lists/:id/edit" element={<ListForm />} />
            <Route path="inquiries" element={<ManageInquiries />} />
            <Route path="config" element={<SiteConfig />} />
          </Route>
        </Routes>
      </div>
    </DataProvider>
  );
}

function PlatformApp() {
  return (
    <div className="min-h-screen bg-cream transition-colors duration-300 dark:bg-night-950">
      <PlatformNavbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      {TENANT_SLUG ? <TenantApp /> : <PlatformApp />}
    </AuthProvider>
  );
}
