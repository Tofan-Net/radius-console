import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "@/components/shared/StatusBadge";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import UserFormDialog from "@/components/forms/UserFormDialog";
import { ArrowLeft, Edit, Lock, Key, Wifi, FileText, ScrollText, Shield, Fingerprint, Award, RefreshCw, Trash2, Download } from "lucide-react";

const UserDetail = () => {
  const { id } = useParams();
  const [editDialog, setEditDialog] = useState(false);
  const [disableDialog, setDisableDialog] = useState(false);
  const [disconnectDialog, setDisconnectDialog] = useState(false);
  const [resetOtpDialog, setResetOtpDialog] = useState(false);

  return (
    <div>
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Link to="/users">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="page-title font-mono">john.doe</h1>
              <StatusBadge status="online" label="Active" />
            </div>
            <p className="page-description">john.doe@acme.com · Tenant: Acme Corporation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Key className="h-3.5 w-3.5" /> Reset Password</Button>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setDisableDialog(true)}><Lock className="h-3.5 w-3.5" /> Disable</Button>
          <Button size="sm" className="gap-1.5" onClick={() => setEditDialog(true)}><Edit className="h-3.5 w-3.5" /> Edit</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="pt-4"><p className="text-xs text-muted-foreground uppercase tracking-wide">Auth Type</p><p className="mt-1 text-lg font-semibold">EAP-TLS</p></CardContent></Card>
        <Card><CardContent className="pt-4"><p className="text-xs text-muted-foreground uppercase tracking-wide">Active Sessions</p><p className="mt-1 text-lg font-semibold text-success">2</p></CardContent></Card>
        <Card><CardContent className="pt-4"><p className="text-xs text-muted-foreground uppercase tracking-wide">Last Authentication</p><p className="mt-1 text-lg font-semibold">2 min ago</p></CardContent></Card>
        <Card><CardContent className="pt-4"><p className="text-xs text-muted-foreground uppercase tracking-wide">Groups</p><div className="flex gap-1 mt-1"><Badge variant="secondary">employees</Badge><Badge variant="secondary">vpn-users</Badge></div></CardContent></Card>
      </div>

      <Tabs defaultValue="attributes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="attributes" className="gap-1.5"><Shield className="h-3.5 w-3.5" /> Check/Reply Attrs</TabsTrigger>
          <TabsTrigger value="sessions" className="gap-1.5"><Wifi className="h-3.5 w-3.5" /> Active Sessions</TabsTrigger>
          <TabsTrigger value="accounting" className="gap-1.5"><FileText className="h-3.5 w-3.5" /> Accounting</TabsTrigger>
          <TabsTrigger value="otp" className="gap-1.5"><Fingerprint className="h-3.5 w-3.5" /> OTP / 2FA</TabsTrigger>
          <TabsTrigger value="certs" className="gap-1.5"><Award className="h-3.5 w-3.5" /> Certificates</TabsTrigger>
          <TabsTrigger value="audit" className="gap-1.5"><ScrollText className="h-3.5 w-3.5" /> Audit Log</TabsTrigger>
        </TabsList>

        {/* Check/Reply Attributes */}
        <TabsContent value="attributes">
          <Card>
            <CardHeader><CardTitle className="text-sm">Check Attributes (radcheck)</CardTitle></CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm" role="table">
                  <thead><tr className="border-b bg-muted/50"><th className="data-table-header text-left p-3">Attribute</th><th className="data-table-header text-left p-3">Op</th><th className="data-table-header text-left p-3">Value</th><th className="data-table-header text-left p-3">Source</th></tr></thead>
                  <tbody>
                    <tr className="border-b"><td className="p-3 font-mono text-xs">Cleartext-Password</td><td className="p-3">:=</td><td className="p-3 font-mono text-xs">••••••••</td><td className="p-3"><Badge variant="outline" className="text-[10px]">radcheck</Badge></td></tr>
                    <tr className="border-b"><td className="p-3 font-mono text-xs">Simultaneous-Use</td><td className="p-3">:=</td><td className="p-3 font-mono text-xs">3</td><td className="p-3"><Badge variant="outline" className="text-[10px]">radcheck</Badge></td></tr>
                    <tr><td className="p-3 font-mono text-xs">Expiration</td><td className="p-3">:=</td><td className="p-3 font-mono text-xs">2026-12-31</td><td className="p-3"><Badge variant="outline" className="text-[10px]">radcheck</Badge></td></tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6">
                <CardTitle className="text-sm mb-3">Reply Attributes (radreply)</CardTitle>
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full text-sm" role="table">
                    <thead><tr className="border-b bg-muted/50"><th className="data-table-header text-left p-3">Attribute</th><th className="data-table-header text-left p-3">Op</th><th className="data-table-header text-left p-3">Value</th></tr></thead>
                    <tbody>
                      <tr className="border-b"><td className="p-3 font-mono text-xs">Tunnel-Type</td><td className="p-3">:=</td><td className="p-3 font-mono text-xs">VLAN</td></tr>
                      <tr className="border-b"><td className="p-3 font-mono text-xs">Tunnel-Medium-Type</td><td className="p-3">:=</td><td className="p-3 font-mono text-xs">IEEE-802</td></tr>
                      <tr><td className="p-3 font-mono text-xs">Tunnel-Private-Group-Id</td><td className="p-3">:=</td><td className="p-3 font-mono text-xs">100</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Sessions */}
        <TabsContent value="sessions">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm" role="table">
                  <thead><tr className="border-b bg-muted/50"><th className="data-table-header text-left p-3">Session ID</th><th className="data-table-header text-left p-3">NAS</th><th className="data-table-header text-left p-3">IP</th><th className="data-table-header text-left p-3">Duration</th><th className="data-table-header text-left p-3">In/Out</th><th className="data-table-header text-left p-3"></th></tr></thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-xs">a1b2c3d4e5f6</td><td className="p-3 font-mono text-xs">core-sw-01</td><td className="p-3 font-mono text-xs">10.1.100.42</td><td className="p-3">2h 15m</td><td className="p-3 text-xs">1.2 GB / 340 MB</td>
                      <td className="p-3"><Button variant="outline" size="sm" className="h-7 text-xs text-destructive" onClick={() => setDisconnectDialog(true)}>Disconnect</Button></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-xs">f6e5d4c3b2a1</td><td className="p-3 font-mono text-xs">vpn-gw-01</td><td className="p-3 font-mono text-xs">10.2.50.18</td><td className="p-3">45m</td><td className="p-3 text-xs">89 MB / 12 MB</td>
                      <td className="p-3"><Button variant="outline" size="sm" className="h-7 text-xs text-destructive" onClick={() => setDisconnectDialog(true)}>Disconnect</Button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accounting History */}
        <TabsContent value="accounting">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Session History</CardTitle>
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1"><Download className="h-3 w-3" /> Export CSV</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm" role="table">
                  <thead><tr className="border-b bg-muted/50"><th className="data-table-header text-left p-3">Session ID</th><th className="data-table-header text-left p-3">NAS</th><th className="data-table-header text-left p-3">Start</th><th className="data-table-header text-left p-3">Stop</th><th className="data-table-header text-left p-3">Duration</th><th className="data-table-header text-left p-3">Download</th><th className="data-table-header text-left p-3">Upload</th><th className="data-table-header text-left p-3">Cause</th></tr></thead>
                  <tbody>
                    {[
                      { id: "acct-001200", nas: "core-sw-01", start: "2026-03-11 08:15", stop: "2026-03-11 17:30", dur: "9h 15m", dl: "4.2 GB", ul: "890 MB", cause: "User-Request" },
                      { id: "acct-001180", nas: "vpn-gw-01", start: "2026-03-10 14:20", stop: "2026-03-10 16:45", dur: "2h 25m", dl: "320 MB", ul: "45 MB", cause: "Session-Timeout" },
                      { id: "acct-001150", nas: "core-sw-01", start: "2026-03-10 08:00", stop: "2026-03-10 17:00", dur: "9h 0m", dl: "3.8 GB", ul: "720 MB", cause: "User-Request" },
                      { id: "acct-001100", nas: "ap-building-a", start: "2026-03-09 09:30", stop: "2026-03-09 12:15", dur: "2h 45m", dl: "1.1 GB", ul: "230 MB", cause: "NAS-Reboot" },
                      { id: "acct-001050", nas: "core-sw-01", start: "2026-03-08 08:10", stop: "2026-03-08 17:20", dur: "9h 10m", dl: "5.1 GB", ul: "1.2 GB", cause: "User-Request" },
                    ].map((r) => (
                      <tr key={r.id} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-mono text-xs">{r.id}</td>
                        <td className="p-3 font-mono text-xs">{r.nas}</td>
                        <td className="p-3 text-xs">{r.start}</td>
                        <td className="p-3 text-xs">{r.stop}</td>
                        <td className="p-3 text-xs">{r.dur}</td>
                        <td className="p-3 text-xs">{r.dl}</td>
                        <td className="p-3 text-xs">{r.ul}</td>
                        <td className="p-3 text-xs">{r.cause}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* OTP / 2FA */}
        <TabsContent value="otp">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Two-Factor Authentication</CardTitle>
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => setResetOtpDialog(true)}>
                  <RefreshCw className="h-3 w-3" /> Reset Token
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Method</p>
                  <p className="mt-1 font-semibold">TOTP</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Enrolled</p>
                  <p className="mt-1 font-semibold">2026-01-15</p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Last Used</p>
                  <p className="mt-1 font-semibold">2 min ago</p>
                </div>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Recovery Codes</p>
                <div className="grid grid-cols-2 gap-1">
                  {["a1b2-c3d4", "e5f6-g7h8", "i9j0-k1l2", "m3n4-o5p6", "q7r8-s9t0", "u1v2-w3x4"].map((code) => (
                    <span key={code} className="font-mono text-xs text-muted-foreground">{code}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certificates */}
        <TabsContent value="certs">
          <Card>
            <CardHeader><CardTitle className="text-sm">Client Certificates</CardTitle></CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm" role="table">
                  <thead><tr className="border-b bg-muted/50"><th className="data-table-header text-left p-3">Serial</th><th className="data-table-header text-left p-3">Subject</th><th className="data-table-header text-left p-3">Issuer</th><th className="data-table-header text-left p-3">Issued</th><th className="data-table-header text-left p-3">Expires</th><th className="data-table-header text-left p-3">Status</th><th className="data-table-header text-left p-3"></th></tr></thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-xs">03:23:45</td>
                      <td className="p-3 font-mono text-xs">john.doe@acme.com</td>
                      <td className="p-3 text-xs">CA-Root-2024</td>
                      <td className="p-3 text-xs">2025-09-30</td>
                      <td className="p-3 text-xs">2026-09-30</td>
                      <td className="p-3"><StatusBadge status="online" label="Valid" /></td>
                      <td className="p-3"><Button variant="outline" size="sm" className="h-7 text-xs text-destructive">Revoke</Button></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-xs">02:11:22</td>
                      <td className="p-3 font-mono text-xs">john.doe@acme.com</td>
                      <td className="p-3 text-xs">CA-Root-2022</td>
                      <td className="p-3 text-xs">2024-03-15</td>
                      <td className="p-3 text-xs">2025-03-15</td>
                      <td className="p-3"><StatusBadge status="error" label="Expired" /></td>
                      <td className="p-3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Log */}
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">User Activity Log</CardTitle>
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1"><Download className="h-3 w-3" /> Export</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm" role="table">
                  <thead><tr className="border-b bg-muted/50"><th className="data-table-header text-left p-3">Timestamp</th><th className="data-table-header text-left p-3">Actor</th><th className="data-table-header text-left p-3">Action</th><th className="data-table-header text-left p-3">Details</th><th className="data-table-header text-left p-3">Status</th></tr></thead>
                  <tbody>
                    {[
                      { ts: "2026-03-11 09:15:22", actor: "admin@acme.com", action: "user.password_reset", detail: "Password changed via admin portal", status: "online" as const, label: "Success" },
                      { ts: "2026-03-10 14:30:05", actor: "system", action: "session.authenticated", detail: "EAP-TLS via core-sw-01", status: "online" as const, label: "Success" },
                      { ts: "2026-03-10 08:22:18", actor: "operator@acme.com", action: "user.group_changed", detail: "Added to vpn-users group", status: "online" as const, label: "Success" },
                      { ts: "2026-03-09 16:45:00", actor: "system", action: "session.auth_failed", detail: "Invalid certificate from ap-building-a", status: "error" as const, label: "Failed" },
                      { ts: "2026-03-08 11:00:33", actor: "helpdesk@acme.com", action: "user.otp_reset", detail: "TOTP token reset by helpdesk", status: "warning" as const, label: "Warning" },
                      { ts: "2026-03-07 09:10:00", actor: "admin@acme.com", action: "user.created", detail: "Account created with employees group", status: "online" as const, label: "Success" },
                    ].map((e, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-mono text-xs">{e.ts}</td>
                        <td className="p-3 font-mono text-xs">{e.actor}</td>
                        <td className="p-3 font-mono text-xs font-medium">{e.action}</td>
                        <td className="p-3 text-xs text-muted-foreground">{e.detail}</td>
                        <td className="p-3"><StatusBadge status={e.status} label={e.label} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <UserFormDialog open={editDialog} onOpenChange={setEditDialog} mode="edit" />
      <ConfirmDialog
        open={disableDialog}
        onOpenChange={setDisableDialog}
        title="Disable User Account"
        description="This will immediately terminate all active sessions and prevent future authentication."
        confirmLabel="Disable User"
        variant="destructive"
        requireReason
        onConfirm={() => setDisableDialog(false)}
      />
      <ConfirmDialog
        open={disconnectDialog}
        onOpenChange={setDisconnectDialog}
        title="Disconnect Session"
        description="This will send a Disconnect-Request (PoD) to the NAS. If the NAS does not support RFC 3576/5765, the session may persist until timeout."
        confirmLabel="Send Disconnect-Request"
        variant="destructive"
        requireReason
        onConfirm={() => setDisconnectDialog(false)}
      />
      <ConfirmDialog
        open={resetOtpDialog}
        onOpenChange={setResetOtpDialog}
        title="Reset OTP Token"
        description="This will invalidate the current TOTP secret. The user will need to re-enroll."
        confirmLabel="Reset Token"
        variant="destructive"
        requireReason
        onConfirm={() => setResetOtpDialog(false)}
      />
    </div>
  );
};

export default UserDetail;
