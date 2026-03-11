import DataTable, { Column } from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Filter } from "lucide-react";

const mockAudit = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  timestamp: `2026-03-${String(11 - (i % 5)).padStart(2, "0")} ${String(8 + (i % 16)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}:${String((i * 13) % 60).padStart(2, "0")}`,
  actor: ["admin@acme.com", "operator@acme.com", "helpdesk@acme.com", "system"][i % 4],
  role: ["Administrator", "Operator", "Helpdesk", "System"][i % 4],
  action: ["user.created", "user.disabled", "session.disconnected", "config.deployed", "group.updated", "cert.issued", "tenant.created", "rbac.updated"][i % 8],
  target: ["john.doe", "jane.smith", "core-sw-01", "Production", "employees", "CA-Root", "Acme Corp", "operator-role"][i % 8],
  reason: i % 3 === 0 ? "Policy violation detected" : i % 3 === 1 ? "Scheduled maintenance" : "User request",
  status: (["online", "online", "warning", "error"] as const)[i % 4],
  statusLabel: ["Success", "Success", "Warning", "Failed"][i % 4],
  tenant: "acme",
  ip: `192.168.1.${100 + (i % 50)}`,
}));

const columns: Column<typeof mockAudit[0]>[] = [
  { key: "timestamp", label: "Timestamp", render: (r) => <span className="font-mono text-xs">{r.timestamp}</span> },
  { key: "actor", label: "Actor", render: (r) => <span className="font-mono text-xs">{r.actor}</span> },
  { key: "role", label: "Role", render: (r) => <Badge variant="outline" className="text-[10px]">{r.role}</Badge> },
  { key: "action", label: "Action", render: (r) => <span className="font-mono text-xs font-medium">{r.action}</span> },
  { key: "target", label: "Target", render: (r) => <span className="text-sm">{r.target}</span> },
  { key: "reason", label: "Reason", render: (r) => <span className="text-xs text-muted-foreground truncate max-w-[200px] block">{r.reason}</span> },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} label={r.statusLabel} /> },
  { key: "ip", label: "Source IP", render: (r) => <span className="font-mono text-xs">{r.ip}</span> },
];

const AuditLogsPage = () => (
  <div>
    <div className="page-header">
      <div>
        <h1 className="page-title">Audit Logs</h1>
        <p className="page-description">Immutable record of all privileged actions (who, what, when, why)</p>
      </div>
      <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Export</Button>
    </div>
    <DataTable columns={columns} data={mockAudit} searchPlaceholder="Search by actor, action, target, or reason..." onExport={() => {}} />
  </div>
);

export default AuditLogsPage;
