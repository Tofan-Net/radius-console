import { useState } from "react";
import DataTable, { Column } from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus, Server } from "lucide-react";
import NASFormDialog from "@/components/forms/NASFormDialog";

const mockNas = [
  { id: 1, nasname: "10.0.0.1", shortname: "core-sw-01", type: "Cisco", secret: "•••••••••", ports: 48, description: "Core Switch Building A", status: "online" as const, coa: true },
  { id: 2, nasname: "10.0.0.2", shortname: "ap-building-a", type: "Aruba", secret: "•••••••••", ports: 0, description: "Wireless Controller", status: "online" as const, coa: true },
  { id: 3, nasname: "10.0.0.3", shortname: "vpn-gw-01", type: "Fortinet", secret: "•••••••••", ports: 0, description: "VPN Gateway", status: "warning" as const, coa: false },
  { id: 4, nasname: "10.0.0.4", shortname: "wifi-ctrl-02", type: "Ruckus", secret: "•••••••••", ports: 0, description: "WiFi Controller B", status: "offline" as const, coa: true },
];

const columns: Column<typeof mockNas[0]>[] = [
  { key: "shortname", label: "Name", render: (r) => <div className="flex items-center gap-2"><Server className="h-4 w-4 text-muted-foreground" /><span className="font-mono text-sm font-medium">{r.shortname}</span></div> },
  { key: "nasname", label: "IP/Host", render: (r) => <span className="font-mono text-xs">{r.nasname}</span> },
  { key: "type", label: "Vendor" },
  { key: "description", label: "Description" },
  { key: "coa", label: "CoA/DM", render: (r) => r.coa ? <span className="text-xs text-success">Supported</span> : <span className="text-xs text-muted-foreground">Not supported</span> },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} label={r.status === "online" ? "Online" : r.status === "warning" ? "Degraded" : "Unreachable"} /> },
];

const NASPage = () => {
  const [createDialog, setCreateDialog] = useState(false);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">NAS Devices</h1>
          <p className="page-description">Network Access Servers registered for RADIUS authentication</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setCreateDialog(true)}>
          <Plus className="h-3.5 w-3.5" /> Add NAS
        </Button>
      </div>
      <DataTable columns={columns} data={mockNas} searchPlaceholder="Search by name, IP, or vendor..." />
      <NASFormDialog open={createDialog} onOpenChange={setCreateDialog} />
    </div>
  );
};

export default NASPage;
