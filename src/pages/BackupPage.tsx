import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/shared/StatusBadge";
import { Database, Download, Upload, Clock, HardDrive } from "lucide-react";

const backups = [
  { name: "backup-2026-03-11-0900.sql.gz", size: "245 MB", type: "Full", created: "2026-03-11 09:00", status: "online" as const, label: "Completed" },
  { name: "backup-2026-03-10-0900.sql.gz", size: "243 MB", type: "Full", created: "2026-03-10 09:00", status: "online" as const, label: "Completed" },
  { name: "backup-2026-03-09-0900.sql.gz", size: "241 MB", type: "Full", created: "2026-03-09 09:00", status: "online" as const, label: "Completed" },
  { name: "backup-2026-03-08-incremental.sql.gz", size: "12 MB", type: "Incremental", created: "2026-03-08 18:00", status: "online" as const, label: "Completed" },
];

const BackupPage = () => (
  <div>
    <div className="page-header">
      <div>
        <h1 className="page-title">Backup & Restore</h1>
        <p className="page-description">Database backups, scheduled jobs, and restore operations</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-1.5"><Upload className="h-3.5 w-3.5" /> Restore</Button>
        <Button size="sm" className="gap-1.5"><Database className="h-3.5 w-3.5" /> Backup Now</Button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card><CardContent className="pt-4"><p className="text-xs text-muted-foreground uppercase tracking-wide">Last Backup</p><p className="mt-1 text-lg font-semibold">2 hours ago</p></CardContent></Card>
      <Card><CardContent className="pt-4"><p className="text-xs text-muted-foreground uppercase tracking-wide">Schedule</p><p className="mt-1 text-lg font-semibold">Daily 09:00 UTC</p></CardContent></Card>
      <Card><CardContent className="pt-4"><p className="text-xs text-muted-foreground uppercase tracking-wide">Total Size</p><p className="mt-1 text-lg font-semibold">2.8 GB</p></CardContent></Card>
    </div>

    <Card>
      <CardHeader><CardTitle className="text-sm">Backup History</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-2">
          {backups.map((b) => (
            <div key={b.name} className="flex items-center gap-4 p-3 rounded-md border hover:bg-muted/50 transition-colors">
              <HardDrive className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono font-medium truncate">{b.name}</p>
                <p className="text-xs text-muted-foreground">{b.created} · {b.size}</p>
              </div>
              <Badge variant="outline" className="text-[10px]">{b.type}</Badge>
              <StatusBadge status={b.status} label={b.label} />
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1"><Download className="h-3 w-3" /> Download</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default BackupPage;
