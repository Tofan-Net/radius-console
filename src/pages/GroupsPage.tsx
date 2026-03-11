import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DataTable, { Column } from "@/components/shared/DataTable";
import { Plus, Users, ChevronRight } from "lucide-react";

const mockGroups = [
  { name: "employees", description: "Full-time employees", members: 8420, priority: 1, checkAttrs: 3, replyAttrs: 5, status: "Active" },
  { name: "contractors", description: "External contractors", members: 1240, priority: 2, checkAttrs: 4, replyAttrs: 4, status: "Active" },
  { name: "guests", description: "Guest WiFi access", members: 2890, priority: 5, checkAttrs: 2, replyAttrs: 3, status: "Active" },
  { name: "vpn-users", description: "VPN remote access", members: 560, priority: 3, checkAttrs: 3, replyAttrs: 6, status: "Active" },
  { name: "iot-devices", description: "IoT and sensor devices", members: 1340, priority: 4, checkAttrs: 2, replyAttrs: 2, status: "Active" },
  { name: "disabled", description: "Disabled accounts", members: 89, priority: 99, checkAttrs: 1, replyAttrs: 0, status: "Disabled" },
];

const columns: Column<typeof mockGroups[0]>[] = [
  { key: "name", label: "Group Name", render: (r) => <span className="font-mono text-sm font-medium text-primary">{r.name}</span> },
  { key: "description", label: "Description" },
  { key: "members", label: "Members", render: (r) => <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-muted-foreground" />{r.members.toLocaleString()}</div> },
  { key: "priority", label: "Priority", render: (r) => <Badge variant="outline">{r.priority}</Badge> },
  { key: "checkAttrs", label: "Check Attrs", render: (r) => <span className="text-muted-foreground">{r.checkAttrs}</span> },
  { key: "replyAttrs", label: "Reply Attrs", render: (r) => <span className="text-muted-foreground">{r.replyAttrs}</span> },
  { key: "actions", label: "", render: () => <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><ChevronRight className="h-4 w-4" /></Button> },
];

const GroupsPage = () => (
  <div>
    <div className="page-header">
      <div>
        <h1 className="page-title">Groups</h1>
        <p className="page-description">Manage RADIUS groups (radusergroup), check/reply attributes, and membership</p>
      </div>
      <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Create Group</Button>
    </div>
    <DataTable columns={columns} data={mockGroups} searchPlaceholder="Search groups..." />
  </div>
);

export default GroupsPage;
