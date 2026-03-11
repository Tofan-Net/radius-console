import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/shared/StatusBadge";
import DataTable, { Column } from "@/components/shared/DataTable";
import { Fingerprint, Plus, RefreshCw, Trash2 } from "lucide-react";

const mockOtp = [
  { username: "john.doe", type: "TOTP", enrolled: "2026-01-15", lastUsed: "2 min ago", status: "online" as const, label: "Active" },
  { username: "jane.smith", type: "YubiKey", enrolled: "2025-11-20", lastUsed: "1 hr ago", status: "online" as const, label: "Active" },
  { username: "bob.wilson", type: "TOTP", enrolled: "2026-02-01", lastUsed: "3 days ago", status: "warning" as const, label: "Unused" },
  { username: "alice.brown", type: "TOTP", enrolled: "—", lastUsed: "—", status: "pending" as const, label: "Not enrolled" },
];

const columns: Column<typeof mockOtp[0]>[] = [
  { key: "username", label: "Username", render: (r) => <span className="font-mono text-sm font-medium">{r.username}</span> },
  { key: "type", label: "Method", render: (r) => <Badge variant="outline" className="text-[10px]">{r.type}</Badge> },
  { key: "enrolled", label: "Enrolled", render: (r) => <span className="text-xs">{r.enrolled}</span> },
  { key: "lastUsed", label: "Last Used" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} label={r.label} /> },
  { key: "actions", label: "", render: (r) => (
    <div className="flex gap-1">
      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><RefreshCw className="h-3 w-3" /> Reset</Button>
      {r.status !== "pending" && <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-destructive"><Trash2 className="h-3 w-3" /> Remove</Button>}
    </div>
  )},
];

const OTPPage = () => (
  <div>
    <div className="page-header">
      <div>
        <h1 className="page-title">OTP / 2FA Management</h1>
        <p className="page-description">TOTP and YubiKey enrollment, reset, and status</p>
      </div>
      <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Enroll User</Button>
    </div>
    <DataTable columns={columns} data={mockOtp} searchPlaceholder="Search by username..." />
  </div>
);

export default OTPPage;
