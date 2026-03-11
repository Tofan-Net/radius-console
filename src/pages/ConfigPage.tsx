import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/shared/StatusBadge";
import { GitCompare, Eye, RotateCcw, Play, Upload } from "lucide-react";

const versions = [
  { version: "v2.4.1", author: "admin@acme.com", date: "2026-03-11 09:15", status: "online" as const, label: "Deployed", changes: 3 },
  { version: "v2.4.0", author: "admin@acme.com", date: "2026-03-10 14:30", status: "offline" as const, label: "Previous", changes: 7 },
  { version: "v2.3.2", author: "operator@acme.com", date: "2026-03-08 11:00", status: "offline" as const, label: "Previous", changes: 2 },
  { version: "v2.3.1", author: "admin@acme.com", date: "2026-03-05 16:45", status: "offline" as const, label: "Previous", changes: 5 },
];

const ConfigPage = () => (
  <div>
    <div className="page-header">
      <div>
        <h1 className="page-title">Config & Versioning</h1>
        <p className="page-description">Version control, diff viewer, and preview/simulate before deployment</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-1.5"><Play className="h-3.5 w-3.5" /> Simulate</Button>
        <Button size="sm" className="gap-1.5"><Upload className="h-3.5 w-3.5" /> Deploy</Button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Version History */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader><CardTitle className="text-sm">Version History</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {versions.map((v) => (
              <div key={v.version} className={`p-3 rounded-md border cursor-pointer transition-colors hover:bg-muted/50 ${v.status === "online" ? "border-primary/30 bg-primary/5" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-sm font-semibold">{v.version}</span>
                  <StatusBadge status={v.status} label={v.label} />
                </div>
                <p className="text-xs text-muted-foreground">{v.author}</p>
                <p className="text-xs text-muted-foreground">{v.date} · {v.changes} changes</p>
                <div className="flex gap-1 mt-2">
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1"><Eye className="h-3 w-3" /> View</Button>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1"><GitCompare className="h-3 w-3" /> Diff</Button>
                  {v.status !== "online" && <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1"><RotateCcw className="h-3 w-3" /> Rollback</Button>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Diff Viewer */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Diff: v2.4.0 → v2.4.1</CardTitle>
              <Badge variant="outline" className="text-[10px]">3 changes</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border bg-muted/30 p-4 font-mono text-xs space-y-2 overflow-x-auto">
              <div className="text-muted-foreground">--- radcheck (modified)</div>
              <div className="text-destructive">- Simultaneous-Use := 5</div>
              <div className="text-success">+ Simultaneous-Use := 3</div>
              <div className="mt-3 text-muted-foreground">--- radgroupreply/employees (modified)</div>
              <div className="text-destructive">- Session-Timeout := 86400</div>
              <div className="text-success">+ Session-Timeout := 43200</div>
              <div className="mt-3 text-muted-foreground">--- radreply/guest (added)</div>
              <div className="text-success">+ WISPr-Bandwidth-Max-Down := 10000000</div>
              <div className="text-success">+ WISPr-Bandwidth-Max-Up := 5000000</div>
            </div>

            {/* Simulate Results */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3">Simulation Results</h3>
              <div className="rounded-md border p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <StatusBadge status="online" label="Config Parse" />
                  <span className="text-sm">Configuration syntax validated successfully</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status="online" label="Test Packet" />
                  <span className="text-sm">User "test_user" → Accept (VLAN 100, Session-Timeout 43200)</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status="warning" label="Impact" />
                  <span className="text-sm">4,200 active users in "employees" group will be affected at next re-auth</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default ConfigPage;
