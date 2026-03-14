import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Shield, Copy, Eye, FileText } from "lucide-react";
import ProfileFormDialog from "@/components/forms/ProfileFormDialog";

const templates = [
  { name: "Employee – Wired", attrs: 8, vlan: "100", usage: 4200, status: "Active" },
  { name: "Employee – WiFi", attrs: 7, vlan: "110", usage: 3100, status: "Active" },
  { name: "Contractor – Limited", attrs: 6, vlan: "200", usage: 1240, status: "Active" },
  { name: "Guest – Internet Only", attrs: 4, vlan: "300", usage: 2890, status: "Active" },
  { name: "IoT – Restricted", attrs: 3, vlan: "400", usage: 1340, status: "Active" },
  { name: "VPN – Full Access", attrs: 9, vlan: "50", usage: 560, status: "Draft" },
];

const ProfilesPage = () => {
  const [createDialog, setCreateDialog] = useState(false);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Profiles & Policies</h1>
          <p className="page-description">Reusable attribute templates for users and groups. Includes VLAN and Framed-IP builders.</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setCreateDialog(true)}>
          <Plus className="h-3.5 w-3.5" /> Create Profile
        </Button>
      </div>

      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="templates">Profile Templates</TabsTrigger>
          <TabsTrigger value="attributes">Attribute Catalog</TabsTrigger>
          <TabsTrigger value="vlan">VLAN Builder</TabsTrigger>
          <TabsTrigger value="ip">Framed-IP Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((t) => (
              <Card key={t.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold">{t.name}</CardTitle>
                    <Badge variant={t.status === "Active" ? "default" : "secondary"} className="text-[10px]">{t.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{t.attrs} attributes</span>
                    <span>VLAN {t.vlan}</span>
                    <span>{t.usage.toLocaleString()} users</span>
                  </div>
                  <div className="flex gap-1 mt-3">
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><Eye className="h-3 w-3" /> View</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><Copy className="h-3 w-3" /> Clone</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><FileText className="h-3 w-3" /> Apply</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attributes" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Attribute Dictionary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Search attributes by name or OID..." className="max-w-sm" />
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="data-table-header text-left p-2.5">Attribute</th>
                      <th className="data-table-header text-left p-2.5">OID</th>
                      <th className="data-table-header text-left p-2.5">Type</th>
                      <th className="data-table-header text-left p-2.5">Vendor</th>
                      <th className="data-table-header text-left p-2.5">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { attr: "User-Name", oid: "1", type: "string", vendor: "Standard", desc: "The name of the user to be authenticated" },
                      { attr: "User-Password", oid: "2", type: "string", vendor: "Standard", desc: "The password of the user (PAP)" },
                      { attr: "NAS-IP-Address", oid: "4", type: "ipaddr", vendor: "Standard", desc: "IP address of the NAS" },
                      { attr: "Framed-IP-Address", oid: "8", type: "ipaddr", vendor: "Standard", desc: "IP address to assign to the user" },
                      { attr: "Session-Timeout", oid: "27", type: "integer", vendor: "Standard", desc: "Max seconds of service" },
                      { attr: "Tunnel-Type", oid: "64", type: "integer", vendor: "Standard", desc: "Tunneling protocol (VLAN=13)" },
                      { attr: "Tunnel-Medium-Type", oid: "65", type: "integer", vendor: "Standard", desc: "Transport medium (IEEE-802=6)" },
                      { attr: "Tunnel-Private-Group-Id", oid: "81", type: "string", vendor: "Standard", desc: "VLAN ID to assign" },
                      { attr: "Cisco-AVPair", oid: "26/1/1", type: "string", vendor: "Cisco", desc: "Cisco vendor-specific attribute pair" },
                      { attr: "Aruba-User-Role", oid: "26/14823/1", type: "string", vendor: "Aruba", desc: "Aruba user role assignment" },
                    ].map((a) => (
                      <tr key={a.attr} className="border-b hover:bg-muted/50">
                        <td className="p-2.5 font-mono text-xs font-medium">{a.attr}</td>
                        <td className="p-2.5 font-mono text-xs text-muted-foreground">{a.oid}</td>
                        <td className="p-2.5 text-xs">{a.type}</td>
                        <td className="p-2.5"><Badge variant="outline" className="text-[10px]">{a.vendor}</Badge></td>
                        <td className="p-2.5 text-xs text-muted-foreground">{a.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vlan" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">VLAN Assignment Builder</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Build VLAN assignment attributes for 802.1X dynamic VLAN assignment.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Tunnel-Type</Label>
                  <Select defaultValue="13">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="13">VLAN (13)</SelectItem>
                      <SelectItem value="3">GRE (3)</SelectItem>
                      <SelectItem value="7">IP-in-IP (7)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tunnel-Medium-Type</Label>
                  <Select defaultValue="6">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">IEEE-802 (6)</SelectItem>
                      <SelectItem value="1">IPv4 (1)</SelectItem>
                      <SelectItem value="2">IPv6 (2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tunnel-Private-Group-Id (VLAN ID)</Label>
                  <Input type="number" placeholder="100" min={1} max={4094} />
                </div>
              </div>
              <div className="rounded-md border bg-muted/30 p-4 font-mono text-xs space-y-1">
                <p className="text-muted-foreground"># Generated reply attributes:</p>
                <p>Tunnel-Type := VLAN</p>
                <p>Tunnel-Medium-Type := IEEE-802</p>
                <p>Tunnel-Private-Group-Id := 100</p>
              </div>
              <Button size="sm">Apply to Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ip" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Framed-IP Assignment Builder</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Configure static IP assignment with subnet validation and conflict detection.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Framed-IP-Address</Label>
                  <Input placeholder="10.1.100.50" className="font-mono" />
                </div>
                <div className="space-y-2">
                  <Label>Framed-IP-Netmask</Label>
                  <Input placeholder="255.255.255.0" className="font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Framed-Route (optional)</Label>
                  <Input placeholder="10.0.0.0/8 10.1.100.1" className="font-mono" />
                </div>
                <div className="space-y-2">
                  <Label>Framed-Pool (optional)</Label>
                  <Input placeholder="main_pool" className="font-mono" />
                </div>
              </div>
              <div className="rounded-md border bg-muted/30 p-4 font-mono text-xs space-y-1">
                <p className="text-muted-foreground"># Generated reply attributes:</p>
                <p>Framed-IP-Address := 10.1.100.50</p>
                <p>Framed-IP-Netmask := 255.255.255.0</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] text-success border-success/30">✓ No conflicts detected</Badge>
              </div>
              <Button size="sm">Apply to Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ProfileFormDialog open={createDialog} onOpenChange={setCreateDialog} />
    </div>
  );
};

export default ProfilesPage;
