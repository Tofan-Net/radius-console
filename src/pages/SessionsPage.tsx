import { useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable, { Column } from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import StatCard from "@/components/shared/StatCard";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { Wifi, Clock, ArrowUpDown, Zap } from "lucide-react";

const mockSessions = Array.from({ length: 24 }, (_, i) => ({
  id: `sess-${String(i + 1).padStart(4, "0")}`,
  username: ["john.doe", "jane.smith", "bob.wilson", "alice.brown", "device-0A1B2C", "guest-4821"][i % 6],
  nasIdentifier: ["core-sw-01", "ap-building-a", "vpn-gw-01", "wifi-ctrl-02"][i % 4],
  framedIp: `10.${(i % 3) + 1}.${Math.floor(i / 3) + 100}.${(i * 7 + 42) % 255}`,
  callingStationId: `${["AA", "BB", "CC", "DD"][i % 4]}:11:22:33:44:${String(55 + i).slice(0, 2)}`,
  duration: [`${i + 1}m`, `${Math.floor(i / 2)}h ${(i * 13) % 60}m`, "12h 5m"][i % 3],
  inputOctets: `${((i + 1) * 47) % 2000} MB`,
  outputOctets: `${((i + 1) * 12) % 500} MB`,
  authType: ["PAP", "EAP-TLS", "PEAP", "MAC"][i % 4],
  status: "online" as const,
}));

const SessionsPage = () => {
  const [disconnectDialog, setDisconnectDialog] = useState(false);

  const columns: Column<typeof mockSessions[0]>[] = [
    { key: "username", label: "Username", render: (r) => <span className="font-mono text-xs font-medium">{r.username}</span> },
    { key: "nasIdentifier", label: "NAS", render: (r) => <span className="font-mono text-xs">{r.nasIdentifier}</span> },
    { key: "framedIp", label: "Framed IP", render: (r) => <span className="font-mono text-xs">{r.framedIp}</span> },
    { key: "callingStationId", label: "MAC", render: (r) => <span className="font-mono text-xs">{r.callingStationId}</span> },
    { key: "duration", label: "Duration" },
    { key: "inputOctets", label: "Download" },
    { key: "outputOctets", label: "Upload" },
    { key: "authType", label: "Auth" },
    {
      key: "actions",
      label: "",
      render: () => (
        <Button variant="outline" size="sm" className="h-7 text-xs text-destructive" onClick={() => setDisconnectDialog(true)}>
          Disconnect
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Active Sessions</h1>
          <p className="page-description">Live view of currently authenticated users and devices</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground animate-pulse-dot">● Live</span>
          <Button variant="outline" size="sm">Disconnect All (NAS)</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Sessions" value="3,291" icon={Wifi} />
        <StatCard title="Avg Duration" value="2h 34m" icon={Clock} />
        <StatCard title="Data Transfer" value="4.2 TB" change="Today" changeType="neutral" icon={ArrowUpDown} />
        <StatCard title="Auth/min" value="142" change="+12% vs avg" changeType="positive" icon={Zap} />
      </div>

      <DataTable
        columns={columns}
        data={mockSessions}
        searchPlaceholder="Search by username, NAS, IP, or MAC..."
        onExport={() => {}}
        bulkActions={
          <Button variant="outline" size="sm" className="h-8 text-xs text-destructive">
            Disconnect Selected
          </Button>
        }
      />

      <ConfirmDialog
        open={disconnectDialog}
        onOpenChange={setDisconnectDialog}
        title="Disconnect Session"
        description="This will send a Disconnect-Request (PoD) to the NAS. If the NAS does not support RFC 3576/5765, the session may persist until timeout. The user may reconnect immediately."
        confirmLabel="Send Disconnect-Request"
        variant="destructive"
        requireReason
        onConfirm={() => setDisconnectDialog(false)}
      />
    </div>
  );
};

export default SessionsPage;
