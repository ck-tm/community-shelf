import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import TitleDetail from "./pages/TitleDetail";
import AccountLayout from "./pages/account/AccountLayout";
import MyRentals from "./pages/account/MyRentals";
import MyDetails from "./pages/account/MyDetails";
import About from "./pages/About";
import Lists from "./pages/Lists";
import ListDetail from "./pages/ListDetail";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageTypes from "./pages/admin/ManageTypes";
import ManageTitles from "./pages/admin/ManageTitles";
import TitleForm from "./pages/admin/TitleForm";
import ManageCopies from "./pages/admin/ManageCopies";
import ManageLists from "./pages/admin/ManageLists";
import ListForm from "./pages/admin/ListForm";
import ManageInquiries from "./pages/admin/ManageInquiries";
import SiteConfig from "./pages/admin/SiteConfig";

export default function App() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-cream transition-colors duration-300 dark:bg-night-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/title/:id" element={<TitleDetail />} />
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<MyRentals />} />
            <Route path="details" element={<MyDetails />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/lists/:id" element={<ListDetail />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="types" element={<ManageTypes />} />
            <Route path="titles" element={<ManageTitles />} />
            <Route path="titles/new" element={<TitleForm />} />
            <Route path="titles/:id/edit" element={<TitleForm />} />
            <Route path="titles/:id/copies" element={<ManageCopies />} />
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
