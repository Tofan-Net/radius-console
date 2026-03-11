import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import UsersPage from "@/pages/UsersPage";
import UserDetail from "@/pages/UserDetail";
import SessionsPage from "@/pages/SessionsPage";
import AccountingPage from "@/pages/AccountingPage";
import GroupsPage from "@/pages/GroupsPage";
import ProfilesPage from "@/pages/ProfilesPage";
import CertificatesPage from "@/pages/CertificatesPage";
import ConfigPage from "@/pages/ConfigPage";
import DevicesPage from "@/pages/DevicesPage";
import OTPPage from "@/pages/OTPPage";
import NASPage from "@/pages/NASPage";
import TenantsPage from "@/pages/TenantsPage";
import RBACPage from "@/pages/RBACPage";
import AuditLogsPage from "@/pages/AuditLogsPage";
import NotificationsPage from "@/pages/NotificationsPage";
import ReportsPage from "@/pages/ReportsPage";
import BackupPage from "@/pages/BackupPage";
import ApiDocsPage from "@/pages/ApiDocsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/accounting" element={<AccountingPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/config" element={<ConfigPage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/nas" element={<NASPage />} />
            <Route path="/tenants" element={<TenantsPage />} />
            <Route path="/rbac" element={<RBACPage />} />
            <Route path="/audit" element={<AuditLogsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/backup" element={<BackupPage />} />
            <Route path="/api-docs" element={<ApiDocsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
