import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "@/components/shared/StatusBadge";
import { ArrowLeft, Edit, Lock, Key, Wifi, FileText, ScrollText, Shield, Fingerprint, Award } from "lucide-react";

const UserDetail = () => {
  const { id } = useParams();

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
          <Button variant="outline" size="sm" className="gap-1.5"><Lock className="h-3.5 w-3.5" /> Disable</Button>
          <Button size="sm" className="gap-1.5"><Edit className="h-3.5 w-3.5" /> Edit</Button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Auth Type</p>
            <p className="mt-1 text-lg font-semibold">EAP-TLS</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Active Sessions</p>
            <p className="mt-1 text-lg font-semibold text-success">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Last Authentication</p>
            <p className="mt-1 text-lg font-semibold">2 min ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Groups</p>
            <div className="flex gap-1 mt-1">
              <Badge variant="secondary">employees</Badge>
              <Badge variant="secondary">vpn-users</Badge>
            </div>
          </CardContent>
        </Card>
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

        <TabsContent value="attributes">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Check Attributes (radcheck)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="data-table-header text-left p-3">Attribute</th>
                      <th className="data-table-header text-left p-3">Op</th>
                      <th className="data-table-header text-left p-3">Value</th>
                      <th className="data-table-header text-left p-3">Source</th>
                    </tr>
                  </thead>
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
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="data-table-header text-left p-3">Attribute</th>
                        <th className="data-table-header text-left p-3">Op</th>
                        <th className="data-table-header text-left p-3">Value</th>
                      </tr>
                    </thead>
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

        <TabsContent value="sessions">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="data-table-header text-left p-3">Session ID</th>
                      <th className="data-table-header text-left p-3">NAS</th>
                      <th className="data-table-header text-left p-3">IP</th>
                      <th className="data-table-header text-left p-3">Duration</th>
                      <th className="data-table-header text-left p-3">In/Out</th>
                      <th className="data-table-header text-left p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-mono text-xs">a1b2c3d4e5f6</td>
                      <td className="p-3 font-mono text-xs">core-sw-01</td>
                      <td className="p-3 font-mono text-xs">10.1.100.42</td>
                      <td className="p-3">2h 15m</td>
                      <td className="p-3 text-xs">1.2 GB / 340 MB</td>
                      <td className="p-3"><Button variant="outline" size="sm" className="h-7 text-xs text-destructive">Disconnect</Button></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-xs">f6e5d4c3b2a1</td>
                      <td className="p-3 font-mono text-xs">vpn-gw-01</td>
                      <td className="p-3 font-mono text-xs">10.2.50.18</td>
                      <td className="p-3">45m</td>
                      <td className="p-3 text-xs">89 MB / 12 MB</td>
                      <td className="p-3"><Button variant="outline" size="sm" className="h-7 text-xs text-destructive">Disconnect</Button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounting"><Card><CardContent className="pt-6 text-sm text-muted-foreground">Accounting records will appear here with full session history, data usage, and export capabilities.</CardContent></Card></TabsContent>
        <TabsContent value="otp"><Card><CardContent className="pt-6 text-sm text-muted-foreground">TOTP enrollment, YubiKey registration, and 2FA reset options.</CardContent></Card></TabsContent>
        <TabsContent value="certs"><Card><CardContent className="pt-6 text-sm text-muted-foreground">Client certificate issuance history, expiry dates, and revocation management.</CardContent></Card></TabsContent>
        <TabsContent value="audit"><Card><CardContent className="pt-6 text-sm text-muted-foreground">User-specific audit trail: all changes, logins, and administrative actions.</CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDetail;
