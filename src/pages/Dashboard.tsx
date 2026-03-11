import { Users, Wifi, AlertTriangle, CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight, Server, Shield, Clock } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const authData = [
  { time: "00:00", success: 120, failed: 8 },
  { time: "04:00", success: 45, failed: 3 },
  { time: "08:00", success: 380, failed: 22 },
  { time: "12:00", success: 520, failed: 18 },
  { time: "16:00", success: 480, failed: 15 },
  { time: "20:00", success: 290, failed: 12 },
  { time: "Now", success: 340, failed: 10 },
];

const nasHealth = [
  { name: "core-sw-01", status: "online" as const, auths: 1240, uptime: "45d 12h" },
  { name: "ap-building-a", status: "online" as const, auths: 890, uptime: "12d 3h" },
  { name: "vpn-gw-01", status: "warning" as const, auths: 340, uptime: "2d 1h" },
  { name: "wifi-ctrl-02", status: "offline" as const, auths: 0, uptime: "0" },
];

const pendingApprovals = [
  { id: 1, action: "User activation", target: "john.doe@acme.com", requestedBy: "Helpdesk", time: "2 min ago" },
  { id: 2, action: "Certificate issuance", target: "device-0A:1B:2C", requestedBy: "Operator", time: "15 min ago" },
  { id: 3, action: "Config deployment", target: "Production realm", requestedBy: "Admin", time: "1 hr ago" },
];

const recentAlerts = [
  { severity: "error" as const, message: "NAS wifi-ctrl-02 unreachable for 15 minutes", time: "3 min ago" },
  { severity: "warning" as const, message: "High auth failure rate from 10.0.1.0/24 subnet", time: "12 min ago" },
  { severity: "warning" as const, message: "Certificate CA-Root expires in 30 days", time: "1 hr ago" },
  { severity: "online" as const, message: "Config v2.4.1 deployed successfully", time: "2 hr ago" },
];

const Dashboard = () => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-description">System overview and real-time monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Last updated: just now</span>
          <Button variant="outline" size="sm">Refresh</Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value="12,847" change="+142 this week" changeType="positive" icon={Users} />
        <StatCard title="Active Sessions" value="3,291" change="+8% vs yesterday" changeType="positive" icon={Wifi} />
        <StatCard title="Auth Success Rate" value="99.2%" change="-0.3% vs yesterday" changeType="negative" icon={CheckCircle2} iconColor="bg-success/10" />
        <StatCard title="Failed Auths (24h)" value="88" change="18 unique users" changeType="neutral" icon={XCircle} iconColor="bg-destructive/10" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Authentication Activity (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={authData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="time" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="success" stackId="1" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.15} />
                  <Area type="monotone" dataKey="failed" stackId="2" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.15} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Pending Approvals</CardTitle>
              <span className="status-badge status-badge-warning">{pendingApprovals.length}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <div className="rounded-full bg-warning/10 p-1.5 mt-0.5">
                  <Clock className="h-3 w-3 text-warning" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.target}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.requestedBy} · {item.time}</p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" className="h-7 text-xs">Approve</Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs">Deny</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* NAS Health */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">NAS Device Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {nasHealth.map((nas) => (
                <div key={nas.name} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium flex-1 font-mono">{nas.name}</span>
                  <StatusBadge status={nas.status} label={nas.status} />
                  <span className="text-xs text-muted-foreground w-20 text-right">{nas.auths} auths</span>
                  <span className="text-xs text-muted-foreground w-16 text-right">{nas.uptime}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Recent Alerts</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs h-7">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentAlerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <StatusBadge status={alert.severity} label={alert.severity === "online" ? "OK" : alert.severity === "error" ? "Critical" : "Warning"} />
                  <p className="text-sm flex-1">{alert.message}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
