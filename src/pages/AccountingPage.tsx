import DataTable, { Column } from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const mockAccounting = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  acctSessionId: `acct-${String(i + 1000).padStart(6, "0")}`,
  username: ["john.doe", "jane.smith", "bob.wilson", "alice.brown", "guest-1234"][i % 5],
  nasIp: `10.0.${i % 3}.${1 + (i % 10)}`,
  acctStartTime: `2026-03-${String(11 - (i % 10)).padStart(2, "0")} ${String(8 + (i % 12)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
  acctStopTime: i % 3 === 0 ? "—" : `2026-03-${String(11 - (i % 10)).padStart(2, "0")} ${String(10 + (i % 12)).padStart(2, "0")}:${String((i * 13) % 60).padStart(2, "0")}`,
  sessionTime: `${(i * 23 + 15) % 720} min`,
  inputOctets: `${((i + 1) * 120) % 5000} MB`,
  outputOctets: `${((i + 1) * 30) % 1200} MB`,
  terminateCause: ["User-Request", "Session-Timeout", "NAS-Reboot", "Admin-Reset", ""][i % 5],
  status: (i % 3 === 0 ? "online" : "offline") as "online" | "offline",
}));

const columns: Column<typeof mockAccounting[0]>[] = [
  { key: "acctSessionId", label: "Session ID", render: (r) => <span className="font-mono text-xs">{r.acctSessionId}</span> },
  { key: "username", label: "Username", render: (r) => <span className="font-mono text-xs font-medium">{r.username}</span> },
  { key: "nasIp", label: "NAS IP", render: (r) => <span className="font-mono text-xs">{r.nasIp}</span> },
  { key: "acctStartTime", label: "Start", render: (r) => <span className="text-xs">{r.acctStartTime}</span> },
  { key: "acctStopTime", label: "Stop", render: (r) => <span className="text-xs">{r.acctStopTime}</span> },
  { key: "sessionTime", label: "Duration" },
  { key: "inputOctets", label: "Download" },
  { key: "outputOctets", label: "Upload" },
  { key: "terminateCause", label: "Terminate Cause", render: (r) => r.terminateCause ? <span className="text-xs">{r.terminateCause}</span> : <span className="text-muted-foreground text-xs">—</span> },
  { key: "status", label: "State", render: (r) => <StatusBadge status={r.status} label={r.status === "online" ? "Active" : "Closed"} /> },
];

const AccountingPage = () => (
  <div>
    <div className="page-header">
      <div>
        <h1 className="page-title">Accounting Records</h1>
        <p className="page-description">Browse RADIUS accounting data (radacct) with full session details</p>
      </div>
      <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Export CSV</Button>
    </div>
    <DataTable columns={columns} data={mockAccounting} searchPlaceholder="Search by session ID, username, or NAS..." onExport={() => {}} />
  </div>
);

export default AccountingPage;
