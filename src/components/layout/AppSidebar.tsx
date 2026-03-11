import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, Wifi, FileText, FolderTree, Shield,
  Key, Award, Server, Building2, UserCog, ScrollText, Bell,
  BarChart3, Database, GitCompare, BookOpen, Monitor, Lock,
  ChevronDown, ChevronRight, Search, LogOut, Settings, Fingerprint,
  Globe, HardDrive
} from "lucide-react";

const navSections = [
  {
    label: "Overview",
    items: [
      { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    label: "Identity",
    items: [
      { to: "/users", icon: Users, label: "Users" },
      { to: "/groups", icon: FolderTree, label: "Groups" },
      { to: "/devices", icon: HardDrive, label: "MAC Devices" },
      { to: "/otp", icon: Fingerprint, label: "OTP / 2FA" },
    ],
  },
  {
    label: "Network",
    items: [
      { to: "/sessions", icon: Wifi, label: "Active Sessions" },
      { to: "/accounting", icon: FileText, label: "Accounting" },
      { to: "/nas", icon: Server, label: "NAS Devices" },
    ],
  },
  {
    label: "Policy",
    items: [
      { to: "/profiles", icon: Shield, label: "Profiles & Policies" },
      { to: "/certificates", icon: Award, label: "Certificates" },
      { to: "/config", icon: GitCompare, label: "Config & Versioning" },
    ],
  },
  {
    label: "Administration",
    items: [
      { to: "/tenants", icon: Building2, label: "Tenants / Realms" },
      { to: "/rbac", icon: UserCog, label: "Roles & Permissions" },
      { to: "/audit", icon: ScrollText, label: "Audit Logs" },
      { to: "/notifications", icon: Bell, label: "Notifications" },
      { to: "/reports", icon: BarChart3, label: "Reports" },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/backup", icon: Database, label: "Backup / Restore" },
      { to: "/api-docs", icon: BookOpen, label: "API & CLI Docs" },
    ],
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (label: string) => {
    setCollapsed(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-5 border-b border-sidebar-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Globe className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-sidebar-accent-foreground">RadiusAdmin</h1>
          <p className="text-[10px] text-sidebar-muted">FreeRADIUS Control Plane</p>
        </div>
      </div>

      {/* Tenant Switcher */}
      <div className="mx-3 mt-3 mb-1">
        <button className="flex w-full items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent px-3 py-2 text-xs text-sidebar-accent-foreground hover:bg-sidebar-accent/80 transition-colors">
          <Building2 className="h-3.5 w-3.5 text-sidebar-muted" />
          <span className="flex-1 text-left truncate">Acme Corporation</span>
          <ChevronDown className="h-3 w-3 text-sidebar-muted" />
        </button>
      </div>

      {/* Search */}
      <div className="mx-3 mt-2 mb-1">
        <div className="flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent/50 px-3 py-1.5 text-xs text-sidebar-muted">
          <Search className="h-3.5 w-3.5" />
          <span>Search...</span>
          <span className="ml-auto kbd">⌘K</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2" role="navigation" aria-label="Main navigation">
        {navSections.map((section) => (
          <div key={section.label}>
            <button
              onClick={() => toggleSection(section.label)}
              className="sidebar-nav-section w-full flex items-center justify-between cursor-pointer hover:text-sidebar-foreground/60"
              aria-expanded={!collapsed[section.label]}
            >
              {section.label}
              {collapsed[section.label] ? (
                <ChevronRight className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>
            {!collapsed[section.label] && (
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        `sidebar-nav-item ${isActive ? "active" : ""}`
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {/* User Menu */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-accent-foreground truncate">Admin User</p>
            <p className="text-[10px] text-sidebar-muted">Administrator</p>
          </div>
          <button className="rounded-md p-1.5 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
