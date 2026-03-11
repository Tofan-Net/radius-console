import DataTable, { Column } from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus, HardDrive } from "lucide-react";

const mockDevices = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  mac: `${["AA", "BB", "CC", "DD", "EE"][i % 5]}:11:22:33:44:${String(i + 10).padStart(2, "0")}`,
  description: ["Printer Floor 3", "IP Phone Lobby", "IoT Sensor A1", "Camera East Wing", "Badge Reader"][i % 5],
  group: ["iot-devices", "printers", "phones", "cameras", "access-ctrl"][i % 5],
  authType: "MAC",
  vlan: [400, 410, 420, 430, 440][i % 5],
  lastSeen: ["2 min ago", "1 hr ago", "3 hrs ago", "1 day ago", "Never"][i % 5],
  status: (["online", "online", "online", "offline", "pending"] as const)[i % 5],
  statusLabel: ["Active", "Active", "Active", "Offline", "Pending"][i % 5],
}));

const columns: Column<typeof mockDevices[0]>[] = [
  { key: "mac", label: "MAC Address", render: (r) => <span className="font-mono text-xs font-medium">{r.mac}</span> },
  { key: "description", label: "Description" },
  { key: "group", label: "Group", render: (r) => <span className="font-mono text-xs">{r.group}</span> },
  { key: "vlan", label: "VLAN" },
  { key: "lastSeen", label: "Last Seen" },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} label={r.statusLabel} /> },
];

const DevicesPage = () => (
  <div>
    <div className="page-header">
      <div>
        <h1 className="page-title">MAC Auth Devices</h1>
        <p className="page-description">Manage MAC authentication bypass (MAB) device entries</p>
      </div>
      <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Add Device</Button>
    </div>
    <DataTable columns={columns} data={mockDevices} searchPlaceholder="Search by MAC, description, or group..." onExport={() => {}} />
  </div>
);

export default DevicesPage;
