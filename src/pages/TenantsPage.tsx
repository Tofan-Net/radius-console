import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DataTable, { Column } from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { Plus, Building2 } from "lucide-react";
import TenantFormDialog from "@/components/forms/TenantFormDialog";

const mockTenants = [
  { id: 1, name: "Acme Corporation", realm: "acme.com", users: 8420, sessions: 2100, status: "online" as const, mode: "SQL", callerIps: "10.0.0.0/8", apiToken: "tk_acme_•••" },
  { id: 2, name: "Globex Inc", realm: "globex.net", users: 3200, sessions: 890, status: "online" as const, mode: "REST", callerIps: "172.16.0.0/12", apiToken: "tk_glob_•••" },
  { id: 3, name: "Initech Labs", realm: "initech.io", users: 1100, sessions: 301, status: "warning" as const, mode: "SQL", callerIps: "192.168.0.0/16", apiToken: "tk_init_•••" },
  { id: 4, name: "Umbrella Corp", realm: "umbrella.org", users: 127, sessions: 0, status: "offline" as const, mode: "SQL", callerIps: "*", apiToken: "tk_umbr_•••" },
];

const columns: Column<typeof mockTenants[0]>[] = [
  { key: "name", label: "Tenant", render: (r) => <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-muted-foreground" /><span className="font-medium">{r.name}</span></div> },
  { key: "realm", label: "Realm", render: (r) => <span className="font-mono text-xs">{r.realm}</span> },
  { key: "mode", label: "Integration", render: (r) => <Badge variant="outline" className="text-[10px]">{r.mode}</Badge> },
  { key: "users", label: "Users", render: (r) => r.users.toLocaleString() },
  { key: "sessions", label: "Sessions", render: (r) => r.sessions.toLocaleString() },
  { key: "callerIps", label: "Allowed IPs", render: (r) => <span className="font-mono text-xs">{r.callerIps}</span> },
  { key: "apiToken", label: "API Token", render: (r) => <span className="font-mono text-xs">{r.apiToken}</span> },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} label={r.status === "online" ? "Active" : r.status === "warning" ? "Degraded" : "Suspended"} /> },
];

const TenantsPage = () => {
  const [createDialog, setCreateDialog] = useState(false);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tenants / Realms</h1>
          <p className="page-description">Multi-tenant scoping with realm mapping, API tokens, and allowed caller IPs</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setCreateDialog(true)}>
          <Plus className="h-3.5 w-3.5" /> Add Tenant
        </Button>
      </div>
      <DataTable columns={columns} data={mockTenants} searchPlaceholder="Search tenants by name or realm..." />
      <TenantFormDialog open={createDialog} onOpenChange={setCreateDialog} />
    </div>
  );
};

export default TenantsPage;
